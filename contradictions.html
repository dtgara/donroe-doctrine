---
layout: section
title: "Contradiction Tracker"
section_label: "Section III"
section_intro: >
  A searchable record of paired statements from the forty-fifth and forty-seventh President,
  separated by time, context, or both. Verified against primary sources.
body_class: page-contradictions
---

{% assign contradictions = site.data.contradictions %}

<div class="filter-bar" data-filter-container="#contradictions-list">
  <select data-filter-key="theme" aria-label="Filter by theme">
    <option value="all">All themes</option>
    <option value="russia">Russia / Ukraine</option>
    <option value="nato">NATO</option>
    <option value="trade">Trade &amp; Tariffs</option>
    <option value="china">China</option>
    <option value="canada">Canada</option>
    <option value="middle_east">Middle East</option>
    <option value="territorial">Territorial Claims</option>
    <option value="democracy">Democracy &amp; Autocracy</option>
    <option value="media">The Media as Foreign Policy Tool</option>
  </select>
  <select data-filter-key="term" aria-label="Filter by term">
    <option value="all">All terms</option>
    <option value="1">Term 1 only</option>
    <option value="2">Term 2 only</option>
    <option value="both">Cross-Term</option>
  </select>
  <select data-filter-key="country" aria-label="Filter by country">
    <option value="all">All countries</option>
    <option value="russia">Russia</option>
    <option value="ukraine">Ukraine</option>
    <option value="china">China</option>
    <option value="canada">Canada</option>
    <option value="nato">NATO</option>
  </select>
  <span style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-light-grey);align-self:center;">
    <span data-filter-count>{{ contradictions.size }}</span> entries
  </span>
</div>

<div id="contradictions-list">
{% if contradictions and contradictions.size > 0 %}
  {% for c in contradictions %}
  <div class="contradiction-entry"
       data-filter-item
       data-theme="{{ c.theme | downcase | replace: '/', '_' | replace: ' ', '_' }}"
       data-country="{{ c.country | downcase }}"
       data-term="{{ c.term_a }}">
    <div class="contradiction-statement">
      <p class="contradiction-statement-label">Statement A &mdash; {{ c.date_a | date: "%B %-d, %Y" }}</p>
      <p class="contradiction-statement-text">&ldquo;{{ c.statement_a }}&rdquo;</p>
      <p class="contradiction-statement-meta">{{ c.source_a }}</p>
    </div>
    <div class="contradiction-statement">
      <p class="contradiction-statement-label">Statement B &mdash; {{ c.date_b | date: "%B %-d, %Y" }}</p>
      <p class="contradiction-statement-text">&ldquo;{{ c.statement_b }}&rdquo;</p>
      <p class="contradiction-statement-meta">{{ c.source_b }}</p>
    </div>
    <div class="contradiction-note">
      <span class="contradiction-note-label">Doctrine Note</span>
      {{ c.doctrine_note }}
    </div>
  </div>
  {% endfor %}
{% else %}
  <div class="empty-state">
    <p>Contradiction data is being compiled. Check back shortly.</p>
  </div>
{% endif %}
</div>
