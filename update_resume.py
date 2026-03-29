import re
import sys

def main():
    filepath = '/home/guillermo/dev/pr0fil3/resume-alt.html'
    try:
        with open(filepath, 'r') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    # 1. New CSS 
    new_css = """
    :root {
      --heading-font: 'Cormorant Garamond', serif;
      --body-font: 'DM Sans', sans-serif;
      --ink: #1a1a1a;
      --ink-light: #4a4a4a;
      --ink-muted: #888;
      --rule: #c8b99a;
      --rule-subtle: #e8e0d0;
      --accent: #8b6f47;
      --accent-dark: #7a5f3a;
      --accent-light: #f5f0e8;
      --bg: #fdfaf5;
      --page: #ffffff;
      
      /* Modern variables */
      --nav-width: 200px;
      --content-max: 800px;
      --app-bg: #f5f5f7;
      --card-bg: #ffffff;
      --border-radius: 12px;
      --glass-bg: rgba(255, 255, 255, 0.85);
      --glass-border: rgba(255, 255, 255, 0.5);
      --shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
      --shadow-hover: 0 15px 50px rgba(0,0,0,0.08);
      --transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    [data-theme="executive"] {
      --heading-font: 'Inter', sans-serif;
      --body-font: 'Inter', sans-serif;
      --ink: #0f1923;
      --ink-light: #374151;
      --ink-muted: #6b7280;
      --rule: #94a3b8;
      --rule-subtle: #d1d9e0;
      --accent: #1e3a5f;
      --accent-dark: #152b47;
      --accent-light: #e8eef5;
      --app-bg: #e2e8f0;
      --card-bg: #ffffff;
      --glass-bg: rgba(255, 255, 255, 0.9);
      --shadow: 0 8px 30px rgba(15, 25, 35, 0.05);
    }

    [data-theme="carbon"] {
      --heading-font: 'DM Serif Display', serif;
      --body-font: 'DM Sans', sans-serif;
      --ink: #f3f4f6;
      --ink-light: #d1d5db;
      --ink-muted: #9ca3af;
      --rule: #374151;
      --rule-subtle: #1f2937;
      --accent: #38bdf8;
      --accent-dark: #0284c7;
      --accent-light: rgba(56, 189, 248, 0.1);
      --app-bg: #0f172a;
      --card-bg: #1e293b;
      --page: #1e293b;
      --glass-bg: rgba(30, 41, 59, 0.85);
      --glass-border: rgba(255, 255, 255, 0.05);
      --shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    /* Print media variables backup */
    @media print {
      :root {
        --col-left: clamp(96px, 16%, 132px);
        --gap: 16px;
      }
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--app-bg);
      font-family: var(--body-font);
      color: var(--ink);
      font-size: 15px; 
      line-height: 1.7;
      -webkit-font-smoothing: antialiased;
      transition: background 0.3s ease, color 0.3s ease;
      overflow-x: hidden;
    }

    /* ── toolbar ── */
    #toolbar {
      position: fixed;
      top: 0; left: 0; right: 0; height: 56px;
      background: var(--glass-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--glass-border);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 32px; z-index: 1000;
      transition: all 0.3s ease;
    }
    #toolbar span {
      color: var(--ink); font-size: 13px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
    }
    #toolbar .toolbar-right { display: flex; gap: 12px; align-items: center; }

    .btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 18px; font-size: 12px; letter-spacing: 0.05em;
      text-transform: uppercase; font-family: var(--body-font); font-weight: 600;
      border: none; cursor: pointer; border-radius: 6px; transition: all 0.2s;
    }
    .btn-primary { background: var(--accent); color: #fff; box-shadow: 0 4px 12px var(--accent-light); }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 16px var(--accent-light); filter: brightness(1.1); }
    .btn-ghost { background: transparent; color: var(--ink-light); border: 1px solid var(--rule-subtle); }
    .btn-ghost:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }

    .theme-select {
      background: var(--card-bg); color: var(--ink);
      border: 1px solid var(--rule-subtle); border-radius: 6px;
      font-size: 12px; font-weight: 500; padding: 7px 12px; cursor: pointer; outline: none;
      transition: all 0.2s;
    }
    .theme-select:hover { border-color: var(--accent); }

    /* ── layout framework ── */
    #app-container {
      display: flex;
      max-width: calc(var(--content-max) + var(--nav-width) + 80px);
      margin: 90px auto 60px;
      padding: 0 24px;
      align-items: flex-start;
      gap: 40px;
    }

    /* ── navigation matrix ── */
    #nav-matrix {
      position: sticky;
      top: 100px;
      width: var(--nav-width);
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    @media(max-width: 900px) {
      #nav-matrix { display: none; }
      #app-container { justify-content: center; }
    }
    .nav-item {
      padding: 10px 16px;
      border-radius: 8px;
      color: var(--ink-muted);
      text-decoration: none;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      transition: var(--transition);
      border: 1px solid transparent;
      display: flex; align-items: center; gap: 10px;
    }
    .nav-item::before {
      content: ''; display: block; width: 6px; height: 6px; border-radius: 50%;
      background: var(--rule-subtle); transition: var(--transition);
    }
    .nav-item:hover {
      background: rgba(120, 120, 120, 0.05);
      color: var(--ink);
    }
    .nav-item.active {
      color: var(--accent);
      background: var(--card-bg);
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
      border-color: var(--rule-subtle);
    }
    .nav-item.active::before { background: var(--accent); transform: scale(1.5); }

    /* ── page wrapper ── */
    #page-wrap {
      flex-grow: 1;
      max-width: var(--content-max);
      width: 100%;
    }

    /* ── resume blocks (web specific) ── */
    #resume {
      display: flex; flex-direction: column; gap: 40px;
    }
    
    .resume-block {
      background: var(--card-bg);
      border-radius: var(--border-radius);
      padding: 48px;
      box-shadow: var(--shadow);
      border: 1px solid var(--glass-border);
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .resume-block.visible {
      opacity: 1; transform: translateY(0);
    }

    /* ── header ── */
    #header {
      display: flex; justify-content: space-between; align-items: flex-end;
      padding-bottom: 24px; border-bottom: 2px solid var(--rule-subtle);
      margin-bottom: 26px;
    }
    @media(max-width: 600px) {
      #header { flex-direction: column; align-items: flex-start; gap: 16px; }
    }
    #header-left h1 {
      font-family: var(--heading-font);
      font-size: 48px; font-weight: 700; color: var(--ink); line-height: 1.1;
      letter-spacing: -0.01em; margin-bottom: 8px;
    }
    #header-left .title-tag {
      font-size: 13px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
      color: var(--accent); margin-top: 8px; display: inline-block;
    }
    #header-right {
      display: flex; flex-direction: column; gap: 6px; text-align: right;
      font-size: 14px; color: var(--ink-light); 
    }
    @media(max-width: 600px) { #header-right { text-align: left; } }
    #header-right a { color: var(--ink-light); text-decoration: none; transition: 0.2s; font-weight: 500;}
    #header-right a:hover { color: var(--accent); }

    /* ── sections ── */
    .section-title {
      font-family: var(--heading-font);
      font-size: 28px; font-weight: 600; color: var(--ink);
      margin-bottom: 24px; display: flex; align-items: center; gap: 16px;
    }
    .section-title::after {
      content: ''; flex-grow: 1; height: 1px; background: var(--rule-subtle);
    }

    /* ── summary ── */
    .summary-text {
      font-size: 16px; color: var(--ink-light); line-height: 1.8;
      font-family: var(--body-font);
    }

    /* ── experience ── */
    .job { margin-bottom: 32px; position: relative; }
    .job:last-child { margin-bottom: 0; }
    
    .job-card {
      padding: 24px; border-radius: 12px;
      border: 1px solid transparent; transition: var(--transition);
    }
    .job-card:hover {
      background: rgba(150, 150, 150, 0.03); border-color: var(--rule-subtle);
      transform: translateX(4px);
    }

    .job-header {
      display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;
      flex-wrap: wrap; gap: 8px;
    }
    @media(max-width: 600px) { .job-header { flex-direction: column; align-items: flex-start; } }
    
    .job-company {
      font-family: var(--heading-font); font-size: 20px; font-weight: 600; color: var(--ink);
    }
    .job-period {
      font-size: 13px; color: var(--ink-muted); font-weight: 500;
      background: var(--app-bg); padding: 4px 10px; border-radius: 20px;
    }
    .job-title {
      font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;
      color: var(--accent); margin-bottom: 12px;
    }

    .job-bullets { list-style: none; padding: 0; }
    .job-bullets li {
      position: relative; padding-left: 20px; margin-bottom: 10px;
      font-size: 15px; color: var(--ink-light); line-height: 1.6;
    }
    .job-bullets li::before {
      content: '→'; position: absolute; left: 0; color: var(--accent);
      font-size: 14px; top: 2px;
    }
    .job-bullets li.bullet-heading {
      padding-left: 0; margin-top: 20px; margin-bottom: 8px;
      font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--ink);
    }
    .job-bullets li.bullet-heading::before { content: ''; }

    /* Collapsible */
    .job-summary { display: block; cursor: pointer; border-radius: 8px; padding-bottom: 4px; }
    .job-summary::-webkit-details-marker { display: none; }
    .job-summary::marker { content: ''; }
    
    .job-collapsible[open] .job-summary { margin-bottom: 12px; border-bottom: 1px dashed var(--rule-subtle); }
    .show-more-indicator {
      display: inline-block; font-size: 11px; color: var(--accent);
      background: var(--accent-light); padding: 2px 8px; border-radius: 12px;
      margin-top: 8px; font-weight: 600; text-transform: uppercase;
      transition: all 0.2s;
    }
    .job-collapsible[open] .show-more-indicator { display: none; }

    /* ── skills grid ── */
    .skills-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }
    .skill-card {
      background: rgba(150, 150, 150, 0.03); padding: 20px;
      border-radius: 12px; border: 1px solid var(--rule-subtle);
      transition: var(--transition);
    }
    .skill-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); border-color: var(--accent); }
    .skill-cat {
      font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--ink); margin-bottom: 12px;
    }
    .skill-items { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill-chip {
      font-size: 13px; padding: 6px 12px;
      background: var(--card-bg); color: var(--ink-light);
      border: 1px solid var(--rule-subtle); border-radius: 20px; font-weight: 500;
      transition: 0.2s;
    }
    .skill-chip:hover {
      background: var(--accent); color: white; border-color: var(--accent);
    }

    /* ── education & certifications ── */
    .edu-grid { display: grid; gap: 20px; }
    .edu-card { display: flex; flex-direction: column; gap: 4px; }
    .edu-institution { font-weight: 700; color: var(--ink); font-size: 16px; }
    .edu-detail { color: var(--ink-light); font-size: 15px; }

    .cert-group { margin-bottom: 24px; }
    .cert-issuer { font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
    .cert-items { list-style: none; }
    .cert-items li {
      font-size: 15px; color: var(--ink-light); line-height: 1.6;
      padding-left: 20px; position: relative; margin-bottom: 6px;
    }
    .cert-items li::before {
      content: '✓'; position: absolute; left: 0; color: var(--accent); font-size: 12px; font-weight:bold; top:3px;
    }

    /* ── print styles (strictly reverts to original sheet format) ── */
    @page { size: A4; margin: 14mm 12mm; }
    @media print {
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; transition: none !important; opacity: 1 !important; transform: none !important;}
      body {
        background: white !important; color: #1a1a1a !important; font-size: 13px !important;
        font-family: 'DM Sans', sans-serif !important;
      }
      #toolbar, #nav-matrix { display: none !important; }
      #app-container { margin: 0 !important; padding: 0 !important; max-width: none !important; display: block !important; }
      
      #page-wrap { padding: 0 !important; margin: 0 !important; display: block !important; max-width: none !important; }
      
      #resume { gap: 0 !important; display: block !important; background: white !important; width: 794px !important; padding: 44px 48px 52px !important; box-shadow: none !important; margin: 0 auto !important; }
      
      .resume-block { opacity: 1 !important; transform: none !important; padding: 0 !important; background: transparent !important; box-shadow: none !important; border: none !important; border-radius: 0 !important; margin-bottom: 20px !important; display: block !important;}
      
      /* Print Header */
      #header { display: flex !important; flex-direction: row !important; justify-content: space-between !important; align-items: flex-end !important; text-align: left !important; border-bottom: 2px solid #c8b99a !important; padding-bottom: 18px !important; margin-bottom: 26px !important; }
      #header-left h1 { font-family: 'Cormorant Garamond', serif !important; font-size: 38px !important; font-weight: 600 !important; margin-bottom: 6px !important; letter-spacing: 0.01em !important; }
      #header-left .title-tag { font-size: 10px !important; font-family: 'DM Sans', sans-serif !important; letter-spacing: 0.18em !important; background: transparent !important; padding: 0 !important; color: #8b6f47 !important; margin-top:0 !important; }
      #header-right { display: block !important; text-align: right !important; font-size: 11.5px !important; color: #4a4a4a !important; line-height: 1.9 !important; }
      #header-right div { display: block !important; }
      .header-bullet { display: none !important; }

      /* Print Sections */
      .section-wrap { display: flex !important; flex-direction: row !important; margin-bottom: 20px !important; }

      .section-title-wrap { width: var(--col-left) !important; flex-shrink: 0 !important; padding-top: 2px !important; text-align: right !important; }
      .section-title { margin:0 !important; display: block !important; font-size: 9px !important; font-weight: 600 !important; letter-spacing: 0.20em !important; text-transform: uppercase !important; color: #8b6f47 !important; font-family: 'DM Sans', sans-serif !important; padding-top: 4px !important; border:none!important; }
      .section-title::after { display: none !important; }
      .section-divider { display: block !important; width: 32px !important; height: 1px !important; background: #c8b99a !important; margin: 8px 0 0 auto !important; }

      .section-body { flex-grow: 1 !important; border-left: 1px solid #c8b99a !important; padding-left: var(--gap) !important; margin-left: var(--gap) !important; }

      /* Summary Print */
      .summary-text { font-size: 12px !important; line-height: 1.55 !important; font-style: italic !important; margin: 0 !important;}

      /* Jobs Print */
      .job { margin-bottom: 14px !important; padding: 0 !important; border: none !important; background: transparent !important; break-inside: avoid; page-break-inside: avoid;}
      .job-card { padding: 0 !important; background: transparent !important; border: none !important; transform: none !important; }
      .job-header { margin-bottom: 2px !important; flex-direction: row !important; align-items: baseline !important; }
      .job-company { font-size: 16px !important; color: #1a1a1a !important; font-family: 'Cormorant Garamond', serif !important; letter-spacing: 0.01em !important;}
      .job-period { font-size: 10.5px !important; padding: 0 !important; background: transparent !important; color: #888 !important; letter-spacing: 0.04em !important;}
      .job-title { font-size: 10px !important; letter-spacing: 0.08em !important; margin-bottom: 5px !important; }
      .job-bullets li { font-size: 11.5px !important; line-height: 1.5 !important; padding-left: 14px !important; margin-bottom: 2px !important; }
      .job-bullets li::before { content: '—' !important; color: #c8b99a !important; font-size: 11px !important; top: 1px !important; }
      .job-bullets li.bullet-heading { font-size: 8px !important; margin-top: 8px !important; margin-bottom: 3px !important; padding-left: 0 !important; }
      .job+.job { padding-top: 12px !important; border-top: 1px dashed #e8e0d0 !important; }

      /* Skills Print */
      .skills-grid { display: flex !important; flex-direction: column !important; gap: 0 !important; }
      .skill-row { display: flex !important; flex-direction: row !important; align-items: baseline !important; margin-bottom: 10px !important; break-inside: avoid; page-break-inside: avoid; padding: 0!important; background: transparent!important; border: none!important; }
      .skill-cat { width: 160px !important; flex-shrink: 0 !important; margin-right: 12px !important; font-size: 10px !important; margin-bottom: 0 !important; }
      .skill-items { display: flex !important; flex-wrap: wrap !important; margin: -2.5px !important; gap: 0 !important;}
      .skill-chip { font-size: 11px !important; padding: 2px 9px !important; background: #f5f0e8 !important; color: #8b6f47 !important; border: none !important; margin: 2.5px !important; border-radius: 2px !important;}

      /* Certifications / Education Print */
      .edu-grid { display: block !important; }
      .edu-entry { margin-bottom: 8px !important; padding: 0 !important; }
      .edu-institution { font-size: 10px !important; font-family: 'DM Sans', sans-serif !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; color: #888 !important; margin-bottom: 2px !important; font-weight: 600 !important; }
      .edu-detail { font-size: 12px !important; color: #4a4a4a !important; font-family: 'DM Sans', sans-serif !important; }

      .cert-group { margin-bottom: 10px !important; }
      .cert-issuer { font-size: 10px !important; font-family: 'DM Sans', sans-serif !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; color: #888 !important; margin-bottom: 3px !important; font-weight: 600 !important;}
      .cert-items li { font-size: 12px !important; padding-left: 12px !important; margin-bottom: 0 !important;}
      .cert-items li::before { content: '·' !important; color: #8b6f47 !important; font-size: 16px !important; font-weight: normal!important; top: 0 !important;}

      details.job-collapsible .show-more-indicator { display: none !important; }
      details.job-collapsible .job-bullets { display: block !important; }
      details.job-collapsible[open] .job-summary { border-bottom: none !important; margin-bottom: 5px !important; }
      .job-summary { margin-bottom: 5px !important; padding-bottom: 0 !important; }
    }
"""

    css_re = re.compile(r'<style>.*?</style>', re.DOTALL)
    content = css_re.sub('<style>\\n' + new_css.strip() + '\\n  </style>', content)

    # 2. HTML Wrap
    html_re = re.compile(r'<div id="page-wrap">\s*<div id="resume">\s*<div id="loading">Loading resume content…</div>\s*</div>\s*</div>', re.DOTALL)
    new_html = """  <div id="app-container">
    <nav id="nav-matrix">
      <a href="#sect-profile" class="nav-item active">Profile</a>
      <a href="#sect-experience" class="nav-item">Experience</a>
      <a href="#sect-skills" class="nav-item">Skills</a>
      <a href="#sect-education" class="nav-item">Education</a>
      <a href="#sect-certifications" class="nav-item">Certifications</a>
      <a href="#sect-ai" class="nav-item" id="nav-ai" style="display:none;">AI Practice</a>
    </nav>
    <div id="page-wrap">
      <div id="resume">
        <div id="loading" class="resume-block visible">Loading interactive resume...</div>
      </div>
    </div>
  </div>"""
    content = html_re.sub(new_html, content)

    # 3. JS rendering
    new_js = """
    function render(d) {
      const resume = document.getElementById('resume');
      resume.innerHTML = `
        <div class="resume-block" id="sect-profile">
          ${renderHeader(d.meta)}
          ${renderSummary(d.summary)}
        </div>
        <div class="resume-block" id="sect-experience">
          ${renderExperience(d.experience)}
        </div>
        <div class="resume-block" id="sect-skills">
          ${renderSkills(d.skills)}
        </div>
        <div class="resume-block" id="sect-education">
          ${renderEducation(d.education)}
        </div>
        <div class="resume-block" id="sect-certifications">
          ${renderCertifications(d.certifications)}
        </div>
        ${d.aiPractitioner ? `<div class="resume-block" id="sect-ai">${renderAIPractitioner(d.aiPractitioner)}</div>` : ''}
      `;

      if (d.aiPractitioner) {
        document.getElementById('nav-ai').style.display = 'flex';
      }

      setupIntersectionObserver();
    }

    function renderHeader(m) {
      return `
    <div id="header">
      <div id="header-left">
        <h1>${m.name}</h1>
        <div class="title-tag">${m.title}</div>
      </div>
      <div id="header-right">
        <div>${m.email}</div>
        <div class="header-bullet">•</div>
        <div>${m.phone}</div>
        <div class="header-bullet">•</div>
        <div>${m.location}</div>
        <div class="header-bullet">•</div>
        <div><a href="${m.linkedinUrl}" target="_blank">${m.linkedin}</a></div>
      </div>
    </div>
  `;
    }

    function renderSummary(text) {
      return `
    <div class="section-wrap">
      <div class="section-title-wrap">
        <h2 class="section-title">Profile</h2>
        <div class="section-divider"></div>
      </div>
      <div class="section-body">
        <p class="summary-text">${text}</p>
      </div>
    </div>
  `;
    }

    function renderExperience(jobs) {
      const lastHsaIndex = jobs.reduce((lastIndex, job, index) =>
        job.company.toLowerCase().includes('hsa bank') ? index : lastIndex, -1
      );

      const jobsHTML = jobs.map((j, index) => {
        const jobHeader = `
      <div class="job-header">
        <div class="job-company">${j.company}</div>
        <div class="job-period">${j.period}</div>
      </div>
    `;
        const jobTitle = `<div class="job-title">${j.title}</div>`;
        const bulletList = `
      <ul class="job-bullets">
        ${j.bullets.map(b => b.startsWith('##')
          ? `<li class="bullet-heading">${b.slice(2).trim()}</li>`
          : `<li>${b}</li>`
        ).join('')}
      </ul>
    `;

        if (lastHsaIndex !== -1 && index > lastHsaIndex) {
          return `
    <details class="job job-collapsible">
      <summary class="job-summary job-card">
        ${jobHeader}
        ${jobTitle}
        <span class="show-more-indicator">Show Details</span>
      </summary>
      <div style="padding-left: 24px; padding-bottom:24px;">${bulletList}</div>
    </details>
  `;
        }

        return `
    <div class="job job-card">
      ${jobHeader}
      ${jobTitle}
      ${bulletList}
    </div>
  `;
      }).join('');

      return `
    <div class="section-wrap">
      <div class="section-title-wrap">
        <h2 class="section-title">Experience</h2>
        <div class="section-divider"></div>
      </div>
      <div class="section-body">
        ${jobsHTML}
      </div>
    </div>
  `;
    }

    function renderSkills(skills) {
      const rows = skills.map(s => `
    <div class="skill-row skill-card">
      <div class="skill-cat">${s.category}</div>
      <div class="skill-items">
        ${s.items.map(i => `<span class="skill-chip">${i}</span>`).join('')}
      </div>
    </div>
  `).join('');

      return `
    <div class="section-wrap">
      <div class="section-title-wrap">
        <h2 class="section-title">Skills</h2>
        <div class="section-divider"></div>
      </div>
      <div class="section-body">
        <div class="skills-grid">${rows}</div>
      </div>
    </div>
  `;
    }

    function renderCertifications(certs) {
      const groups = certs.map(c => `
    <div class="cert-group">
      <div class="cert-issuer">${c.issuer}</div>
      <ul class="cert-items">
        ${c.items.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>
  `).join('');

      return `
    <div class="section-wrap">
      <div class="section-title-wrap">
        <h2 class="section-title">Certifications</h2>
        <div class="section-divider"></div>
      </div>
      <div class="section-body">
        <div class="edu-grid">${groups}</div>
      </div>
    </div>
  `;
    }

    function renderEducation(education) {
      if (!education || !education.length) return '';
      const entries = education.map(e => `
    <div class="edu-entry edu-card">
      <div class="edu-institution">${e.institution}</div>
      <div class="edu-detail">${e.degree} &mdash; ${e.location}, ${e.year}</div>
    </div>
  `).join('');
      return `
    <div class="section-wrap">
      <div class="section-title-wrap">
        <h2 class="section-title">Education</h2>
        <div class="section-divider"></div>
      </div>
      <div class="section-body">
        <div class="edu-grid">${entries}</div>
      </div>
    </div>
  `;
    }

    function renderAIPractitioner(section) {
      if (!section) return '';
      const bullets = section.bullets.map(b => {
        const colon = b.indexOf(':');
        if (colon > 0 && colon < 35) {
          return `<li><strong>${b.slice(0, colon + 1)}</strong>${b.slice(colon + 1)}</li>`;
        }
        return `<li>${b}</li>`;
      }).join('');
      return `
    <div class="section-wrap">
      <div class="section-title-wrap">
        <h2 class="section-title">AI Practice</h2>
        <div class="section-divider"></div>
      </div>
      <div class="section-body">
        ${section.intro ? `<p class="summary-text" style="margin-bottom:20px;">${section.intro}</p>` : ''}
        <ul class="job-bullets">${bullets}</ul>
      </div>
    </div>
  `;
    }

    // ── Intersection Observer ──────────────────────────────────────────────────
    function setupIntersectionObserver() {
      const blocks = document.querySelectorAll('.resume-block');
      const navItems = document.querySelectorAll('.nav-item');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Highlight nav 
            const id = entry.target.id;
            navItems.forEach(n => {
              if (n.getAttribute('href') === '#' + id) {
                 n.classList.add('active');
              } else {
                 n.classList.remove('active');
              }
            });
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -20% 0px' });

      blocks.forEach(block => observer.observe(block));
    }
"""
    # Replace exactly from 'function render(d)' up to the end of 'renderEducation'. (we check till the end of practitioner)
    js_re = re.compile(r'function render\(d\).*?function renderEducation\(education\)\s*\{.*?return `.*?`;\s*\}', re.DOTALL)
    # The Regex might be tricky, let's just do a simpler replacement using str.replace if possible.
    # Actually, we can just replace everything between 'function render(d) {' and '// ── PDF export'
    pdf_export_idx = content.find('// ── PDF export')
    render_idx = content.find('function render(d)')
    if render_idx != -1 and pdf_export_idx != -1:
        content = content[:render_idx] + new_js.strip() + "\n\n    " + content[pdf_export_idx:]
    else:
        print("Could not find js boundaries")

    with open(filepath, 'w') as f:
        f.write(content)
    
    print("Update successful")

if __name__ == '__main__':
    main()
