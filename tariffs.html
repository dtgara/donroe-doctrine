---
layout: default
title: "Tariff Calculator"
body_class: page-tariffs
---

<header class="section-header">
  <div class="section-header-inner">
    <p class="section-label">Section IX — Tariff Calculator</p>
    <h1 class="section-title">Tariff Calculator</h1>
    <p class="section-intro">
      Select a country and product category to retrieve the current tariff rate,
      change history, and the official Doctrine Assessment of what this means
      for the bilateral relationship.
    </p>
  </div>
</header>

<div class="section-body">
<div class="tariff-calculator">

  <form class="tariff-form" id="tariff-form">
    <div class="form-group">
      <label class="form-label" for="tariff-country">Country</label>
      <select class="form-select" id="tariff-country">
        <option value="">Select a country&hellip;</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label" for="tariff-product">Product Category</label>
      <select class="form-select" id="tariff-product" disabled>
        <option value="">Select a product category&hellip;</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Calculate Tariff</button>
  </form>

  <div class="tariff-result" id="tariff-result">
    <div class="tariff-result-header">
      <div>
        <div class="tariff-result-rate-label">Current Rate</div>
        <div class="tariff-result-rate" id="result-rate">—</div>
      </div>
      <div style="text-align:right;">
        <div class="tariff-result-rate-label">Country</div>
        <div style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--color-white);" id="result-country">—</div>
      </div>
    </div>
    <div class="tariff-result-body">
      <div class="tariff-result-meta">
        <div class="tariff-result-meta-item">
          <label>Product</label>
          <span id="result-product">—</span>
        </div>
        <div class="tariff-result-meta-item">
          <label>Effective Date</label>
          <span id="result-date">—</span>
        </div>
        <div class="tariff-result-meta-item">
          <label>Rate Changes</label>
          <span id="result-changes">—</span>
        </div>
        <div class="tariff-result-meta-item">
          <label>Term Set</label>
          <span id="result-term">—</span>
        </div>
      </div>
      <div class="tariff-doctrine-assessment">
        <p class="tariff-doctrine-assessment-label">Doctrine Assessment</p>
        <p id="result-assessment">—</p>
      </div>
    </div>
  </div>

</div>
</div>

<script>
(function() {
  // Tariff data is compiled from _data/tariffs.yml by Jekyll
  var tariffData = {{ site.data.tariffs | jsonify }};

  var countrySelect  = document.getElementById('tariff-country');
  var productSelect  = document.getElementById('tariff-product');
  var form           = document.getElementById('tariff-form');
  var resultPanel    = document.getElementById('tariff-result');

  if (!tariffData || !tariffData.length) return;

  // Populate countries
  tariffData.forEach(function(entry) {
    var opt = document.createElement('option');
    opt.value = entry.code;
    opt.textContent = entry.country;
    countrySelect.appendChild(opt);
  });

  countrySelect.addEventListener('change', function() {
    var code = countrySelect.value;
    productSelect.innerHTML = '<option value="">Select a product category&hellip;</option>';
    productSelect.disabled = true;
    resultPanel.classList.remove('active');

    if (!code) return;
    var entry = tariffData.find(function(e) { return e.code === code; });
    if (!entry || !entry.categories) return;

    entry.categories.forEach(function(cat) {
      var opt = document.createElement('option');
      opt.value = cat.product;
      opt.textContent = cat.product + ' (' + cat.rate_percent + '%)';
      productSelect.appendChild(opt);
    });
    productSelect.disabled = false;
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var code    = countrySelect.value;
    var product = productSelect.value;
    if (!code || !product) return;

    var entry = tariffData.find(function(e) { return e.code === code; });
    var cat   = entry && entry.categories && entry.categories.find(function(c) { return c.product === product; });
    if (!cat) return;

    document.getElementById('result-rate').textContent    = cat.rate_percent + '%';
    document.getElementById('result-country').textContent = entry.country;
    document.getElementById('result-product').textContent = cat.product;
    document.getElementById('result-date').textContent    = cat.effective_date || '—';
    document.getElementById('result-changes').textContent = cat.change_count || '0';
    document.getElementById('result-term').textContent    = cat.term ? 'Term ' + cat.term : '—';
    document.getElementById('result-assessment').textContent = cat.doctrine_assessment || '—';
    resultPanel.classList.add('active');
  });
})();
</script>
