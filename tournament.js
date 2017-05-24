var TEAM_COUNT = 32;
var ROUND_COUNT = Math.log2(TEAM_COUNT);

var initialSlots = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "10.png",
    "11.png",
    "12.png",
    "13.png",
    "14.png",
    "15.png",
    "16.png",
    "17.png",
    "18.png",
    "19.png",
    "20.png",
    "21.png",
    "22.png",
    "23.png",
    "24.png",
    "25.png",
    "26.png",
    "27.png",
    "28.png",
    "29.png",
    "30.png",
    "31.png",
    "32.png"
  ];

var finalStandings;

function populateFinalStandings() {
  var l;
  finalStandings = [initialSlots];
  while ((l = finalStandings[finalStandings.length - 1].length) > 1) {
    finalStandings.push(new Array(l / 2));
  }
}
populateFinalStandings();

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

var currentRound = 1;

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

function main() {
  var target = document.querySelector('#target');
  var rows = [];
  for (var i = 0; i < TEAM_COUNT; i++) {
    var row = document.createElement('tr');
    rows.push(row);
    target.appendChild(row);
  }

  for (var i = 0; i < ROUND_COUNT - 1; i++) {
    // Add picture
    for (var j = 0; j < Math.pow(2, ROUND_COUNT - i - 1); j++) {
      var data = document.createElement('td')
      data.rowSpan = Math.pow(2, i + 1);
      var image = document.createElement('img')
      image.id = 'round-' + i + '-seed-' + j;
      image.dataset.round = i;
      image.dataset.seed = j;
      image.addEventListener('click', matchup);
      data.appendChild(image);
      rows[j * Math.pow(2, i + 1)].appendChild(data);
    }

    // Add leader lines
    for (var j = 0; j < Math.pow(2, ROUND_COUNT - i); j++) {
      var classes = [];
      var data = document.createElement('td')
      data.rowSpan = Math.pow(2, i);
      if (j % 2 == 0) {
        classes.push('bottom');
      } else {
        classes.push('top');
      }
      data.className = classes.join(' ');
      rows[j * Math.pow(2, i)].appendChild(data);
    }

    if (i == ROUND_COUNT - 1) {
      break;
    }

    // Add trailer lines
    for (var j = 0; j < Math.pow(2, ROUND_COUNT - i); j++) {
      var classes = [];
      var data = document.createElement('td')
      data.rowSpan = Math.pow(2, i);
      if (j % 4 == 1) {
        classes.push('bottom');
      } else if (j % 4 == 2) {
        classes.push('top');
      }
      if (j % 4 == 1 || j % 4 == 2) {
        classes.push('left');
      }
      data.className = classes.join(' ');
      rows[j * Math.pow(2, i)].appendChild(data);
    }
  }

  // Add picture
  var data = document.createElement('td')
  data.rowSpan = Math.pow(2, ROUND_COUNT);
  var image = document.createElement('img')
  image.id = 'round-' + (ROUND_COUNT - 1) + '-seed-0';
  image.dataset.round = ROUND_COUNT - 1;
  image.dataset.seed = 0;
  image.addEventListener('click', matchup);
  data.appendChild(image);
  rows[0].appendChild(data);

  // Add trailer
  var data = document.createElement('td')
  data.rowSpan = Math.pow(2, ROUND_COUNT - 1);
  data.className = 'bottom';
  rows[0].appendChild(data);
  var data = document.createElement('td')
  data.rowSpan = Math.pow(2, ROUND_COUNT - 1);
  data.className = 'top';
  rows[Math.pow(2, ROUND_COUNT - 1)].appendChild(data);

  // Add picture
  var data = document.createElement('td')
  data.rowSpan = Math.pow(2, ROUND_COUNT);
  var image = document.createElement('img')
  image.id = 'round-' + ROUND_COUNT + '-seed-0';
  image.dataset.round = ROUND_COUNT;
  image.dataset.seed = 0;
  image.addEventListener('click', matchup);
  data.appendChild(image);
  rows[0].appendChild(data);

  // Add trailer
  var data = document.createElement('td')
  data.rowSpan = Math.pow(2, ROUND_COUNT - 1);
  data.className = 'bottom';
  rows[0].appendChild(data);
  var data = document.createElement('td')
  data.rowSpan = Math.pow(2, ROUND_COUNT - 1);
  data.className = 'top';
  rows[Math.pow(2, ROUND_COUNT - 1)].appendChild(data);

  // Add picture
  var data = document.createElement('td')
  data.rowSpan = Math.pow(2, ROUND_COUNT);
  var image = document.createElement('img')
  image.id = 'round-' + (ROUND_COUNT - 1) + '-seed-1';
  image.dataset.round = ROUND_COUNT - 1;
  image.dataset.seed = 1;
  image.addEventListener('click', matchup);
  data.appendChild(image);
  rows[0].appendChild(data);

  for (var i = 0; i < ROUND_COUNT - 1; i++) {
    // Add trailer lines
    for (var j = 0; j < Math.pow(2, i + 2); j++) {
      var classes = [];
      var data = document.createElement('td')
      data.rowSpan = Math.pow(2, ROUND_COUNT - i - 2);
      if (j % 4 == 1) {
        classes.push('bottom');
      } else if (j % 4 == 2) {
        classes.push('top');
      }
      if (j % 4 == 1 || j % 4 == 2) {
        classes.push('right');
      }
      data.className = classes.join(' ');
      rows[j * Math.pow(2, ROUND_COUNT - i - 2)].appendChild(data);
    }

    // Add leader lines
    for (var j = 0; j < Math.pow(2, i + 2); j++) {
      var classes = [];
      var data = document.createElement('td')
      data.rowSpan = Math.pow(2, ROUND_COUNT - i - 2);
      if (j % 2 == 0) {
        classes.push('bottom');
      } else {
        classes.push('top');
      }
      data.className = classes.join(' ');
      rows[j * Math.pow(2, ROUND_COUNT - i - 2)].appendChild(data);
    }

    // Add picture
    for (var j = 0; j < Math.pow(2, i + 1); j++) {
      var data = document.createElement('td')
      data.rowSpan = Math.pow(2, ROUND_COUNT - i - 1);
      var image = document.createElement('img')
      image.id = 'round-' + (ROUND_COUNT - i - 2) + '-seed-' + (Math.pow(2, i + 1) + j);
      image.dataset.round = ROUND_COUNT - i - 2;
      image.dataset.seed = Math.pow(2, i + 1) + j;
      image.addEventListener('click', matchup);
      data.appendChild(image);
      rows[j * Math.pow(2, ROUND_COUNT - i - 1)].appendChild(data);
    }
  }
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
}

main();
renderEndState();
