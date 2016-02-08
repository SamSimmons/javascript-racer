var trackLength = 10;
// f = 70 j = 74

var setTrackLength = function () {
  for (var i = 0; i < trackLength; i++) {
    createTrackElement();
  }
  var lastTrackPiece = document.querySelectorAll('.wrapper');
  for (var i = 0; i < lastTrackPiece.length; i++) {
    lastTrackPiece[i].lastChild.classList.toggle('finish-line');
  }
};

var createTrackElement = function () {
  var leftElement = document.createElement('div');
  leftElement.classList.add('road-left');
  var rightElement = document.createElement('div');
  rightElement.classList.add('road-right');


  var leftAppend = document.querySelector('.left-track');
  var rightAppend = document.querySelector('.right-track');
  leftAppend.appendChild(leftElement);
  rightAppend.appendChild(rightElement);
};

var keyPressed = function (e) {
  var keyCode = e.keyCode;
  if (keyCode === 70) {
    moveCar('left');
  } else if (keyCode === 74) {
    moveCar('right');
  }
};

var winner = function (winner) {
  console.log('the winner is ' + winner + '!');
  removeEventListener('keyup', keyPressed);
}

var moveCar = function (lane) {
  console.log("The car in the " + lane + " has moved one square");
  if (lane === 'left') {
    if (left.nextElementSibling === null) {
      winner('left');
      return;
    }
    left = left.nextElementSibling;
    left.classList.add('car-left');
    left.previousElementSibling.classList.remove('car-left');
  } else if (lane === 'right') {
      if (right.nextElementSibling === null) {
        winner('right');
        return;
      }
    right = right.nextElementSibling;
    right.classList.add('car-right');
    right.previousElementSibling.classList.remove('car-right');
  }
}

var init = function() {
  addEventListener('keyup', keyPressed );
  left.classList.add('car-left');
  right.classList.add('car-right');
}

var reset = function () {
  left.classList.remove('car-left');
  right.classList.remove('car-right');
  left = document.querySelector('.road-left');
  right = document.querySelector('.road-right');
  init();
};

setTrackLength(trackLength);

var left = document.querySelector('.road-left');
var right = document.querySelector('.road-right');
// init();