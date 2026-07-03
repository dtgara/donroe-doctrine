/* =============================================================================
   THE DONROE DOCTRINE — Vacancies Map v1
   Adapted from map-v5.js (the main Doctrine Map). Reuses the same DOM
   element IDs and CSS classes as the main map (#doctrine-map,
   .map-container, .map-legend*, #country-panel, .country-panel-*) so this
   page inherits the exact CSS already proven to work in assets/css/style-v2.css,
   rather than risking new layout bugs with a parallel class set. IDs only
   need to be unique per page, so reusing them on a second page is safe.

   Also reuses the hard-won fixes from the main map's history:
     - Country/post data is embedded via a <script type="application/json">
       tag and parsed with JSON.parse — NOT a window global, NOT a fetched
       Jekyll-generated endpoint. Both were tried and replaced on the main
       map for reliability/caching reasons.
     - GeoJSON country code lookup checks "ISO3166-1-Alpha-2" first, falling
       back to ISO_A2 / iso_a2 — the actual property name in the geo-countries
       dataset, confirmed against the main map's fix history.
     - No Leaflet Subresource Integrity (SRI) hashes on the CSS/JS includes —
       a hash mismatch blocked the main map in Safari previously.
     - This file has its own name (not map-v5.js) so editing it doesn't
       collide with the main map's cache-busting history. If this file's
       logic changes materially later, rename it (e.g. vacancies-map-v2.js)
       to force a cache bust, the same way the main map went v3 -> v4 -> v5.
   ========================================================================== */

(function () {
  'use strict';

  var STATUS_COLORS = {
    'vacant':                  '#C0392B',
    'political_appointee':     '#B8860B',
    'career_appointee':        '#2E7D32',
    'acting_charge_daffaires': '#1565C0',
    'unlisted':                '#9E9E9E'
  };

  var STATUS_LABELS = {
    'vacant':                  'Vacant',
    'political_appointee':     'Political Appointee',
    'career_appointee':        'Career Foreign Service',
    'acting_charge_daffaires': "Acting Chargé d'Affaires",
    'unlisted':                'Not Yet Catalogued'
  };

  var countryIndex = {};

  /* Read post data from embedded JSON element — set by Jekyll in vacancies.html */
  var dataEl = document.getElementById('vacancy-post-data');
  if (dataEl) {
    try {
      var parsed = JSON.parse(dataEl.textContent);
      if (Array.isArray(parsed)) {
        parsed.forEach(function (entry) {
          if (entry.code) countryIndex[entry.code.toUpperCase()] = entry;
        });
      }
      console.log('Vacancies Map: loaded', Object.keys(countryIndex).length, 'posts from embedded data');
    } catch (e) {
      console.warn('Vacancies Map: failed to parse embedded data', e);
    }
  } else {
    console.warn('Vacancies Map: #vacancy-post-data element not found');
  }

  /* ---------------------------------------------------------------------------
     Initialise Leaflet map — reuses #doctrine-map sizing from style-v2.css
     ------------------------------------------------------------------------- */
  var mapEl = document.getElementById('doctrine-map');
  if (!mapEl) return;

  var map = L.map('doctrine-map', {
    center: [20, 10],
    zoom: 2,
    minZoom: 2,
    maxZoom: 6,
    zoomControl: true,
    attributionControl: true,
    worldCopyJump: false,
    maxBounds: [[-85, -210], [85, 210]],
    maxBoundsViscosity: 1.0
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  /* ---------------------------------------------------------------------------
     Country panel — reuses #country-panel / .country-panel-* from style-v2.css
     ------------------------------------------------------------------------- */
  var panel     = document.getElementById('country-panel');
  var panelBody = document.getElementById('panel-content');
  var closeBtn  = document.getElementById('panel-close');

  function openPanel(data) {
    if (!panel || !panelBody) return;
    panelBody.innerHTML = buildPanelHTML(data);
    panel.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
  }

  function closePanel() {
    if (!panel) return;
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
  }

  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildPanelHTML(d) {
    var status      = d.status || 'unlisted';
    var color       = STATUS_COLORS[status] || STATUS_COLORS['unlisted'];
    var statusLabel = STATUS_LABELS[status] || status;
    var html = '';

    html += '<h2 class="country-panel-name">' + escHtml(d.name || '') + '</h2>';
    html += '<span class="country-panel-status" style="background:' + color + ';">' + escHtml(statusLabel) + '</span>';

    var descriptorParts = [];
    if (d.appointee) {
      descriptorParts.push(escHtml(d.appointee) + (d.appointee_type ? ' (' + escHtml(d.appointee_type) + ')' : ''));
    }
    if (d.vacancy_reason) {
      descriptorParts.push('Reason: ' + escHtml(d.vacancy_reason.replace(/_/g, ' ')));
    }
    if (descriptorParts.length) {
      html += '<p class="country-panel-descriptor">' + descriptorParts.join(' — ') + '</p>';
    }

    if (d.vacant_since) {
      html += '<p class="country-panel-incident-date">Vacant since: ' + escHtml(d.vacant_since) + '</p>';
    } else if (d.region) {
      html += '<p class="country-panel-incident-date">' + escHtml(d.region) + (d.strategic_flag ? ' — flagged as strategically significant' : '') + '</p>';
    }

    if (d.notes) {
      html += '<p class="country-panel-incident">' + escHtml(d.notes) + '</p>';
    } else if (status === 'unlisted') {
      html += '<p class="country-panel-incident" style="color:var(--color-light-grey);font-style:italic;">Not yet catalogued in this register. Absence here does not imply the post is filled — see the register note below the map.</p>';
    } else if (status === 'vacant') {
      html += '<p class="country-panel-incident" style="color:var(--color-light-grey);font-style:italic;">Documented vacant as of the register snapshot date. No further detail catalogued for this post yet.</p>';
    }

    return html;
  }

  /* ---------------------------------------------------------------------------
     GeoJSON styling
     ------------------------------------------------------------------------- */
  function getCode(feature) {
    var p = feature.properties;
    return (p["ISO3166-1-Alpha-2"] || p.ISO_A2 || p.iso_a2 || "").toUpperCase();
  }

  function styleFeature(feature) {
    var code   = getCode(feature);
    var entry  = countryIndex[code];
    var status = entry ? (entry.status || 'unlisted') : 'unlisted';
    return {
      fillColor:   STATUS_COLORS[status] || STATUS_COLORS['unlisted'],
      fillOpacity: status === 'unlisted' ? 0.15 : 0.85,
      color:       '#ffffff',
      weight:      0.5,
      opacity:     0.8
    };
  }

  var geolayer;

  function onEachFeature(feature, layer) {
    layer.on({
      click: function (e) {
        L.DomEvent.stopPropagation(e);
        var code  = getCode(feature);
        var entry = countryIndex[code];
        var name  = feature.properties.ADMIN || feature.properties.name || code;
        openPanel(entry || { name: name, code: code, status: 'unlisted' });
      },
      mouseover: function (e) {
        var lyr    = e.target;
        var code   = getCode(feature);
        var entry  = countryIndex[code];
        var status = entry ? (entry.status || 'unlisted') : 'unlisted';
        lyr.setStyle({ fillOpacity: status === 'unlisted' ? 0.3 : 0.95, weight: 1.5 });
        lyr.bringToFront();
      },
      mouseout: function (e) {
        if (geolayer) geolayer.resetStyle(e.target);
      }
    });
  }

  /* ---------------------------------------------------------------------------
     Fetch GeoJSON and render — same public source as the main Doctrine Map,
     for identical country boundary shapes and property naming.
     ------------------------------------------------------------------------- */
  var geojsonUrl = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

  fetch(geojsonUrl)
    .then(function (r) {
      if (!r.ok) throw new Error('GeoJSON fetch failed: ' + r.status);
      return r.json();
    })
    .then(function (geoData) {
      geolayer = L.geoJSON(geoData, {
        style: styleFeature,
        onEachFeature: onEachFeature
      }).addTo(map);
      console.log('Vacancies Map: rendered', geoData.features.length, 'features');
    })
    .catch(function (err) {
      console.warn('Vacancies Map: GeoJSON failed', err);
    });

  map.on('click', function () { closePanel(); });

})();
