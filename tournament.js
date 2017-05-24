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
