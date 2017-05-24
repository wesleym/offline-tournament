function createImage(round, seed) {
  var image = document.createElement('img')
  image.id = 'round-' + round + '-seed-' + seed;
  image.dataset.round = round;
  image.dataset.seed = seed;
  image.addEventListener('click', matchup);
  return image;
}

function renderLeaderLines(rows, round) {
  for (var j = 0; j < Math.pow(2, ROUND_COUNT - round); j++) {
    var classes = [];
    var data = document.createElement('td')
    data.rowSpan = Math.pow(2, round);
    if (j % 2 == 0) {
      classes.push('bottom');
    } else {
      classes.push('top');
    }
    data.className = classes.join(' ');
    rows[j * Math.pow(2, round)].appendChild(data);
  }
}

function renderTrailerLines(rows, round, side) {
  for (var j = 0; j < Math.pow(2, ROUND_COUNT - round); j++) {
    var classes = [];
    var data = document.createElement('td')
    data.rowSpan = Math.pow(2, round);
    if (j % 4 == 1) {
      classes.push('bottom');
    } else if (j % 4 == 2) {
      classes.push('top');
    }
    if (j % 4 == 1 || j % 4 == 2) {
      classes.push(side);
    }
    data.className = classes.join(' ');
    rows[j * Math.pow(2, round)].appendChild(data);
  }
}

function renderImages(rows, round, half) {
  for (var j = 0; j < Math.pow(2, ROUND_COUNT - round - 1); j++) {
    var data = document.createElement('td')
    data.rowSpan = Math.pow(2, round + 1);
    var image = createImage(round, Math.pow(2, ROUND_COUNT - round - 1) * half + j)
    data.appendChild(image);
    rows[j * Math.pow(2, round + 1)].appendChild(data);
  }
}

function initialRender() {
  var target = document.querySelector('#target');
  var rows = [];
  for (var i = 0; i < TEAM_COUNT; i++) {
    var row = document.createElement('tr');
    rows.push(row);
    target.appendChild(row);
  }

  for (var i = 0; i < ROUND_COUNT - 1; i++) {
    renderImages(rows, i, 0);
    renderLeaderLines(rows, i);
    renderTrailerLines(rows, i, 'left');
  }

  // Finalist
  renderImages(rows, ROUND_COUNT - 1, 0);
  renderLeaderLines(rows, ROUND_COUNT - 1);

  // Winner
  renderImages(rows, ROUND_COUNT, 0);

  // Finalist
  renderLeaderLines(rows, ROUND_COUNT - 1);
  renderImages(rows, ROUND_COUNT - 1, 1);

  for (var i = ROUND_COUNT - 2; i >= 0; i--) {
    // Add trailer lines
    renderTrailerLines(rows, i, 'right');
    renderLeaderLines(rows, i);
    renderImages(rows, i, 1);
  }
}
