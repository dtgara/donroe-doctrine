---
layout: section
title: "Ally/Enemy Leaderboard"
section_label: "Section IV"
section_intro: >
  Current standings in the bilateral relationship ledger.
  Rankings reflect the assessed state of each relationship as of the date shown.
  Volatile entries indicate three or more status changes within the preceding thirty days.
body_class: page-leaderboard
---

{% assign board = site.data.leaderboard %}

<div class="leaderboard-grid">

  <div>
    <div class="leaderboard-column-title in-favour">In Favour</div>
    {% if board.in_favour and board.in_favour.size > 0 %}
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Country</th>
          <th>Assessment</th>
          <th>Trend</th>
        </tr>
      </thead>
      <tbody>
        {% for entry in board.in_favour %}
        <tr>
          <td class="rank-number">{{ entry.rank }}</td>
          <td>
            <strong>{{ entry.country }}</strong>
            {% if entry.trend == 'VOLATILE' %}
              <span class="volatile-badge">Volatile ({{ entry.status_changes }})</span>
            {% endif %}
          </td>
          <td style="font-size:var(--text-xs);color:var(--color-mid-grey);">{{ entry.annotation }}</td>
          <td class="trend-indicator">
            {% if entry.trend == 'RISING' %}&#9650;
            {% elsif entry.trend == 'FALLING' %}&#9660;
            {% elsif entry.trend == 'VOLATILE' %}&#11835;
            {% else %}&mdash;{% endif %}
          </td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
    {% else %}
    <div class="empty-state"><p>Rankings forthcoming.</p></div>
    {% endif %}
  </div>

  <div>
    <div class="leaderboard-column-title out-of-favour">Out of Favour</div>
    {% if board.out_of_favour and board.out_of_favour.size > 0 %}
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Country</th>
          <th>Assessment</th>
          <th>Trend</th>
        </tr>
      </thead>
      <tbody>
        {% for entry in board.out_of_favour %}
        <tr>
          <td class="rank-number">{{ entry.rank }}</td>
          <td>
            <strong>{{ entry.country }}</strong>
            {% if entry.trend == 'VOLATILE' %}
              <span class="volatile-badge">Volatile ({{ entry.status_changes }})</span>
            {% endif %}
          </td>
          <td style="font-size:var(--text-xs);color:var(--color-mid-grey);">{{ entry.annotation }}</td>
          <td class="trend-indicator">
            {% if entry.trend == 'RISING' %}&#9650;
            {% elsif entry.trend == 'FALLING' %}&#9660;
            {% elsif entry.trend == 'VOLATILE' %}&#11835;
            {% else %}&mdash;{% endif %}
          </td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
    {% else %}
    <div class="empty-state"><p>Rankings forthcoming.</p></div>
    {% endif %}
  </div>

</div>

{% if board.indeterminate and board.indeterminate.size > 0 %}
<div style="margin-top:2rem;">
  <h2 style="font-size:var(--text-xl);margin-bottom:1rem;">Indeterminate</h2>
  <p style="font-size:var(--text-sm);color:var(--color-light-grey);margin-bottom:1rem;">
    Countries whose status has changed more than twice within a single month.
  </p>
  <table class="leaderboard-table" style="max-width:600px;">
    <thead>
      <tr><th>Country</th><th>Assessment</th><th>Changes</th><th>Last Updated</th></tr>
    </thead>
    <tbody>
      {% for entry in board.indeterminate %}
      <tr>
        <td><strong>{{ entry.country }}</strong></td>
        <td style="font-size:var(--text-xs);color:var(--color-mid-grey);">{{ entry.annotation }}</td>
        <td class="rank-number">{{ entry.status_changes }}</td>
        <td style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-light-grey);">{{ entry.last_updated }}</td>
      </tr>
      {% endfor %}
    </tbody>
  </table>
</div>
{% endif %}

<p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-light-grey);margin-top:2rem;border-top:1px solid var(--color-border);padding-top:1rem;">
  Rankings reflect documented relationship status only. The archive does not assess the
  accuracy of the President's assessments. Last reviewed: {{ site.time | date: "%B %-d, %Y" }}.
</p>
