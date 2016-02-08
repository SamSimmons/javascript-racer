var racecarGame = (function() {
	var trackLength = 10;
	var trackStart = document.querySelector('.road-start');
	var playerOneKey = 70;
	var playerTwoKey = 74;

	var init = function () {
		trackLength = document.querySelector('#trackLength').value;
		setTrackLength(trackLength);
		addEventListener('keyup', keyPressed);
		addCars();
	};

	var setTrackLength = function (length) {
		for (var i = 0; i < length; i++) {
			createTrackElement();
		}
		var lastTrackElement = document.querySelectorAll('.track-wrapper');
		for(var j = 0; j < lastTrackElement.length; j++) {
			lastTrackElement[j].lastChild.classList.add('finish-line');
		}		
	};

	var createTrackElement = function() {
		var allTracks = document.querySelectorAll('.track-wrapper');
		for (var i = 0; i < allTracks.length; i++) {
			var trackElement = document.createElement('div');
			trackElement.classList.add('track-piece');
			allTracks[i].appendChild(trackElement);
		}
	};
//find a cleaner way to pass the lane numbers to moveCar()
	var keyPressed = function (evt) {
		if (playerOneKey === evt.keyCode) {
			moveCar(0);
		} else if (playerTwoKey === evt.keyCode) {
			moveCar(1);
		}
	};

	var addCars = function () {
		var allStartLines = document.querySelectorAll('.road-start')
		for (var i = 0; i < allStartLines.length; i++) {
			allStartLines[i].classList.add('car-' + i);
		}
	};
//find cleaner way to declare winner/call winner()
	var moveCar = function (lane) {
		var movingCar = document.querySelector('.car-' + lane);
		if (movingCar.nextElementSibling === null) {
				winner(lane);
				return;
		}
		movingCar = movingCar.nextElementSibling;
		movingCar.classList.add('car-' + lane);
		movingCar.previousElementSibling.classList.remove('car-' + lane);
	};

	var winner = function(lane) {
		confirm('the car in lane ' + lane + ' wins!');
		removeEventListener('keyup', keyPressed);
	};

	var reset = function () {
		eraseTrack();
		init();
	};

	var eraseTrack = function () {
		var allTracks = document.querySelectorAll('.track-wrapper');
		for (var i = 0; i < allTracks.length; i++) {
			var bulldozer = allTracks[i].querySelector('.road-start')
			for (var j = 0; j < trackLength; j++) {
				bulldozer.nextElementSibling.remove();
			}
		}
	};

	var resetBtn = document.querySelector('#reset');
	resetBtn.addEventListener('click', reset);

	init();

}) ()