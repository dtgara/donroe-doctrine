---
layout: default
title: "Press Briefing Bingo"
body_class: page-bingo
---

<header class="section-header">
  <div class="section-header-inner">
    <p class="section-label">Section X — Press Briefing Bingo</p>
    <h1 class="section-title">Press Briefing Bingo</h1>
    <p class="section-intro">
      A randomised 5&times;5 card drawn from documented foreign policy tropes.
      Mark squares as they occur during any press briefing, interview,
      or Truth Social session. The free square has already occurred.
    </p>
  </div>
</header>

<div class="section-body" style="max-width:640px;margin:0 auto;">

  <div class="bingo-win" id="bingo-win">
    BINGO
    <div class="bingo-win-sub">A line has been completed. The doctrine remains intact.</div>
  </div>

  <div class="bingo-status" id="bingo-status">Card generated. Briefing may begin.</div>

  <div class="bingo-card" id="bingo-card" role="grid" aria-label="Bingo card"></div>

  <div class="bingo-controls">
    <button class="btn btn-primary" id="btn-new-card">New Card</button>
    <button class="btn btn-secondary" id="btn-share">Share Card</button>
  </div>

  <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-light-grey);text-align:center;margin-top:1rem;">
    Phrases drawn from <strong>{{ site.data.bingo_phrases.phrases | size }}</strong> documented foreign policy tropes.
    Free square: &ldquo;{{ site.data.bingo_phrases.free_square }}&rdquo;
  </p>

</div>

<script>
(function() {
  var DATA = {
    phrases: {{ site.data.bingo_phrases.phrases | jsonify }},
    freeSquare: {{ site.data.bingo_phrases.free_square | jsonify }}
  };

  var card      = document.getElementById('bingo-card');
  var winBanner = document.getElementById('bingo-win');
  var status    = document.getElementById('bingo-status');
  var currentCard = [];  // array of {text, category, marked}
  var FREE = 12; // centre cell index (5x5 grid, 0-indexed)

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function generateCard(markedState) {
    var picked = shuffle(DATA.phrases).slice(0, 24);
    currentCard = [];
    for (var i = 0; i < 25; i++) {
      if (i === FREE) {
        currentCard.push({ text: DATA.freeSquare, category: 'Free', marked: true, free: true });
      } else {
        var idx = i < FREE ? i : i - 1;
        currentCard.push({
          text: picked[idx].text,
          category: picked[idx].category || '',
          marked: markedState ? markedState[i] : false,
          free: false
        });
      }
    }
  }

  function renderCard() {
    card.innerHTML = '';
    currentCard.forEach(function(cell, i) {
      var el = document.createElement('div');
      el.className = 'bingo-cell' + (cell.free ? ' free-square' : '') + (cell.marked ? ' marked' : '');
      el.setAttribute('role', 'gridcell');
      el.setAttribute('aria-label', cell.text + (cell.marked ? ' (marked)' : ''));
      el.textContent = cell.text;
      if (cell.category && !cell.free) {
        var cat = document.createElement('span');
        cat.className = 'bingo-cell-category';
        cat.textContent = cell.category;
        el.appendChild(cat);
      }
      if (!cell.free) {
        el.addEventListener('click', function() { toggleCell(i); });
      }
      card.appendChild(el);
    });
    checkWin();
    updateUrl();
  }

  function toggleCell(i) {
    if (currentCard[i].free) return;
    currentCard[i].marked = !currentCard[i].marked;
    renderCard();
  }

  function checkWin() {
    var lines = [
      [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
      [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],
      [0,6,12,18,24],[4,8,12,16,20]
    ];
    var won = lines.some(function(line) {
      return line.every(function(i) { return currentCard[i].marked; });
    });
    winBanner.classList.toggle('active', won);
    var marked = currentCard.filter(function(c) { return c.marked && !c.free; }).length;
    status.textContent = won
      ? 'BINGO. The doctrine has been fully expressed.'
      : marked + ' of 24 phrases documented.';
  }

  function cardToUrlState() {
    return currentCard.map(function(c) { return c.marked ? '1' : '0'; }).join('');
  }

  function updateUrl() {
    try {
      var params = new URLSearchParams(window.location.search);
      params.set('card', btoa(currentCard.map(function(c) { return c.text; }).join('|')));
      params.set('m', cardToUrlState());
      history.replaceState(null, '', '?' + params.toString() + window.location.hash);
    } catch(e) {}
  }

  function newCard() {
    winBanner.classList.remove('active');
    generateCard(null);
    renderCard();
  }

  function shareCard() {
    var url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function() {
        var btn = document.getElementById('btn-share');
        btn.textContent = 'Copied.';
        setTimeout(function() { btn.textContent = 'Share Card'; }, 1500);
      });
    } else {
      window.prompt('Share this URL:', url);
    }
  }

  document.getElementById('btn-new-card').addEventListener('click', newCard);
  document.getElementById('btn-share').addEventListener('click', shareCard);

  // Restore from URL if present
  try {
    var params = new URLSearchParams(window.location.search);
    var encoded = params.get('card');
    var markedStr = params.get('m');
    if (encoded && markedStr) {
      var phrases = atob(encoded).split('|');
      var markedState = markedStr.split('').map(function(c) { return c === '1'; });
      currentCard = phrases.map(function(text, i) {
        if (i === FREE) {
          return { text: DATA.freeSquare, category: 'Free', marked: true, free: true };
        }
        return { text: text, category: '', marked: markedState[i], free: false };
      });
      renderCard();
    } else {
      newCard();
    }
  } catch(e) {
    newCard();
  }

})();
</script>
