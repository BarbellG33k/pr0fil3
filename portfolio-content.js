/*
 * portfolio-content.js - shared loader for portfolio pages.
 *
 * Single source of truth: portfolio-content.json. Five portfolio pages
 * (herald, cipher, ember, apex, nova) all hydrate their bio, hero tagline,
 * and case-study cards from this file via the same loader, so the same
 * copy never lives in two places.
 *
 * Behavior:
 *   - Tries to fetch portfolio-content.json (live, edge-cached).
 *   - Falls back to a <script type="application/json" id="portfolio-data">
 *     block embedded in the page so the same content still renders when
 *     the JSON fetch is offline-blocked (e.g., file:// previews).
 *   - Once loaded, exposes window.PORTFOLIO_DATA and patches any DOM
 *     hooks with [data-pc="..."] attributes:
 *       data-pc="tagline" -> textContent of data.hero.tagline
 *       data-pc="bio"     -> textContent of data.summary
 *       data-pc="cards"   -> renders filtered case-study cards
 *
 *   Card filtering: each card declares which portfolio variants it
 *   appears on via a "variants" array; the loader filters by the
 *   page's data-pc-variant attribute on the hook element (or
 *   document.body.getAttribute("data-variant") defaulting to "all").
 *
 *   URL handling: case-study URLs are stored without variant suffix;
 *   caseStudyUrl(url, variant) appends "-<variant>" for cipher and
 *   ember; returns the original URL for herald/apex/nova.
 */
window.PortfolioContent = (function () {
  'use strict';

  let data = null;

  function esc(s) {
    return s == null ? '' : String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Resolve the current variant from a hook element's data-pc-variant
  // or document.body[data-variant]. Falls back to 'all' when neither is set.
  function currentVariant(el) {
    return (el && el.dataset && el.dataset.pcVariant) ||
      (document.body && document.body.dataset && document.body.dataset.variant) ||
      'all';
  }

  // Apply variant-specific URL suffix for case study links. Cipher and Ember
  // ship themed URL variants of each case study; the others reuse the base URL.
  function caseStudyUrl(url, variant) {
    if (!url) return url;
    if (variant !== 'cipher' && variant !== 'ember') return url;
    return url.replace(/\.html$/, '-' + variant + '.html');
  }

  // Per-variant card templates matching existing per-variant styling.
  function renderCardHtml(c, variant) {
    const href = esc(caseStudyUrl(c.url, variant));
    if (variant === 'cipher' || variant === 'ember') {
      return `<a class="stat-card block hover:border-dashboard-accent/60 transition-colors" href="${href}">`
        + `<div class="text-[9px] font-mono text-dashboard-accent uppercase mb-2">${esc(c.category)}</div>`
        + `<h4 class="text-base font-bold text-white mb-2">${esc(c.title)}</h4>`
        + `<p class="text-xs text-dashboard-muted leading-relaxed">${esc(c.tagline)}</p>`
        + '</a>';
    }
    if (variant === 'apex') {
      return `<a class="stat-card block" href="${href}">`
        + `<div class="text-[9px] font-mono text-dashboard-accent uppercase mb-2">${esc(c.category)}</div>`
        + `<h4 class="text-base font-bold text-white mb-2">${esc(c.title)}</h4>`
        + `<p class="text-xs text-dashboard-muted leading-relaxed">${esc(c.tagline)}</p>`
        + '</a>';
    }
    if (variant === 'nova') {
      return `<a class="bg-white p-8 editorial-shadow border border-outline-variant/30 block hover:border-secondary/40 transition-colors" href="${href}">`
        + `<div class="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">${esc(c.category)}</div>`
        + `<h4 class="text-xl font-headline font-semibold text-primary-container mb-2">${esc(c.title)}</h4>`
        + `<p class="text-sm text-on-surface-variant leading-relaxed">${esc(c.tagline)}</p>`
        + '</a>';
    }
    // herald (default) - editorial card with rounded corners.
    return `<a class="bg-white p-6 rounded-xl editorial-shadow border border-outline-variant/30 block hover:border-secondary/40 transition-colors" href="${href}">`
      + `<div class="text-[10px] font-label uppercase tracking-widest text-secondary mb-2">${esc(c.category)}</div>`
      + `<h4 class="text-lg font-headline font-medium text-primary-container mb-2">${esc(c.title)}</h4>`
      + `<p class="text-sm text-on-surface-variant leading-relaxed">${esc(c.tagline)}</p>`
      + '</a>';
  }

  function hydrate() {
    if (!data) return;
    document.querySelectorAll('[data-pc="tagline"]').forEach(function (el) {
      el.textContent = data.hero.tagline;
    });
    document.querySelectorAll('[data-pc="bio"]').forEach(function (el) {
      el.textContent = data.summary;
    });
    document.querySelectorAll('[data-pc="cards"]').forEach(function (el) {
      const variant = currentVariant(el);
      const cards = (data.caseStudyCards || []).filter(function (c) {
        return !c.variants || c.variants.indexOf(variant) !== -1 || variant === 'all';
      });
      el.innerHTML = cards.map(function (c) { return renderCardHtml(c, variant); }).join('');
    });
  }

  function setData(d) {
    data = d;
    window.PORTFOLIO_DATA = d;
    document.querySelectorAll('[data-pc-status="loading"]').forEach(function (e) {
      e.removeAttribute('data-pc-status');
    });
    hydrate();
  }

  function fetchLive() {
    return fetch('portfolio-content.json', { credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('bad status')); });
  }

  function readEmbedded() {
    const el = document.getElementById('portfolio-data');
    return el ? JSON.parse(el.textContent) : null;
  }

  // Start the load on script execution so callers reading PORTFOLIO_DATA
  // synchronously after this script only see data that wasn't ready yet.
  // Promise exposes .then(cb) so pages can wait before driving their own
  // custom rendering.
  const ready = fetchLive()
    .then(setData)
    .catch(function () {
      const d = readEmbedded();
      if (d) setData(d);
    });

  return {
    data: function () { return data; },
    whenReady: function (cb) { return ready.then(function () { cb(data); }); },
    caseStudyUrl: caseStudyUrl,
    esc: esc,
    hydrate: hydrate
  };
})();
