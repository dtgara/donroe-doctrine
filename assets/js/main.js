/* =============================================================================
   THE DONROE DOCTRINE — Main JavaScript
   Handles: mobile nav, filter bars, quote sharing
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------------
     Mobile Navigation
     ------------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close nav on outside click
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-nav')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close nav after link click (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------------------------------
     Generic Filter Bar
     Looks for [data-filter-target] on select/input elements and filters
     [data-filter-item] elements by their [data-*] attributes.
     ------------------------------------------------------------------------- */
  function initFilterBar(barEl) {
    if (!barEl) return;
    const inputs = barEl.querySelectorAll('[data-filter-key]');
    const container = document.querySelector(barEl.dataset.filterContainer);
    if (!container) return;

    const items = Array.from(container.querySelectorAll('[data-filter-item]'));

    function applyFilters() {
      const filters = {};
      inputs.forEach(function (inp) {
        const key = inp.dataset.filterKey;
        const val = (inp.tagName === 'SELECT' ? inp.value : inp.value.trim()).toLowerCase();
        if (val && val !== 'all') {
          filters[key] = val;
        }
      });

      let visibleCount = 0;
      items.forEach(function (item) {
        let show = true;
        Object.entries(filters).forEach(function ([key, val]) {
          const itemVal = (item.dataset[key] || '').toLowerCase();
          if (!itemVal.includes(val)) show = false;
        });
        item.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });

      // Update count display if present
      const countEl = document.querySelector('[data-filter-count]');
      if (countEl) countEl.textContent = visibleCount;
    }

    inputs.forEach(function (inp) {
      inp.addEventListener('change', applyFilters);
      inp.addEventListener('input', applyFilters);
    });

    applyFilters();
  }

  document.querySelectorAll('[data-filter-container]').forEach(initFilterBar);

  /* ---------------------------------------------------------------------------
     Quote Share Links
     Generates a shareable URL for each quote entry.
     ------------------------------------------------------------------------- */
  document.querySelectorAll('.quote-share-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const url = link.href || window.location.href + '#' + link.dataset.quoteId;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          const original = link.textContent;
          link.textContent = 'Copied.';
          setTimeout(function () { link.textContent = original; }, 1500);
        });
      }
    });
  });

  /* ---------------------------------------------------------------------------
     Smooth anchor scrolling (for doctrine clauses etc.)
     ------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
