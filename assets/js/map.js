/* =============================================================================
   THE DONROE DOCTRINE — Interactive World Map
   Built with Leaflet.js. Country data from _data/map.yml (compiled to JSON by Jekyll).
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------------
     Status colour mapping
     ------------------------------------------------------------------------- */
  var STATUS_COLORS = {
    'ALLY_PROVISIONAL': '#2E7D32',
    'ADVERSARY':        '#C0392B',
    'FOR_ACQUISITION':  '#B8860B',
    'TARIFF_TARGET':    '#E65100',
    'IGNORED':          '#9E9E9E',
    'STATUS_UNCLEAR':   '#1565C0'
  };

  var STATUS_LABELS = {
    'ALLY_PROVISIONAL': 'Ally (Provisional)',
    'ADVERSARY':        'Adversary',
    'FOR_ACQUISITION':  'For Acquisition',
    'TARIFF_TARGET':    'Tariff Target',
    'IGNORED':          'Ignored',
    'STATUS_UNCLEAR':   'Status Unclear'
  };

  /* ---------------------------------------------------------------------------
     Map data — injected by Jekyll from _data/map.yml
     In production, Jekyll compiles this to a JS-accessible array.
     ------------------------------------------------------------------------- */
  var mapData = window.DOCTRINE_MAP_DATA || [];

  // Build lookup by ISO code
  var countryIndex = {};
  if (Array.isArray(mapData)) {
    mapData.forEach(function (entry) {
      if (entry.code) countryIndex[entry.code.toUpperCase()] = entry;
    });
  }

  /* ---------------------------------------------------------------------------
     Initialise Leaflet map
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

  // Neutral tile layer — muted, editorial
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  /* ---------------------------------------------------------------------------
     Country panel
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

  function buildPanelHTML(d) {
    var status      = d.status || 'IGNORED';
    var color       = STATUS_COLORS[status] || STATUS_COLORS['IGNORED'];
    var statusLabel = STATUS_LABELS[status] || status;
    var html = '';

    html += '<h2 class="country-panel-name">' + escHtml(d.country) + '</h2>';
    html += '<span class="country-panel-status" style="background:' + color + ';">' + escHtml(statusLabel) + '</span>';

    if (d.descriptor) {
      html += '<p class="country-panel-descriptor">' + escHtml(d.descriptor) + '</p>';
    }

    if (d.last_incident_date) {
      html += '<p class="country-panel-incident-date">Most recent incident: ' + escHtml(d.last_incident_date) + '</p>';
    }

    if (d.last_incident) {
      html += '<p class="country-panel-incident">' + escHtml(d.last_incident) + '</p>';
    } else if (status === 'IGNORED') {
      html += '<p class="country-panel-incident" style="color:var(--color-light-grey);font-style:italic;">No documented foreign policy incident to date. This is accurate.</p>';
    }

    // Canada — annexation progress bar
    if (d.code === 'CA' && typeof d.annexation_progress !== 'undefined') {
      html += '<div class="annexation-bar">';
      html += '<div class="annexation-bar-label"><span>Annexation Progress</span><span>' + d.annexation_progress + '%</span></div>';
      html += '<div class="annexation-bar-track"><div class="annexation-bar-fill" style="width:' + d.annexation_progress + '%;"></div></div>';
      html += '</div>';
    }

    // Greenland — purchase status
    if (d.code === 'GL' && d.purchase_status) {
      html += '<div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--color-border);">';
      html += '<p style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-light-grey);margin-bottom:0.3rem;">Purchase Offer Status</p>';
      html += '<p style="font-family:var(--font-mono);font-size:var(--text-sm);">' + escHtml(d.purchase_status) + '</p>';
      html += '</div>';
    }

    return html;
  }

  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ---------------------------------------------------------------------------
     Load GeoJSON and colour countries
     ------------------------------------------------------------------------- */
  var geojsonUrl = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

  function styleFeature(feature) {
    var code  = (feature.properties.ISO_A2 || feature.properties.iso_a2 || '').toUpperCase();
    var entry = countryIndex[code];
    var status = entry ? (entry.status || 'IGNORED') : 'IGNORED';
    var color = STATUS_COLORS[status] || STATUS_COLORS['IGNORED'];

    return {
      fillColor:   color,
      fillOpacity: status === 'IGNORED' ? 0.25 : 0.85,
      color:       '#ffffff',
      weight:      0.5,
      opacity:     0.8
    };
  }

  function onEachFeature(feature, layer) {
    layer.on({
      click: function (e) {
        L.DomEvent.stopPropagation(e);
        var code  = (feature.properties.ISO_A2 || feature.properties.iso_a2 || '').toUpperCase();
        var entry = countryIndex[code];
        var name  = feature.properties.ADMIN || feature.properties.name || code;

        if (entry) {
          openPanel(entry);
        } else {
          openPanel({ country: name, code: code, status: 'IGNORED' });
        }
      },
      mouseover: function (e) {
        var layer = e.target;
        var code = (feature.properties.ISO_A2 || feature.properties.iso_a2 || '').toUpperCase();
        var entry = countryIndex[code];
        var status = entry ? (entry.status || 'IGNORED') : 'IGNORED';
        if (status !== 'IGNORED') {
          layer.setStyle({ fillOpacity: 0.95, weight: 1.5 });
        } else {
          layer.setStyle({ fillOpacity: 0.4 });
        }
        layer.bringToFront();
      },
      mouseout: function (e) {
        geolayer.resetStyle(e.target);
      }
    });
  }

  var geolayer;
  fetch(geojsonUrl)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      geolayer = L.geoJSON(data, {
        style: styleFeature,
        onEachFeature: onEachFeature
      }).addTo(map);
    })
    .catch(function (err) {
      console.warn('Doctrine Map: GeoJSON failed to load.', err);
    });

  // Close panel on map click
  map.on('click', function () { closePanel(); });

})();
