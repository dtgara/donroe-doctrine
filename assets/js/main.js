/* =============================================================================
   THE DONROE DOCTRINE — Main JavaScript
   Handles: mobile nav, grouped dropdown nav, filter bars, quote sharing
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------------
     Mobile Navigation Toggle
     ------------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-nav')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        closeAllDropdowns();
      }
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------------------------------
     Grouped Dropdown Nav
     — Desktop: hover handled by CSS
     — Mobile: click toggles .open on the parent .nav-dropdown
     — Click outside closes all
     ------------------------------------------------------------------------- */
  function closeAllDropdowns(except) {
    document.querySelectorAll('.nav-dropdown').forEach(function (dd) {
      if (dd !== except) {
        dd.classList.remove('open');
        const btn = dd.querySelector('.nav-dropdown-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('.nav-dropdown-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      const parent = trigger.closest('.nav-dropdown');
      const isOpen = parent.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) closeAllDropdowns(parent);
    });
  });

  /* Close dropdowns on outside click (desktop) */
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-dropdown')) {
      closeAllDropdowns();
    }
  });

  /* Keyboard: Escape closes open dropdown */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllDropdowns();
  });

  /* ---------------------------------------------------------------------------
     Generic Filter Bar
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
        if (val && val !== 'all') filters[key] = val;
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
     Smooth anchor scrolling
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
