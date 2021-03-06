/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var racecarGame = (function() {
		var trackLength = 10;
		var trackStart = document.querySelector('.road-start');
		var playerOneKey = 70;
		var playerTwoKey = 74;
		var startTime;
		var endTime;
		var raceTime;



		var init = function () {
			trackLength = document.querySelector('#trackLength').value;
			setTrackLength(trackLength);
			//addEventListener('keyup', keyPressed);
			addCars();
			setHorizon();
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
			var allStartLines = document.querySelectorAll('.road-start');
			for (var i = 0; i < allStartLines.length; i++) {
				allStartLines[i].classList.add('car-' + i);
			}
		};
	//find cleaner way to declare winner/call winner()
		var moveCar = function (lane) {
			var movingCar = document.querySelector('.car-' + lane);
			if (movingCar.nextElementSibling === null) {
					raceTime = calcTime();
					winner(lane);
					return;
			}
			movingCar = movingCar.nextElementSibling;
			movingCar.classList.add('car-' + lane);
			movingCar.previousElementSibling.classList.remove('car-' + lane);
		};

		var calcTime = () => (Date.now() - startTime) / 1000;
			

		var winner = function(lane) {
			var winBox = document.createElement('div');
			winBox.innerHTML = "<p>Congratulations to the driver in lane " + lane + ". They won the race in " + raceTime.toFixed(2) + " seconds, press reset to race again!</p>";
			winBox.classList.add('overlay');
			document.body.appendChild(winBox);
			removeEventListener('keyup', keyPressed);
		};

		var removeWinner = function() {
			document.querySelector('.overlay').remove();
		}

		var reset = function () {
			if ( document.querySelector('.overlay') ) {
				removeWinner();
			}		
			eraseTrack();
			resetLights();
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

		var startLights = function () {
			document.querySelector('.starter-lights').style.display = "block";
			var twoSecDelay = function() {
				var light = document.querySelector('.off');
				light.classList.toggle('on');
				light.classList.toggle('off');
			};
			setTimeout(twoSecDelay, 1000);
			setTimeout(twoSecDelay, 2000);
			setTimeout(enableRace, 2000);
			setTimeout(() => {
				document.querySelector('.starter-lights').style.display = "none";
			}, 2500);	
		};

	//refactor to make DRY
		var resetLights = function () {
			var orange = document.querySelector('#orangeLight')
			orange.classList.remove('on');
			orange.classList.add('off');
			var green = document.querySelector('#greenLight')
			green.classList.remove('on');
			green.classList.add('off');
		}

		var setHorizon = function () {
			var tracks = document.querySelectorAll('.track-wrapper');
			for (var i = 0; i < tracks.length; i++) {
				var trackPieces = tracks[i].children;
				for (var j = 0; j < trackPieces.length; j++) {
					trackPieces[j].classList.add('track-height-index-' + j);
				}
			}
			var allStartLines = document.querySelectorAll('.road-start');
		};

		var enableRace = function() {
			startTime = Date.now();
			addEventListener('keyup', keyPressed);
			
		};

		var resetBtn = document.querySelector('#reset');
		var goBtn = document.querySelector('#go');
		resetBtn.addEventListener('click', reset);
		goBtn.addEventListener('click', startLights);


		init();
		

	}) ()

/***/ }
/******/ ]);