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

var overallSlots = [initialSlots, []];
var overallWinner;

document.querySelector('#chooser-left').src = overallSlots[0][0]
document.querySelector('#chooser-right').src = overallSlots[0][1]

function showChooser() {
  document.querySelector('#chooser').style.display = 'block';
}

function hideChooser() {
  document.querySelector('#chooser').style.display = 'none';
}

document.querySelector('#next-button').addEventListener('click', showChooser);
document.querySelector('#back-button').addEventListener('click', function() {
  if (overallSlots[overallSlots.length - 1].length == 0) {
    if (overallSlots.length == 2) {
      return;
    }
    overallSlots.pop()
  }
  overallSlots[overallSlots.length - 1].pop()
  var i = overallSlots[overallSlots.length - 1].length
  var currentSlots = overallSlots[overallSlots.length - 2]
  document.querySelector('#chooser-left').src = currentSlots[2*i]
  document.querySelector('#chooser-right').src = currentSlots[2*i + 1]
  renderEndState();
});

function onChoice(e, userInput) {
  var round = e.target.dataset.round;
  var seed = e.target.dataset.seed;

  var img = document.querySelector('#round-' + round + '-seed-' + seed);
  img.src = e.target.src;

  var i = overallSlots[overallSlots.length - 1].length
  var currentSlots = overallSlots[overallSlots.length - 2]
  var leftItem = currentSlots[2*i];
  var rightItem = currentSlots[(2*i)+1];

  var currentWinner;
  if (userInput == "0") {
      currentWinner = leftItem;
  } else if(userInput == "1") {
      currentWinner = rightItem;
  }

      overallSlots[overallSlots.length-1].push(currentWinner);

  if (currentRound == ROUND_COUNT) {
      overallWinner = currentWinner;
  }
  i++;
  hideChooser();
  renderEndState();
  if (2*i >= overallSlots[overallSlots.length-2].length) {
        overallSlots.push([]);
    currentRound++;
    slotLen = currentSlots.length;
  }
  document.querySelector('#chooser-left').src = currentSlots[2*i]
  document.querySelector('#chooser-right').src = currentSlots[2*i + 1]
}

document.querySelector('#chooser-left').addEventListener('click', function(e) {
  onChoice(e, 0);
});

document.querySelector('#chooser-right').addEventListener('click', function(e) {
  onChoice(e, 1);
});

document.querySelector('#clear-button').addEventListener('click', function(e) {
});

var currentRound = 1;
