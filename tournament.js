var numTeams = 32;
var numRounds = Math.ceil(Math.log2(numTeams)); //The math checks out. Maybe

// alert("Number of rounds is: " + numRounds);

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

var currentSlots = initialSlots;
var nextSlots = [];
var overallSlots = [initialSlots, []];
var overallWinner;
var slotLen = currentSlots.length;

document.querySelector('#chooser-left').src = currentSlots[0]
document.querySelector('#chooser-right').src = currentSlots[1]

function showChooser() {
  document.querySelector('#chooser').style.display = 'block';
}

function hideChooser() {
  document.querySelector('#chooser').style.display = 'none';
}

document.querySelector('#next-button').addEventListener('click', showChooser);

document.querySelector('#chooser-left').addEventListener('click', function() {
  var userInput = "0";
  var leftItem = currentSlots[2*i];
  var rightItem = currentSlots[(2*i)+1];

  var currentWinner;
  if (userInput == "0") {
      currentWinner = leftItem;
  } else if(userInput == "1") {
      currentWinner = rightItem;
  }

      nextSlots.push(currentWinner);

  if (currentRound == numRounds) {
      overallWinner = currentWinner;
  }
  i++;
  hideChooser();
  overallSlots[overallSlots.length-1].push(currentWinner);
  renderEndState();
  if (2*i >= slotLen) {
    i = 0;
        overallSlots.push([]);
        currentSlots = nextSlots;
        nextSlots = [];
    currentRound++;
    slotLen = currentSlots.length;
  }
  document.querySelector('#chooser-left').src = currentSlots[2*i]
  document.querySelector('#chooser-right').src = currentSlots[2*i + 1]
});
document.querySelector('#chooser-right').addEventListener('click', function() {
  var userInput = "1"
    var leftItem = currentSlots[2*i];
    var rightItem = currentSlots[(2*i)+1];

  var currentWinner;
  if (userInput == "0") {
      currentWinner = leftItem;
  } else if(userInput == "1") {
      currentWinner = rightItem;
  }

      nextSlots.push(currentWinner);

  if (currentRound == numRounds) {
      overallWinner = currentWinner;
  }
  i++;
  hideChooser();
  overallSlots[overallSlots.length-1].push(currentWinner);
  renderEndState();
  if (2*i >= slotLen) {
    i = 0;
    overallSlots.push([]);
        currentSlots = nextSlots;
        nextSlots = [];
    currentRound++;
    slotLen = currentSlots.length;
  }
  document.querySelector('#chooser-left').src = currentSlots[2*i]
  document.querySelector('#chooser-right').src = currentSlots[2*i + 1]
});

var currentRound = 1;
var i = 0;

// for (var currentRound = 1; currentRound <= numRounds; currentRound++) {
//     // alert("New Round! Current Round is: " + currentRound);
//
//     var slotLen = currentSlots.length;
//     for (var i = 0; i < slotLen; i++) {
//         //This section is kind of sad and I'm a bad person for writing it.
//         var message = "Type 0 for " + leftItem + " or 1 for " + rightItem;
//         var userInput = "";
//         while (userInput != "0" && userInput != "1") {
//             // userInput = prompt(message);
//             userInput = Math.floor(Math.random() * 2)
//         }
//
//         var thisMatch = currentSlots[i;
//         var leftItem = thisMatch[0;
//         var rightItem = thisMatch[1;
//
//         var currentWinner;
//         if (userInput == "0") {
//             currentWinner = leftItem;
//         } else if(userInput == "1") {
//             currentWinner = rightItem;
//         } else {
//             alert("Problem!! Shouldn't be here");
//             break;
//         }
//
//         nextMatch.push(currentWinner);
//         if (nextMatch.length == 2) {
//             nextSlots.push(nextMatch);
//             nextMatch = [;
//         }
//
//         if (currentRound == numRounds) {
//             overallWinner = currentWinner;
//         }
//
//     }
//
//     overallSlots.push(currentSlots);
//     currentSlots = nextSlots;
//     nextSlots = [;
// }
// currentRound++;
if (currentRound <= numRounds) {
  // showChooser();
}

// overallSlots.push([overallWinner]);
// alert("The overall winner is: " + overallWinner);