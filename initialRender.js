function createImage(round, seed) {
  var image = document.createElement('img')
  image.id = 'round-' + round + '-seed-' + seed;
  image.dataset.round = round;
  image.dataset.seed = seed;
  image.addEventListener('click', matchup);
  return image;
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
    // Add picture
    for (var j = 0; j < Math.pow(2, ROUND_COUNT - i - 1); j++) {
      var data = document.createElement('td')
      data.rowSpan = Math.pow(2, i + 1);
      var image = createImage(i, j);
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
  var image = createImage(ROUND_COUNT - 1, 0);
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
  var image = createImage(ROUND_COUNT, 0);
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
  var image = createImage(ROUND_COUNT - 1, 1)
  data.appendChild(image);
  rows[0].appendChild(data);

  for (var i = ROUND_COUNT - 2; i >= 0; i--) {
    // Add trailer lines
    for (var j = 0; j < Math.pow(2, ((ROUND_COUNT - 2) - i) + 2); j++) {
      var classes = [];
      var data = document.createElement('td')
      data.rowSpan = Math.pow(2, ROUND_COUNT - ((ROUND_COUNT - 2) - i) - 2);
      if (j % 4 == 1) {
        classes.push('bottom');
      } else if (j % 4 == 2) {
        classes.push('top');
      }
      if (j % 4 == 1 || j % 4 == 2) {
        classes.push('right');
      }
      data.className = classes.join(' ');
      rows[j * Math.pow(2, ROUND_COUNT - ((ROUND_COUNT - 2) - i) - 2)].appendChild(data);
    }

    // Add leader lines
    for (var j = 0; j < Math.pow(2, ((ROUND_COUNT - 2) - i) + 2); j++) {
      var classes = [];
      var data = document.createElement('td')
      data.rowSpan = Math.pow(2, ROUND_COUNT - ((ROUND_COUNT - 2) - i) - 2);
      if (j % 2 == 0) {
        classes.push('bottom');
      } else {
        classes.push('top');
      }
      data.className = classes.join(' ');
      rows[j * Math.pow(2, ROUND_COUNT - ((ROUND_COUNT - 2) - i) - 2)].appendChild(data);
    }

    // Add picture
    for (var j = 0; j < Math.pow(2, ((ROUND_COUNT - 2) - i) + 1); j++) {
      var data = document.createElement('td')
      data.rowSpan = Math.pow(2, ROUND_COUNT - ((ROUND_COUNT - 2) - i) - 1);
      var image = createImage(ROUND_COUNT - ((ROUND_COUNT - 2) - i) - 2, Math.pow(2, ((ROUND_COUNT - 2) - i) + 1) + j)
      data.appendChild(image);
      rows[j * Math.pow(2, ROUND_COUNT - ((ROUND_COUNT - 2) - i) - 1)].appendChild(data);
    }
  }
}
