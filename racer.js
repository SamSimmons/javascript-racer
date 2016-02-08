var left = document.querySelector('.road-left');
var right = document.querySelector('.road-right');
// f = 70 j = 74

var keyPressed = function (e) {
  var keyCode = e.keyCode;
  if (keyCode === 70) {
    moveCar('left');
  } else if (keyCode === 74) {
    moveCar('right');
  }
};

var winner = function( winner) {
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
    left.classList.add('red');
    left.previousElementSibling.classList.remove('red');
  } else if (lane === 'right') {
      if (right.nextElementSibling === null) {
        winner('right');
        return;
      }
    right = right.nextElementSibling;
    right.classList.add('red');
    right.previousElementSibling.classList.remove('red');
  }
}

addEventListener('keyup', keyPressed );
