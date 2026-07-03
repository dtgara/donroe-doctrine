/* =============================================================================
   THE DONROE DOCTRINE — Interactive World Map v8
   v8: fix the map not filling the full width of its container. Root cause
   was a fixed integer zoom (2), at which Leaflet's tiles only cover
   256 * 2^2 = 1024px of true width — Leaflet renders tiles true-to-scale,
   it does not stretch them to fill an arbitrarily wide container. On any
   screen wider than ~1024px (nearly all desktops), that left gray
   placeholder background on both sides of the actual map, which read as
   "not full width" / "about half the screen."

   Fix: allow fractional zoom (zoomSnap: 0) and call fitBounds() on the
   world extent after the map initialises, so Leaflet computes whatever
   zoom level makes the world exactly fill the container's actual pixel
   width. Re-fit on window resize (via invalidateSize, which recalculates
   Leaflet's cached container size and refreshes the world-copy bounds)
   so it keeps filling the container if the window is resized after load.
   ========================================================================== */

(function () {
  'use strict';

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

  var countryIndex = {};

  /* Read country data from embedded JSON element — set by Jekyll in map.html */
  var dataEl = document.getElementById('doctrine-country-data');
  if (dataEl) {
    try {
      var parsed = JSON.parse(dataEl.textContent);
      if (Array.isArray(parsed)) {
        parsed.forEach(function (entry) {
          if (entry.code) countryIndex[entry.code.toUpperCase()] = entry;
        });
      }
      console.log('Doctrine Map: loaded', Object.keys(countryIndex).length, 'countries from embedded data');
    } catch (e) {
      console.warn('Doctrine Map: failed to parse embedded data', e);
    }
  } else {
    console.warn('Doctrine Map: #doctrine-country-data element not found');
  }

  /* ---------------------------------------------------------------------------
     Initialise Leaflet map
     ------------------------------------------------------------------------- */
  var mapEl = document.getElementById('doctrine-map');
  if (!mapEl) return;

  var WORLD_BOUNDS = [[-60, -170], [75, 170]];

  var map = L.map('doctrine-map', {
    center: [20, 10],
    zoom: 2,
    minZoom: 1,
    maxZoom: 6,
    zoomSnap: 0.1,
    zoomDelta: 0.5,
    zoomControl: true,
    attributionControl: true,
    worldCopyJump: false,
    maxBounds: [[-85, -210], [85, 210]],
    maxBoundsViscosity: 1.0
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
    noWrap: true,
    detectRetina: false
  }).addTo(map);

  /* Size the initial view to the container's real pixel width instead of a
     fixed integer zoom, so the map fills the container edge-to-edge on any
     screen size. */
  map.fitBounds(WORLD_BOUNDS, { animate: false });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      map.invalidateSize();
    }, 150);
  });

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

  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildPanelHTML(d) {
    var status      = d.status || 'IGNORED';
    var color       = STATUS_COLORS[status] || STATUS_COLORS['IGNORED'];
    var statusLabel = STATUS_LABELS[status] || status;
    var html = '';
    html += '<h2 class="country-panel-name">' + escHtml(d.name || '') + '</h2>';
    html += '<span class="country-panel-status" style="background:' + color + ';">' + escHtml(statusLabel) + '</span>';
    if (d.descriptor) {
      html += '<p class="country-panel-descriptor">' + escHtml(d.descriptor) + '</p>';
    }
    if (d.last_updated) {
      html += '<p class="country-panel-incident-date">Last updated: ' + escHtml(d.last_updated) + '</p>';
    }
    if (d.latest_incident) {
      html += '<p class="country-panel-incident">' + escHtml(d.latest_incident) + '</p>';
    } else if (status === 'IGNORED') {
      html += '<p class="country-panel-incident" style="color:var(--color-light-grey);font-style:italic;">No documented foreign policy incident to date. This is accurate.</p>';
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
    var status = entry ? (entry.status || 'IGNORED') : 'IGNORED';
    return {
      fillColor:   STATUS_COLORS[status] || STATUS_COLORS['IGNORED'],
      fillOpacity: status === 'IGNORED' ? 0.3 : 0.85,
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
        openPanel(entry || { name: name, code: code, status: 'IGNORED' });
      },
      mouseover: function (e) {
        var lyr    = e.target;
        var code   = getCode(feature);
        var entry  = countryIndex[code];
        var status = entry ? (entry.status || 'IGNORED') : 'IGNORED';
        lyr.setStyle({ fillOpacity: status === 'IGNORED' ? 0.45 : 0.95, weight: 1.5 });
        lyr.bringToFront();
      },
      mouseout: function (e) {
        if (geolayer) geolayer.resetStyle(e.target);
      }
    });
  }

  /* ---------------------------------------------------------------------------
     Fetch GeoJSON and render
     ------------------------------------------------------------------------- */
  var geojsonUrl = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

  fetch(geojsonUrl)
    .then(function (r) {
      if (!r.ok) throw new Error('GeoJSON fetch failed: ' + r.status);
      return r.json();
    })
    .then(function (geoData) {
      if (geoData.features && geoData.features.length > 0) {
        console.log('Doctrine Map: first feature props:', JSON.stringify(geoData.features[0].properties));
      }
      geolayer = L.geoJSON(geoData, {
        style: styleFeature,
        onEachFeature: onEachFeature
      }).addTo(map);
      console.log('Doctrine Map: rendered', geoData.features.length, 'features');
    })
    .catch(function (err) {
      console.warn('Doctrine Map: GeoJSON failed', err);
    });

  map.on('click', function () { closePanel(); });

})();
