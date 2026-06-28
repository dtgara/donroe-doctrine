---
layout: default
title: "Did He Say It?"
body_class: page-quote-game
---

<header class="section-header">
  <div class="section-header-inner">
    <p class="section-label">Section XI — Did He Say It?</p>
    <h1 class="section-title">Did He Say It?</h1>
    <p class="section-intro">
      One genuine foreign policy statement. Three plausible fabrications.
      All four are consistent with the doctrine. Only one is real.
    </p>
  </div>
</header>

<div class="section-body" style="max-width:680px;margin:0 auto;">

  <div class="qg-meta" id="qg-meta">
    <span class="qg-round-label" id="qg-round-label"></span>
    <span class="qg-streak" id="qg-streak"></span>
  </div>

  <div class="qg-event" id="qg-event"></div>

  <div class="qg-quotes" id="qg-quotes" role="list"></div>

  <div class="qg-result" id="qg-result" style="display:none;">
    <div class="qg-result-inner">
      <p class="qg-verdict" id="qg-verdict"></p>
      <blockquote class="qg-real-quote" id="qg-real-quote"></blockquote>
      <p class="qg-reveal-note" id="qg-reveal-note"></p>
      <a class="qg-source-link" id="qg-source-link" target="_blank" rel="noopener">Verify source &rarr;</a>
    </div>
  </div>

  <div class="qg-share" id="qg-share" style="display:none;">
    <button class="btn btn-secondary" id="btn-share">Share result</button>
    <button class="btn btn-secondary" id="btn-archive-toggle">Past rounds</button>
  </div>

  <div class="qg-archive" id="qg-archive" style="display:none;">
    <h2 class="qg-archive-heading">Archive</h2>
    <div id="qg-archive-list"></div>
  </div>

</div>

<style>
.qg-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-light-grey);
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-rule);
}
.qg-streak { font-weight: 600; color: var(--color-ink); }
.qg-event {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-light-grey);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
}
.qg-quotes { display: flex; flex-direction: column; gap: 1rem; }
.qg-quote-btn {
  display: block;
  width: 100%;
  text-align: left;
  background: var(--color-bg);
  border: 1px solid var(--color-rule);
  border-radius: 3px;
  padding: 1.25rem 1.25rem 1.25rem 3rem;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-ink);
  position: relative;
  transition: border-color 0.15s, background 0.15s;
}
.qg-quote-btn:hover { border-color: var(--color-ink); }
.qg-quote-label {
  position: absolute;
  left: 1.25rem;
  top: 1.35rem;
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-light-grey);
}
.qg-quote-btn.selected { border-color: var(--color-ink); background: var(--color-bg-alt, #f9f9f7); }
.qg-quote-btn.correct { border-color: #2a7a2a; background: #f0f8f0; }
.qg-quote-btn.incorrect { border-color: #c0392b; background: #fdf0ef; opacity: 0.7; }
.qg-quote-btn.reveal-correct { border-color: #2a7a2a; background: #f0f8f0; }
.qg-quote-btn:disabled { cursor: default; }
.qg-result {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--color-rule);
  border-radius: 3px;
}
.qg-verdict {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: var(--text-lg);
  margin-bottom: 1rem;
}
.qg-verdict.correct { color: #2a7a2a; }
.qg-verdict.incorrect { color: #c0392b; }
.qg-real-quote {
  border-left: 3px solid var(--color-rule);
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: var(--color-ink);
}
.qg-reveal-note {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-mid-grey, #666);
  margin-bottom: 1rem;
}
.qg-source-link {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-light-grey);
}
.qg-share {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.qg-archive { margin-top: 2.5rem; }
.qg-archive-heading {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-light-grey);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-rule);
}
.qg-archive-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-rule);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
}
.qg-archive-date { color: var(--color-light-grey); margin-right: 0.5rem; }
.qg-archive-event { color: var(--color-ink); }
.qg-archive-outcome { margin-left: 0.5rem; font-weight: 600; }
.qg-archive-outcome.correct { color: #2a7a2a; }
.qg-archive-outcome.incorrect { color: #c0392b; }
.qg-archive-outcome.unplayed { color: var(--color-light-grey); }
.qg-coming-soon {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-light-grey);
  text-align: center;
  padding: 2rem 0;
}
</style>

<script>
(function () {
  var ROUNDS = {{ site.data.quote_game.rounds | jsonify }};
  var LABELS = ['A', 'B', 'C', 'D'];

  // Launch day anchor — epoch day of June 28, 2026 (game launch date)
  // Keeps round index at 0 on launch day so archive builds up from day 2 onwards
  var LAUNCH_DAY = 20631;

  // Seeded shuffle: same seed = same order, so everyone gets same question each day
  function seededShuffle(arr, seed) {
    var a = arr.slice();
    var s = seed;
    for (var i = a.length - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      var j = Math.abs(s) % (i + 1);
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // Game day: days since launch (0 = launch day)
  function epochDay() {
    return Math.floor(Date.now() / 86400000);
  }

  function gameDay() {
    return Math.max(0, epochDay() - LAUNCH_DAY);
  }

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }

  // State from localStorage
  function loadState() {
    try { return JSON.parse(localStorage.getItem('qg_state') || '{}'); } catch(e) { return {}; }
  }
  function saveState(s) {
    try { localStorage.setItem('qg_state', JSON.stringify(s)); } catch(e) {}
  }

  var state = loadState();
  var today = todayStr();
  var day = gameDay();
  var roundIndex = day % ROUNDS.length;
  var round = ROUNDS[roundIndex];
  var shuffled = seededShuffle(round.quotes, day);
  var realIndex = shuffled.findIndex(function(q) { return q.real; });
  var answered = state.date === today && state.answered;
  var chosenIndex = answered ? state.chosenIndex : null;

  // Render meta
  document.getElementById('qg-round-label').textContent = 'Round ' + round.round_id + ' · ' + today;
  renderStreak();

  // Render event
  document.getElementById('qg-event').textContent = round.event;

  // Render quotes
  renderQuotes();

  if (answered) {
    showResult(chosenIndex, false);
    showShare();
  }

  function renderStreak() {
    var s = state.streak || 0;
    var el = document.getElementById('qg-streak');
    el.textContent = s > 0 ? '🔥 ' + s + ' correct in a row' : '';
  }

  function renderQuotes() {
    var container = document.getElementById('qg-quotes');
    container.innerHTML = '';
    shuffled.forEach(function(q, i) {
      var btn = document.createElement('button');
      btn.className = 'qg-quote-btn';
      if (answered) {
        btn.disabled = true;
        if (i === realIndex) btn.classList.add('reveal-correct');
        if (i === chosenIndex && chosenIndex !== realIndex) btn.classList.add('incorrect');
      }
      btn.setAttribute('role', 'listitem');

      var label = document.createElement('span');
      label.className = 'qg-quote-label';
      label.textContent = LABELS[i];
      btn.appendChild(label);
      btn.appendChild(document.createTextNode(q.text));

      if (!answered) {
        btn.addEventListener('click', function() { choose(i); });
      }
      container.appendChild(btn);
    });
  }

  function choose(i) {
    var correct = i === realIndex;
    // Update state
    var streak = correct ? (state.streak || 0) + 1 : 0;
    var history = state.history || [];
    history.push({ date: today, round: round.round_id, event: round.event, correct: correct });
    state = { date: today, answered: true, chosenIndex: i, streak: streak, history: history };
    saveState(state);
    chosenIndex = i;

    // Update button styles
    var btns = document.querySelectorAll('.qg-quote-btn');
    btns.forEach(function(btn, idx) {
      btn.disabled = true;
      if (idx === realIndex) btn.classList.add('reveal-correct');
      if (idx === i && !correct) btn.classList.add('incorrect');
    });

    renderStreak();
    showResult(i, true);
    showShare();
  }

  function showResult(chosen, animate) {
    var correct = chosen === realIndex;
    var el = document.getElementById('qg-result');
    el.style.display = '';

    var verdict = document.getElementById('qg-verdict');
    verdict.textContent = correct ? 'Correct.' : 'Incorrect.';
    verdict.className = 'qg-verdict ' + (correct ? 'correct' : 'incorrect');

    document.getElementById('qg-real-quote').textContent = '“' + shuffled[realIndex].text + '”';
    document.getElementById('qg-reveal-note').textContent = round.reveal_note;

    var link = document.getElementById('qg-source-link');
    link.href = round.source;
  }

  function showShare() {
    document.getElementById('qg-share').style.display = '';
  }

  // Share button
  document.getElementById('btn-share').addEventListener('click', function() {
    var correct = chosenIndex === realIndex;
    var emoji = correct ? '✅' : '❌';
    var streak = state.streak || 0;
    var text = 'Did He Say It? — Round ' + round.round_id + '\n' +
      emoji + ' ' + (correct ? 'Got it' : 'Missed it') +
      (streak > 1 ? ' 🔥 ' + streak + ' in a row' : '') + '\n' +
      'donroedoctrine.com/quote-game/';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() {
        var btn = document.getElementById('btn-share');
        btn.textContent = 'Copied.';
        setTimeout(function() { btn.textContent = 'Share result'; }, 1500);
      });
    } else {
      window.prompt('Copy to share:', text);
    }
  });

  // Archive toggle
  document.getElementById('btn-archive-toggle').addEventListener('click', function() {
    var arch = document.getElementById('qg-archive');
    var visible = arch.style.display !== 'none';
    arch.style.display = visible ? 'none' : '';
    this.textContent = visible ? 'Past rounds' : 'Hide archive';
    if (!visible) renderArchive();
  });

  function renderArchive() {
    var list = document.getElementById('qg-archive-list');
    list.innerHTML = '';
    var history = (state.history || []).slice().reverse();
    // Show past rounds (any round whose day has passed)
    var pastRounds = ROUNDS.filter(function(r) {
      var rDay = ROUNDS.indexOf(r);
      return rDay < roundIndex; // strictly less than: today's round is not yet "past"
    });
    // Build a lookup from history
    var histMap = {};
    (state.history || []).forEach(function(h) { histMap[h.round] = h; });

    if (pastRounds.length === 0) {
      list.innerHTML = '<p class="qg-coming-soon">Archive builds as rounds are completed.</p>';
      return;
    }

    pastRounds.slice().reverse().forEach(function(r) {
      var h = histMap[r.round_id];
      var item = document.createElement('div');
      item.className = 'qg-archive-item';

      var outcome = document.createElement('span');
      outcome.className = 'qg-archive-outcome';
      if (!h) {
        outcome.textContent = '—';
        outcome.classList.add('unplayed');
      } else if (h.correct) {
        outcome.textContent = '✓';
        outcome.classList.add('correct');
      } else {
        outcome.textContent = '✗';
        outcome.classList.add('incorrect');
      }

      var eventSpan = document.createElement('span');
      eventSpan.className = 'qg-archive-event';
      eventSpan.textContent = r.event;

      item.appendChild(outcome);
      item.appendChild(document.createTextNode(' '));
      item.appendChild(eventSpan);
      list.appendChild(item);
    });
  }

})();
</script>
