var finalStandings;

function clearAll() {
  var l;
  finalStandings = [ENTRANTS];
  while ((l = finalStandings[finalStandings.length - 1].length) > 1) {
    finalStandings.push(new Array(l / 2));
  }
}

document.querySelector('#clear-all-form').addEventListener('submit', function(e) {
  e.preventDefault();
  if (e.target.elements.namedItem('clear-all-input').value != 'clear all') {
    return;
  }
  clearAll();
  renderEndState();
  e.target.elements.namedItem('clear-all-input').value = '';
});

function populateFinalStandings() {
  if (localStorage['finalStandings']) {
    finalStandings = JSON.parse(localStorage['finalStandings'])
  } else {
    clearAll();
  }
}

function showChooser() {
  document.querySelector('#chooser').style.display = 'block';
}

function hideChooser() {
  document.querySelector('#chooser').style.display = 'none';
}

function bubbleClear(round, seed) {
  console.log('bubbleClear', round, seed)
  for (var i = round + 1; i <= ROUND_COUNT; i++) {
    seed = Math.floor(seed / 2);
    finalStandings[i][seed] = null;
    console.log(i, seed)
  }
}

function onChoice(e, userInput) {
  var round = +e.target.dataset.round;
  var seed = +e.target.dataset.seed;

  if (finalStandings[round][seed] != e.target.src) {
    bubbleClear(round, seed);
  }
  finalStandings[round][seed] = e.target.src;

  hideChooser();
  renderEndState();
}

document.querySelector('#chooser-left').addEventListener('click', function(e) {
  onChoice(e, 0);
});

document.querySelector('#chooser-right').addEventListener('click', function(e) {
  onChoice(e, 1);
});

document.querySelector('#clear-button').addEventListener('click', function(e) {
  var round = +e.target.dataset.round;
  var seed = +e.target.dataset.seed;

  finalStandings[round][seed] = null;
  bubbleClear(round, seed);

  hideChooser();
  renderEndState();
});

function matchup(e) {
  var round = e.target.dataset.round;
  var seed = e.target.dataset.seed;

  if (round == 0) {
    return;
  }

  var first = finalStandings[round - 1][seed * 2];
  var second = finalStandings[round - 1][seed * 2 + 1];
  if (!first || !second) {
    return;
  }

  var leftChoice = document.querySelector('#chooser-left');
  var rightChoice = document.querySelector('#chooser-right');
  var clearButton = document.querySelector('#clear-button');
  leftChoice.src = first
  leftChoice.dataset.round = round;
  leftChoice.dataset.seed = seed;
  rightChoice.src = second
  rightChoice.dataset.round = round;
  rightChoice.dataset.seed = seed;
  clearButton.dataset.round = round;
  clearButton.dataset.seed = seed;
  document.querySelector('#chooser').style.display = 'block';
}

function renderEndState() {
  for (var i = 0; i <= ROUND_COUNT; i++) {
    for (var j = 0; j < Math.pow(2, ROUND_COUNT - i); j++) {
      var left = document.querySelector('#round-' + i + '-seed-' + j);
      if (finalStandings[i][j]) {
        left.src = finalStandings[i][j];
      } else {
        left.src = 'circle.png';
      }
    }
  }
  localStorage['finalStandings'] = JSON.stringify(finalStandings);
}

initialRender();
populateFinalStandings();
renderEndState();
