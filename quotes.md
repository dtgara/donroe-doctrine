---
layout: section
title: "Quote Archive"
section_label: "Section VII"
section_intro: >
  A curated archive of foreign policy statements, organised by theme.
  Every entry verified against primary sources. Direct quotations only.
body_class: page-quotes
---

{% assign quotes = site.data.quotes %}

<div class="filter-bar" data-filter-container="#quotes-list">
  <input type="text" placeholder="Search quotes&hellip;" data-filter-key="text" aria-label="Search quotes" style="min-width:200px;">
  <select data-filter-key="theme" aria-label="Filter by theme">
    <option value="all">All themes</option>
    <option value="trade_tariffs">Trade &amp; Tariffs</option>
    <option value="nato_complaints">NATO Complaints</option>
    <option value="countries_he_thinks_he_owns">Countries He Thinks He Owns</option>
    <option value="compliments_to_dictators">Compliments to Dictators</option>
    <option value="art_of_the_deal">The Art of the (Unspecified) Deal</option>
    <option value="how_trade_works">Explanations of How Trade Works</option>
    <option value="descriptions_of_leaders">Descriptions of Foreign Leaders</option>
    <option value="things_canadas_fault">Things That Are Canada's Fault</option>
  </select>
  <select data-filter-key="term" aria-label="Filter by term">
    <option value="all">Both terms</option>
    <option value="1">Term 1</option>
    <option value="2">Term 2</option>
  </select>
  <select data-filter-key="source_type" aria-label="Filter by source">
    <option value="all">All sources</option>
    <option value="press_conference">Press conference</option>
    <option value="interview">Interview</option>
    <option value="speech">Speech</option>
    <option value="truth_social">Truth Social</option>
    <option value="tweet">Tweet</option>
  </select>
  <span style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-light-grey);align-self:center;">
    <span data-filter-count>0</span> quotes
  </span>
</div>

<div id="quotes-list">
{% if quotes and quotes.size > 0 %}
  {% for q in quotes %}
  <div class="quote-entry"
       id="{{ q.id }}"
       data-filter-item
       data-text="{{ q.text | downcase }}"
       data-theme="{{ q.theme | join: ' ' | downcase }}"
       data-term="{{ q.term }}"
       data-source_type="{{ q.source_type }}">
    <blockquote class="quote-text">{{ q.text }}</blockquote>
    <div class="quote-meta">
      <span class="quote-meta-date"><time>{{ q.date | date: "%B %-d, %Y" }}</time></span>
      <span class="quote-meta-source">{{ q.source_type | replace: '_', ' ' | capitalize }}</span>
      {% if q.country %}
      <span class="quote-meta-country">
        {% if q.country.first %}
          {{ q.country | join: ', ' }}
        {% else %}
          {{ q.country }}
        {% endif %}
      </span>
      {% endif %}
      {% if q.theme %}
        {% if q.theme.first %}
          {% for t in q.theme limit:2 %}
          <span class="quote-theme-tag">{{ t | replace: '_', ' ' }}</span>
          {% endfor %}
        {% else %}
          <span class="quote-theme-tag">{{ q.theme | replace: '_', ' ' }}</span>
        {% endif %}
      {% endif %}
      <span class="post-term">Term {{ q.term }}</span>
      <a href="#{{ q.id }}" class="quote-share-link" data-quote-id="{{ q.id }}">Share &rarr;</a>
    </div>
  </div>
  {% endfor %}
{% else %}
  <div class="empty-state">
    <p>The archive is being assembled. Verified quotes only. This requires time.</p>
  </div>
{% endif %}
</div>
