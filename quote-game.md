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
    <p class="qg-archive-intro">All past rounds. Play any you&rsquo;ve missed.</p>
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
.qg-quote-btn--sm { font-size: var(--text-sm); padding: 0.9rem 0.9rem 0.9rem 2.5rem; }
.qg-quote-label {
  position: absolute;
  left: 1.25rem;
  top: 1.35rem;
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-light-grey);
}
.qg-quote-btn--sm .qg-quote-label { left: 0.9rem; top: 1rem; }
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
  margin-bottom: 0.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-rule);
}
.qg-archive-intro {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-light-grey);
  margin-bottom: 1rem;
}
.qg-archive-item {
  border-bottom: 1px solid var(--color-rule);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
}
.qg-archive-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
}
.qg-archive-outcome {
  font-weight: 700;
  font-size: var(--text-base);
  flex-shrink: 0;
  width: 1.2rem;
  text-align: center;
}
.qg-archive-outcome.correct { color: #2a7a2a; }
.qg-archive-outcome.incorrect { color: #c0392b; }
.qg-archive-outcome.unplayed { color: var(--color-light-grey); }
.qg-archive-event {
  color: var(--color-ink);
  flex: 1;
  line-height: 1.4;
}
.qg-archive-play-btn {
  background: none;
  border: 1px solid var(--color-rule);
  border-radius: 3px;
  padding: 0.25rem 0.6rem;
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-light-grey);
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.15s, color 0.15s;
}
.qg-archive-play-btn:hover { border-color: var(--color-ink); color: var(--color-ink); }
.qg-archive-panel {
  padding: 0.75rem 0 1.25rem 1.95rem;
}
.qg-archive-panel .qg-quotes { gap: 0.6rem; margin-bottom: 1rem; }
.qg-archive-result {
  padding: 1rem;
  border: 1px solid var(--color-rule);
  border-radius: 3px;
  margin-top: 0.75rem;
}
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

  // Anchor to launch date so Round 1 = June 28 2026
  var LAUNCH_DAY = 20631;

  // ── Utils ──────────────────────────────────────────────────────────────────

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

  function epochDay() { return Math.floor(Date.now() / 86400000); }
  function gameDay()  { return Math.max(0, epochDay() - LAUNCH_DAY); }

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }

  // ── State ──────────────────────────────────────────────────────────────────
  // Schema: { outcomes: { [round_id]: { correct, chosenIndex } }, streak, lastDailyDate }

  function loadState() {
    try {
      var raw = JSON.parse(localStorage.getItem('qg_state') || '{}');
      // Migrate old schema (had .date, .answered, .chosenIndex at top level)
      if (raw.answered !== undefined && raw.outcomes === undefined) {
        var migrated = { outcomes: {}, streak: raw.streak || 0, lastDailyDate: raw.date || null };
        if (raw.history) {
          raw.history.forEach(function(h) {
            migrated.outcomes[h.round] = { correct: h.correct, chosenIndex: null };
          });
        }
        return migrated;
      }
      if (!raw.outcomes) raw.outcomes = {};
      return raw;
    } catch(e) {
      return { outcomes: {}, streak: 0, lastDailyDate: null };
    }
  }

  function saveState(s) {
    try { localStorage.setItem('qg_state', JSON.stringify(s)); } catch(e) {}
  }

  // ── Today's round ──────────────────────────────────────────────────────────

  var state      = loadState();
  var today      = todayStr();
  var day        = gameDay();
  var roundIndex = day % ROUNDS.length;
  var round      = ROUNDS[roundIndex];
  // Today uses gameDay as seed so order is consistent for all visitors
  var shuffled   = seededShuffle(round.quotes, day);
  var realIndex  = shuffled.findIndex(function(q) { return q.real; });

  var todayOutcome  = state.outcomes[round.round_id];
  var answered      = !!todayOutcome;
  var chosenIndex   = answered ? todayOutcome.chosenIndex : null;

  document.getElementById('qg-round-label').textContent = 'Round ' + round.round_id + ' · ' + today;
  document.getElementById('qg-event').textContent = round.event;
  renderStreak();
  renderQuotes();

  if (answered) {
    showResult(chosenIndex, false);
    showShare();
  }

  function renderStreak() {
    var s = state.streak || 0;
    document.getElementById('qg-streak').textContent = s > 0 ? '🔥 ' + s + ' correct in a row' : '';
  }

  function renderQuotes() {
    var container = document.getElementById('qg-quotes');
    container.innerHTML = '';
    shuffled.forEach(function(q, i) {
      var btn = document.createElement('button');
      btn.className = 'qg-quote-btn';
      btn.setAttribute('role', 'listitem');
      if (answered) {
        btn.disabled = true;
        if (i === realIndex) btn.classList.add('reveal-correct');
        if (i === chosenIndex && chosenIndex !== realIndex) btn.classList.add('incorrect');
      }
      var label = document.createElement('span');
      label.className = 'qg-quote-label';
      label.textContent = LABELS[i];
      btn.appendChild(label);
      btn.appendChild(document.createTextNode(q.text));
      if (!answered) {
        btn.addEventListener('click', (function(idx) {
          return function() { choose(idx); };
        })(i));
      }
      container.appendChild(btn);
    });
  }

  function choose(i) {
    var correct = i === realIndex;
    // Streak only counts consecutive daily plays on today's featured round
    var prevDate = state.lastDailyDate;
    var yesterday = (function() {
      var d = new Date(); d.setDate(d.getDate() - 1);
      return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
    })();
    var streak = correct
      ? (prevDate === yesterday || prevDate === today ? (state.streak || 0) + 1 : 1)
      : 0;

    state.outcomes[round.round_id] = { correct: correct, chosenIndex: i };
    state.streak = streak;
    state.lastDailyDate = today;
    saveState(state);
    chosenIndex = i;
    answered = true;

    document.querySelectorAll('#qg-quotes .qg-quote-btn').forEach(function(btn, idx) {
      btn.disabled = true;
      if (idx === realIndex) btn.classList.add('reveal-correct');
      if (idx === i && !correct) btn.classList.add('incorrect');
    });
    renderStreak();
    showResult(i, true);
    showShare();
  }

  function showResult(chosen) {
    var correct = chosen === realIndex;
    var el = document.getElementById('qg-result');
    el.style.display = '';
    var verdict = document.getElementById('qg-verdict');
    verdict.textContent = correct ? 'Correct.' : 'Incorrect.';
    verdict.className = 'qg-verdict ' + (correct ? 'correct' : 'incorrect');
    document.getElementById('qg-real-quote').textContent = '“' + shuffled[realIndex].text + '”';
    document.getElementById('qg-reveal-note').textContent = round.reveal_note;
    document.getElementById('qg-source-link').href = round.source;
  }

  function showShare() {
    document.getElementById('qg-share').style.display = '';
  }

  document.getElementById('btn-share').addEventListener('click', function() {
    var correct = chosenIndex === realIndex;
    var streak = state.streak || 0;
    var text = 'Did He Say It? — Round ' + round.round_id + '\n' +
      (correct ? '✅ Got it' : '❌ Missed it') +
      (streak > 1 ? ' 🔥 ' + streak + ' in a row' : '') + '\n' +
      'donroedoctrine.com/quote-game/';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() {
        var btn = document.getElementById('btn-share');
        var orig = btn.textContent;
        btn.textContent = 'Copied.';
        setTimeout(function() { btn.textContent = orig; }, 1500);
      });
    } else {
      window.prompt('Copy to share:', text);
    }
  });

  // ── Archive ────────────────────────────────────────────────────────────────

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

    // All rounds except today's, most recent first
    var archiveRounds = ROUNDS.filter(function(r) {
      return r.round_id !== round.round_id;
    }).slice().reverse();

    if (archiveRounds.length === 0) {
      list.innerHTML = '<p class="qg-coming-soon">No past rounds yet.</p>';
      return;
    }

    archiveRounds.forEach(function(r) {
      var outcome = state.outcomes[r.round_id];
      var item    = document.createElement('div');
      item.className = 'qg-archive-item';

      // Header row
      var header      = document.createElement('div');
      header.className = 'qg-archive-header';

      var outcomeSpan = document.createElement('span');
      outcomeSpan.className = 'qg-archive-outcome ' + (
        !outcome ? 'unplayed' : outcome.correct ? 'correct' : 'incorrect'
      );
      outcomeSpan.textContent = !outcome ? '—' : outcome.correct ? '✓' : '✗';

      var eventSpan = document.createElement('span');
      eventSpan.className = 'qg-archive-event';
      eventSpan.textContent = 'Round ' + r.round_id + ' — ' + r.event;

      var playBtn = document.createElement('button');
      playBtn.className = 'qg-archive-play-btn';
      playBtn.textContent = outcome ? 'Review' : 'Play';

      header.appendChild(outcomeSpan);
      header.appendChild(eventSpan);
      header.appendChild(playBtn);
      item.appendChild(header);

      // Expandable panel
      var panel = document.createElement('div');
      panel.className = 'qg-archive-panel';
      panel.style.display = 'none';
      item.appendChild(panel);

      playBtn.addEventListener('click', function() {
        var isOpen = panel.style.display !== 'none';
        if (isOpen) {
          panel.style.display = 'none';
          var o = state.outcomes[r.round_id];
          playBtn.textContent = o ? 'Review' : 'Play';
        } else {
          panel.style.display = '';
          playBtn.textContent = 'Close';
          renderArchiveRound(r, panel, outcomeSpan, playBtn);
        }
      });

      list.appendChild(item);
    });
  }

  function renderArchiveRound(r, panel, outcomeSpan, playBtn) {
    panel.innerHTML = '';
    var outcome    = state.outcomes[r.round_id];
    // Archive rounds use round_id as seed — same order for everyone, always
    var sh         = seededShuffle(r.quotes, r.round_id);
    var ri         = sh.findIndex(function(q) { return q.real; });
    var answered   = !!outcome;
    var chosen     = answered ? outcome.chosenIndex : null;

    var quotesDiv  = document.createElement('div');
    quotesDiv.className = 'qg-quotes';

    sh.forEach(function(q, i) {
      var btn = document.createElement('button');
      btn.className = 'qg-quote-btn qg-quote-btn--sm';
      if (answered) {
        btn.disabled = true;
        if (i === ri) btn.classList.add('reveal-correct');
        if (chosen !== null && i === chosen && chosen !== ri) btn.classList.add('incorrect');
      }
      var lbl = document.createElement('span');
      lbl.className = 'qg-quote-label';
      lbl.textContent = LABELS[i];
      btn.appendChild(lbl);
      btn.appendChild(document.createTextNode(q.text));

      if (!answered) {
        btn.addEventListener('click', (function(idx) {
          return function() {
            chooseArchive(r, idx, sh, ri, quotesDiv, panel, outcomeSpan, playBtn);
          };
        })(i));
      }
      quotesDiv.appendChild(btn);
    });
    panel.appendChild(quotesDiv);

    if (answered) {
      panel.appendChild(buildArchiveResult(r, sh, ri, chosen));
    }
  }

  function chooseArchive(r, i, sh, ri, quotesDiv, panel, outcomeSpan, playBtn) {
    var correct = i === ri;
    state.outcomes[r.round_id] = { correct: correct, chosenIndex: i };
    saveState(state);

    quotesDiv.querySelectorAll('.qg-quote-btn').forEach(function(btn, idx) {
      btn.disabled = true;
      if (idx === ri) btn.classList.add('reveal-correct');
      if (idx === i && !correct) btn.classList.add('incorrect');
    });

    // Update outcome icon in header
    outcomeSpan.className = 'qg-archive-outcome ' + (correct ? 'correct' : 'incorrect');
    outcomeSpan.textContent = correct ? '✓' : '✗';
    playBtn.textContent = 'Close';

    panel.appendChild(buildArchiveResult(r, sh, ri, i));
  }

  function buildArchiveResult(r, sh, ri, chosen) {
    var correct   = chosen === ri;
    var resultDiv = document.createElement('div');
    resultDiv.className = 'qg-archive-result';

    var verdict   = document.createElement('p');
    verdict.className = 'qg-verdict ' + (correct ? 'correct' : 'incorrect');
    verdict.textContent = correct ? 'Correct.' : 'Incorrect.';

    var quote     = document.createElement('blockquote');
    quote.className = 'qg-real-quote';
    quote.textContent = '“' + sh[ri].text + '”';

    var note      = document.createElement('p');
    note.className = 'qg-reveal-note';
    note.textContent = r.reveal_note;

    var link      = document.createElement('a');
    link.className = 'qg-source-link';
    link.href = r.source;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Verify source →';

    resultDiv.appendChild(verdict);
    resultDiv.appendChild(quote);
    resultDiv.appendChild(note);
    resultDiv.appendChild(link);
    return resultDiv;
  }

})();
</script>
