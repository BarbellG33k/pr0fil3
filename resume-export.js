/*
 * resume-export.js - shared ATS-optimized export generators for the resume pages.
 *
 * Exposes window.ResumeExport with:
 *   downloadPDF(data, opts)  - linear, single-column, parser-friendly PDF (jsPDF)
 *   downloadTXT(data, opts)  - plain-text resume with explicit section markers
 *   downloadXML(data, opts)  - HR-XML Resume (2.5 subset) document
 *
 * opts: { variant: 'executive' | 'builder', includeEducation: boolean }
 *
 * Design rules (ATS / Workday importer safety):
 * - Experience descriptions contain achievements only. Editorial subsection
 *   labels and nested promotion timelines are omitted because title-like text
 *   inside a description can be imported as a separate job.
 * - The synthetic "Early Career" rollup is expanded into its real employers,
 *   titles, dates, and descriptions under a distinct early-career section.
 * - Exported titles and descriptions exclude characters rejected by Workday:
 *   square/curly brackets, angle brackets, and forward slashes.
 * - Certifications are flat "Name - Issuer" lines. Issuer names (e.g.
 *   Microsoft) never appear on their own line, so they cannot be mistaken
 *   for employers or job titles.
 * - Standard section headings (SUMMARY, EXPERIENCE, SKILLS, CERTIFICATIONS,
 *   EDUCATION), plain uppercase, no letterspacing, strict top-to-bottom
 *   reading order, grayscale only.
 */
window.ResumeExport = (function () {
  'use strict';

  // -- Normalization ----------------------------------------------------------

  function flattenTechnicalRange(technicalRange) {
    return [{
      category: 'Technical Range',
      items: technicalRange.flatMap(g => g.split(',').map(s => s.trim()))
    }];
  }

  function achievementBullets(bullets) {
    const out = [];
    let skipProgression = false;
    bullets.forEach(b => {
      if (b.startsWith('##')) {
        skipProgression = b.slice(2).trim().toLowerCase() === 'role progression';
        return;
      }
      if (skipProgression) {
        skipProgression = false;
        return;
      }
      out.push(b);
    });
    return out;
  }

  function expandEarlyCareer(jobs) {
    return jobs.flatMap(job => {
      if (job.company !== 'Early Career') {
        return [Object.assign({}, job, {
          careerStage: 'current',
          bullets: achievementBullets(job.bullets)
        })];
      }

      return job.bullets.map(line => {
        const match = line.match(/^(.+) \(([^()]+)\): (.+)$/);
        const identity = match && match[1].match(
          /^(.+?), ((?:Software|Senior|Manager|Integration|\.NET|Technical).+)$/
        );
        if (!match || !identity) {
          return {
            company: job.company,
            title: job.title,
            period: job.period,
            careerStage: 'early',
            bullets: [line]
          };
        }
        return {
          company: identity[1],
          title: identity[2],
          period: match[2],
          careerStage: 'early',
          bullets: [match[3]]
        };
      });
    });
  }

  function workdaySafeText(value) {
    return String(value)
      .replace(/\s*->\s*/g, ' to ')
      .replace(/\s*<-\s*/g, ' from ')
      .replace(/\s*\/\s*/g, ' and ')
      .replace(/[\[\]{}]/g, '')
      .replace(/</g, ' less than ')
      .replace(/>/g, ' greater than ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function sanitizeAtsResume(r) {
    const safe = workdaySafeText;
    return Object.assign({}, r, {
      headline: safe(r.headline),
      summary: safe(r.summary),
      jobs: r.jobs.map(job => Object.assign({}, job, {
        company: safe(job.company),
        title: safe(job.title),
        tags: (job.tags || []).map(safe),
        bullets: job.bullets.map(safe)
      })),
      skills: r.skills.map(group => ({
        category: safe(group.category),
        items: group.items.map(safe)
      })),
      education: r.education.map(item => ({
        degree: safe(item.degree),
        institution: safe(item.institution),
        location: safe(item.location),
        year: safe(item.year)
      })),
      certGroups: r.certGroups.map(group => Object.assign({}, group, {
        label: safe(group.label),
        items: group.items.map(safe)
      })),
      extra: !r.extra ? null : {
        title: safe(r.extra.title),
        intro: r.extra.intro ? safe(r.extra.intro) : null,
        bullets: (r.extra.bullets || []).map(safe),
        blocks: (r.extra.blocks || []).map(([label, text]) => [safe(label), safe(text)]),
        note: r.extra.note ? safe(r.extra.note) : null
      }
    });
  }

  function normalize(data, variant, includeEducation) {
    const m = data.meta;
    const base = {
      name: m.name,
      contact: [m.email, m.phone, m.location, m.linkedin],
      linkedinUrl: m.linkedinUrl,
      education: includeEducation && data.education ? data.education : []
    };

    if (variant === 'builder') {
      const b = data.builderResume;
      return sanitizeAtsResume(Object.assign(base, {
        variant,
        fileBase: 'Guillermo_Salas_Resume_Builder',
        headline: b.headline || m.title,
        summary: b.summary,
        jobs: expandEarlyCareer(b.experience),
        skills: flattenTechnicalRange(b.skills.technicalRange),
        // Builder credentials already carry the issuer inside each item;
        // group labels ("Current", "Historical / Legacy") are safe as
        // subheadings - they cannot read as employers.
        certGroups: [
          { label: 'Current', items: b.skills.current, inlineIssuer: false },
          { label: 'Historical / Legacy', items: b.skills.historicalLegacy, inlineIssuer: false }
        ],
        extra: b.technicalPractice ? {
          title: 'Technical Practice',
          blocks: [
            ['Foundation', b.technicalPractice.foundation],
            ['Cloud Evolution', b.technicalPractice.cloudEvolution],
            ['Current Practice', b.technicalPractice.currentPractice]
          ],
          note: b.executiveScaleNote || null
        } : null
      }));
    }

    return sanitizeAtsResume(Object.assign(base, {
      variant: 'executive',
      fileBase: 'Guillermo_Salas_Resume',
      headline: m.title,
      summary: data.summary,
      jobs: expandEarlyCareer(data.experience),
      skills: data.skills,
      // Executive certs are grouped by issuer (Microsoft, Oracle, ...).
      // Issuer names must be inlined per line, never on their own line.
      certGroups: data.certifications.map(c => ({
        label: c.issuer, items: c.items, inlineIssuer: true
      })),
      extra: data.aiPractitioner ? {
        title: data.aiPractitioner.title || 'AI Practice',
        intro: data.aiPractitioner.intro || null,
        bullets: data.aiPractitioner.bullets || []
      } : null
    }));
  }

  function certLine(group, item) {
    return group.inlineIssuer ? item + ' - ' + group.label : item;
  }

  // -- Plain text helpers -----------------------------------------------------

  const TXT_WIDTH = 92;

  function wrapText(text, width, indent) {
    const words = String(text).split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';
    const pad = ' '.repeat(indent);
    words.forEach(w => {
      const candidate = line ? line + ' ' + w : pad + w;
      if (candidate.length > width && line) {
        lines.push(line);
        line = pad + w;
      } else {
        line = candidate;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function sectionTXT(title) {
    return ['', title.toUpperCase(), '='.repeat(title.length), ''];
  }

  function buildTXT(r) {
    const out = [];
    out.push(r.name.toUpperCase());
    out.push(r.headline);
    out.push(r.contact.join(' | '));

    out.push(...sectionTXT('Summary'));
    out.push(...wrapText(r.summary, TXT_WIDTH, 0));

    out.push(...sectionTXT('Experience'));
    let careerStage = 'current';
    r.jobs.forEach((j, i) => {
      if (j.careerStage === 'early' && careerStage !== 'early') {
        out.push(...sectionTXT('Early Career'));
        careerStage = 'early';
      } else if (i > 0) {
        out.push('');
      }
      out.push(j.company + ' | ' + j.period);
      out.push(j.title);
      j.bullets.forEach(b => {
        wrapText('- ' + b, TXT_WIDTH, 2).forEach(wl => out.push(wl));
      });
    });

    out.push(...sectionTXT('Skills'));
    r.skills.forEach(sg => {
      wrapText(sg.category + ': ' + sg.items.join(', '), TXT_WIDTH, 2).forEach(wl => out.push(wl));
      out.push('');
    });
    if (out[out.length - 1] === '') out.pop();

    if (r.education.length) {
      out.push(...sectionTXT('Education'));
      r.education.forEach(e => {
        out.push(e.degree + ' - ' + e.institution + ', ' + e.location + ', ' + e.year);
      });
    }

    out.push(...sectionTXT('Certifications'));
    r.certGroups.forEach((g, gi) => {
      if (gi > 0 && !g.inlineIssuer) out.push('');
      if (!g.inlineIssuer && r.certGroups.length > 1) out.push(g.label + ':');
      g.items.forEach(item => {
        wrapText('- ' + certLine(g, item), TXT_WIDTH, 2).forEach(wl => out.push(wl));
      });
    });

    if (r.extra) {
      out.push(...sectionTXT(r.extra.title));
      if (r.extra.intro) {
        out.push(...wrapText(r.extra.intro, TXT_WIDTH, 0));
        out.push('');
      }
      (r.extra.bullets || []).forEach(b => {
        wrapText('- ' + b, TXT_WIDTH, 2).forEach(wl => out.push(wl));
      });
      (r.extra.blocks || []).forEach(([label, text], i) => {
        if (i > 0 || r.extra.intro) out.push('');
        out.push(label + ':');
        out.push(...wrapText(text, TXT_WIDTH, 2));
      });
      if (r.extra.note) {
        out.push('');
        out.push('Executive Scale:');
        out.push(...wrapText(r.extra.note, TXT_WIDTH, 2));
      }
    }

    return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  }

  // -- HR-XML -----------------------------------------------------------------

  function xe(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const MONTHS = {
    jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
    jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
  };

  // "Mar 2023 - Present" -> { startText, endText, startYM, endYM }
  function parsePeriod(period) {
    const parts = String(period).split(/\s+-\s+/);
    const mk = (raw) => {
      const t = (raw || '').trim();
      const m = t.match(/^([A-Za-z]{3})\.?[a-z]*\s+(\d{4})$/);
      return { text: t, ym: m ? m[2] + '-' + (MONTHS[m[1].toLowerCase().slice(0, 3)] || '') : null };
    };
    return { start: mk(parts[0]), end: mk(parts.slice(1).join(' - ')) };
  }

  function jobDescriptionXML(bullets) {
    return bullets.map(b => '- ' + b).join('\n');
  }

  function buildXML(r) {
    let x = '';
    x += '<?xml version="1.0" encoding="UTF-8"?>\n';
    x += '<Resume xml:lang="en" xmlns="http://ns.hr-xml.org/2007-04-15">\n';
    x += '  <StructuredXMLResume>\n';

    // Contact
    x += '    <ContactInfo>\n';
    x += '      <PersonName><FormattedName>' + xe(r.name) + '</FormattedName></PersonName>\n';
    x += '      <ContactMethod>\n';
    x += '        <Telephone><FormattedNumber>' + xe(r.contact[1]) + '</FormattedNumber></Telephone>\n';
    x += '        <InternetEmailAddress>' + xe(r.contact[0]) + '</InternetEmailAddress>\n';
    x += '        <PostalAddress><CountryCode>US</CountryCode><Municipality>' + xe(r.contact[2]) + '</Municipality></PostalAddress>\n';
    if (r.linkedinUrl) {
      x += '        <InternetWebAddress>' + xe(r.linkedinUrl) + '</InternetWebAddress>\n';
    }
    x += '      </ContactMethod>\n';
    x += '    </ContactInfo>\n';

    x += '    <Objective>' + xe(r.summary) + '</Objective>\n';
    x += '    <PositionTitle>' + xe(r.headline) + '</PositionTitle>\n';

    // Employment
    x += '    <EmploymentHistory>\n';
    r.jobs.forEach(j => {
      const p = parsePeriod(j.period);
      x += '      <EmployerOrg>\n';
      x += '        <EmployerOrgName>' + xe(j.company) + '</EmployerOrgName>\n';
      x += '        <PositionHistory positionType="directHire">\n';
      x += '          <PositionTitle>' + xe(j.title) + '</PositionTitle>\n';
      x += '          <StartDate><StringDate>' + xe(p.start.text) + '</StringDate>' +
        (p.start.ym ? '<YearMonth>' + p.start.ym + '</YearMonth>' : '') + '</StartDate>\n';
      if (p.end.text) {
        x += '          <EndDate><StringDate>' + xe(p.end.text) + '</StringDate>' +
          (p.end.ym ? '<YearMonth>' + p.end.ym + '</YearMonth>' : '') + '</EndDate>\n';
      }
      if (j.tags && j.tags.length) {
        x += '          <PositionClassification>' + xe(j.tags.join(', ')) + '</PositionClassification>\n';
      }
      x += '          <Description>' + xe(jobDescriptionXML(j.bullets)) + '</Description>\n';
      x += '        </PositionHistory>\n';
      x += '      </EmployerOrg>\n';
    });
    x += '    </EmploymentHistory>\n';

    // Education
    if (r.education.length) {
      x += '    <EducationHistory>\n';
      r.education.forEach(e => {
        x += '      <SchoolOrInstitution>\n';
        x += '        <School><SchoolName>' + xe(e.institution) + '</SchoolName></School>\n';
        x += '        <Degree degreeType="bachelors">\n';
        x += '          <DegreeName>' + xe(e.degree) + '</DegreeName>\n';
        x += '          <EndDate><StringDate>' + xe(e.year) + '</StringDate></EndDate>\n';
        x += '          <Comments>' + xe(e.location) + '</Comments>\n';
        x += '        </Degree>\n';
        x += '      </SchoolOrInstitution>\n';
      });
      x += '    </EducationHistory>\n';
    }

    // Certifications
    x += '    <LicensesAndCertifications>\n';
    r.certGroups.forEach(g => {
      g.items.forEach(item => {
        let name = item, authority = g.inlineIssuer ? g.label : g.label;
        if (!g.inlineIssuer) {
          // Builder items often end with "(Issuer)" - split it out.
          const m = item.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
          if (m) { name = m[1].replace(/[,\s]+$/, ''); authority = m[2]; }
        }
        x += '      <LicenseOrCertification>\n';
        x += '        <Name>' + xe(name) + '</Name>\n';
        x += '        <IssuingAuthority>' + xe(authority) + '</IssuingAuthority>\n';
        x += '      </LicenseOrCertification>\n';
      });
    });
    x += '    </LicensesAndCertifications>\n';

    // Skills
    x += '    <Qualifications>\n';
    r.skills.forEach(sg => {
      sg.items.forEach(item => {
        x += '      <Competency name="' + xe(item) + '" description="' + xe(sg.category) + '"/>\n';
      });
    });
    x += '    </Qualifications>\n';

    x += '  </StructuredXMLResume>\n';

    // Anything non-standard (AI practice record / technical practice narrative)
    // goes to UserArea rather than being dropped.
    if (r.extra) {
      x += '  <UserArea>\n';
      x += '    <AdditionalSection title="' + xe(r.extra.title) + '">\n';
      if (r.extra.intro) x += '      <Introduction>' + xe(r.extra.intro) + '</Introduction>\n';
      (r.extra.bullets || []).forEach(b => {
        x += '      <Item>' + xe(b) + '</Item>\n';
      });
      (r.extra.blocks || []).forEach(([label, text]) => {
        x += '      <Block label="' + xe(label) + '">' + xe(text) + '</Block>\n';
      });
      if (r.extra.note) x += '      <Block label="Executive Scale">' + xe(r.extra.note) + '</Block>\n';
      x += '    </AdditionalSection>\n';
      x += '  </UserArea>\n';
    }

    x += '</Resume>\n';
    return x;
  }

  // -- PDF (ATS-optimized, linear layout) -------------------------------------

  function buildPDF(r) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    doc.setProperties({
      title: r.name + ' - Resume',
      author: r.name,
      subject: r.headline
    });

    const PW = 612, PH = 792;
    const ML = 54, MR = 54, MT = 50, MB = 50;
    const BODY_W = PW - ML - MR;
    const BULLET_INDENT = 12;

    // Grayscale only - maximum parser and print compatibility.
    const INK = '#111111', INKL = '#333333', INKM = '#555555', RULE = '#999999';
    const h2r = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const tc = h => doc.setTextColor(...h2r(h));
    const dc = h => doc.setDrawColor(...h2r(h));

    let y = MT;
    const newPage = () => { doc.addPage(); y = MT; };
    const need = h => { if (y + h > PH - MB) newPage(); };
    const actualTextHex = text => {
      let hex = 'FEFF';
      for (let i = 0; i < text.length; i++) {
        hex += text.charCodeAt(i).toString(16).padStart(4, '0');
      }
      return hex.toUpperCase();
    };
    const withActualText = (text, draw) => {
      doc.internal.write('/Span <</ActualText <' + actualTextHex(text) + '>>> BDC');
      draw();
      doc.internal.write('EMC');
    };

    const writeWrapped = (text, width, opts) => {
      const o = Object.assign({ font: 'helvetica', style: 'normal', size: 9.5, color: INKL, lineH: 13, x: ML }, opts || {});
      doc.setFont(o.font, o.style); doc.setFontSize(o.size); tc(o.color);
      const lines = doc.splitTextToSize(text, width);
      need(lines.length * o.lineH);
      withActualText(text, () => {
        lines.forEach((l, i) => doc.text(l, o.x, y + o.size + i * o.lineH - 1));
      });
      y += lines.length * o.lineH;
    };

    const heading = (text) => {
      need(34);
      y += 10;
      doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); tc(INK);
      doc.text(text.toUpperCase(), ML, y + 10);
      y += 15;
      dc(RULE); doc.setLineWidth(0.75);
      doc.line(ML, y, PW - MR, y);
      y += 7;
    };

    // -- Header
    doc.setFont('helvetica', 'bold'); doc.setFontSize(20); tc(INK);
    doc.text(r.name, ML, y + 20);
    y += 26;

    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); tc(INKL);
    const headlineLines = doc.splitTextToSize(r.headline, BODY_W);
    headlineLines.forEach((l, i) => doc.text(l, ML, y + 9 + i * 12));
    y += headlineLines.length * 12 + 2;

    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); tc(INKM);
    const contactLines = doc.splitTextToSize(r.contact.join('  |  '), BODY_W);
    contactLines.forEach((l, i) => doc.text(l, ML, y + 9 + i * 12));
    y += contactLines.length * 12 + 4;

    dc(INK); doc.setLineWidth(1.2); doc.line(ML, y, PW - MR, y);
    y += 6;

    // -- Summary
    heading('Summary');
    writeWrapped(r.summary, BODY_W);
    y += 4;

    // -- Experience
    heading('Experience');
    let careerStage = 'current';
    r.jobs.forEach((job, idx) => {
      if (job.careerStage === 'early' && careerStage !== 'early') {
        heading('Early Career');
        careerStage = 'early';
      } else if (idx > 0) {
        y += 9;
      }

      // Line 1: company (bold, left) + period (right) on one baseline -
      // the adjacency parsers key on. Company wraps if it is long.
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); tc(INK);
      const periodW = doc.getTextWidth(job.period);
      const companyLines = doc.splitTextToSize(job.company, BODY_W - periodW - 16);
      const titleLines = doc.splitTextToSize(job.title, BODY_W);
      const firstBulletLines = job.bullets.length
        ? doc.splitTextToSize(job.bullets[0], BODY_W - BULLET_INDENT)
        : [];
      const headerHeight = companyLines.length * 13 + 2 + titleLines.length * 12 + 3;
      const firstBulletHeight = firstBulletLines.length * 13 + (firstBulletLines.length ? 1 : 0);
      // Never orphan an employer/title block at the bottom of a page. At
      // least the first achievement must remain attached to the job header.
      need(headerHeight + firstBulletHeight);

      withActualText(job.company + ' | ' + job.period + '\n' + job.title, () => {
        companyLines.forEach((l, i) => doc.text(l, ML, y + 10 + i * 13));
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); tc(INKM);
        doc.text(job.period, PW - MR, y + 10, { align: 'right' });
        y += companyLines.length * 13 + 2;

        // Line 2: title
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); tc(INKL);
        titleLines.forEach((l, i) => doc.text(l, ML, y + 9 + i * 12));
      });
      y += titleLines.length * 12 + 3;

      job.bullets.forEach(b => {
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); tc(INKL);
        const lines = doc.splitTextToSize(b, BODY_W - BULLET_INDENT);
        need(lines.length * 13);
        withActualText('- ' + b, () => {
          tc(INKM); doc.text('-', ML, y + 9);
          tc(INKL);
          lines.forEach((ln, li) => doc.text(ln, ML + BULLET_INDENT, y + 9 + li * 13));
        });
        y += lines.length * 13 + 1;
      });
      y += 2;
    });

    // -- Skills
    heading('Skills');
    r.skills.forEach(sg => {
      doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); tc(INK);
      const label = sg.category + ': ';
      const labelW = doc.getTextWidth(label);
      need(14);
      doc.text(label, ML, y + 9);
      doc.setFont('helvetica', 'normal'); tc(INKL);
      const first = doc.splitTextToSize(sg.items.join(', '), BODY_W - labelW);
      doc.text(first[0], ML + labelW, y + 9);
      const restLines = first.slice(1);
      restLines.forEach((ln, i) => doc.text(ln, ML, y + 9 + (i + 1) * 13));
      y += (restLines.length + 1) * 13 + 2;
    });
    y += 2;

    // -- Education (only when owner enables it)
    if (r.education.length) {
      heading('Education');
      r.education.forEach(e => {
        writeWrapped(e.degree + ' - ' + e.institution + ', ' + e.location + ', ' + e.year, BODY_W);
        y += 2;
      });
    }

    // -- Certifications: flat "Name - Issuer" lines only.
    heading('Certifications');
    r.certGroups.forEach((g, gi) => {
      if (!g.inlineIssuer && r.certGroups.length > 1) {
        if (gi > 0) y += 4;
        need(16);
        doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); tc(INK);
        doc.text(g.label + ':', ML, y + 9);
        y += 14;
      }
      g.items.forEach(item => {
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); tc(INKL);
        const lines = doc.splitTextToSize(certLine(g, item), BODY_W - BULLET_INDENT);
        need(lines.length * 13);
        tc(INKM); doc.text('-', ML, y + 9);
        tc(INKL);
        lines.forEach((ln, li) => doc.text(ln, ML + BULLET_INDENT, y + 9 + li * 13));
        y += lines.length * 13 + 1;
      });
    });

    return doc;
  }

  // -- Download plumbing ------------------------------------------------------

  function saveBlob(content, mime, filename) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function withButton(btn, busyLabel, fn) {
    const label = btn ? btn.textContent : null;
    if (btn) { btn.disabled = true; btn.textContent = busyLabel; }
    try { fn(); } catch (err) {
      console.error('Resume export failed:', err);
      alert('Export failed. Use "Print" as a fallback.');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = label; }
    }
  }

  return {
    downloadPDF(data, opts) {
      if (!data) return;
      const o = Object.assign({ variant: 'executive', includeEducation: false }, opts);
      const r = normalize(data, o.variant, o.includeEducation);
      const btn = document.querySelector('#toolbar .btn-primary');
      withButton(btn, 'Generating...', () => {
        buildPDF(r).save(r.fileBase + '.pdf');
      });
    },
    downloadTXT(data, opts) {
      if (!data) return;
      const o = Object.assign({ variant: 'executive', includeEducation: false }, opts);
      const r = normalize(data, o.variant, o.includeEducation);
      saveBlob(buildTXT(r), 'text/plain;charset=utf-8', r.fileBase + '.txt');
    },
    downloadXML(data, opts) {
      if (!data) return;
      const o = Object.assign({ variant: 'executive', includeEducation: false }, opts);
      const r = normalize(data, o.variant, o.includeEducation);
      saveBlob(buildXML(r), 'application/xml;charset=utf-8', r.fileBase + '.xml');
    },
    _test: { normalize, buildTXT, buildXML }
  };
})();
