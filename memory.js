function Game() {
	this.currentLevel = 1;
	this.targets = [];
	this.idArr = [];
	this.readyForInput = false;
}

Game.prototype.generateGrid = function (level) {
	var gameGrid = '';
	var idNum = 0;
	this.idArr = [];
	var row = '<tr>'
	for (var i = 0; i < level; i++) {
		for (var j = 0; j < level; j++) {
			row += "<td id = '" + 'tile' + idNum + "'></td>";
			this.idArr.push(idNum)
			idNum++;
		}
		row += "</tr>";
		gameGrid += row;
		row = '';
	}

}

Game.prototype.genRandom = function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min; //exclusive of max
}

Game.prototype.randomNoRepeats = function (arr, num) {
	var arrCopy = [];
	var retArr = [];
	arrCopy = arr.slice();
	for (var i = 0; i < num; i++) {
		randInd = this.genRandom(0, arrCopy.length);
		retArr.push(arrCopy[randInd]);
		arrCopy.splice(randInd, 1)
	}
	return retArr
}

Game.prototype.chooseTargetTiles = function () {
	var numCubes = this.currentLevel * this.currentLevel;
	var numTarget = this.currentLevel < 5 ? Math.floor(numCubes / 3) + 1 :
		(Math.floor(numCubes / 3)) - (Math.ceil(this.currentLevel / 2) - 2);
	var targetArr = [];
	targetArr = this.randomNoRepeats(this.idArr, numTarget);
	return targetArr;
}

Game.prototype.showTiles = function () {
	let selectorArr = [];
	const blueTilesPreexposureTime = 1700; //works
	let exposureTime = 600;
	if (this.currentLevel > 3) {
		exposureTime += 1000;
		if (this.currentLevel > 5) {
			exposureTime += 1000
		}
	}
	this.targets = this.chooseTargetTiles();
	for (var i = 0; i < this.targets.length; i++) {
		var selector = '#tile' + this.targets[i];
		selectorArr.push(selector);
	}
	var joined = selectorArr.join(', ');
	$('td').animate({ backgroundColor: '#065373' }, { duration: 300 })
	setTimeout(function () {
		$(joined).animate({ backgroundColor: '#F6D550' }, { duration: 300 })
		$(joined).animate({ backgroundColor: '#F6D550' }, { duration: exposureTime })
		$('td').animate({ backgroundColor: '#065373' }, { duration: 300 })
	}, blueTilesPreexposureTime)
}

Game.prototype.changeLevel = function (upOrDown) {
	(upOrDown === true) ? this.currentLevel++ : this.currentLevel--;
	this.readyForInput = false;
	this.targets = [];
	this.idArr = [];
	$('#gameTable').empty();
	this.generateGrid(this.currentLevel);
	this.showTiles();
	this.attemptSelection();
	$('#startButton').prop('disabled', true)
	$('#startButton').animate({ backgroundColor: 'Gray' }, 300);
}

Game.prototype.attemptSelection = function () {
	var numWrong = 0;
	var self = this; //game
	var guessed = [];
	var done = false;
	var numberCorrect = 0;
	var missesAllowed = Math.floor(this.targets.length / 2) + Math.ceil(this.currentLevel / 2);
	var tileDisableTime = (self.currentLevel > 3) ? 4000 : 3000
	if (self.currentLevel > 5) { tileDisableTime += 1000 }
	setTimeout(function () {
		$('td').on('click', function () {
			var clicked = parseInt(this.id.slice(4));

			if (self.targets.indexOf(clicked) > -1 && guessed.indexOf(clicked) < 0) {
				guessed.push(clicked)
				$(this).animate({ backgroundColor: '#F6D550' }, 200)
				numberCorrect++;
				if (numberCorrect == self.targets.length) {
					done = true;
					$('td').animate({ backgroundColor: '#F6D550' }, 500);
					$()
					$('#startButton').prop('disabled', false)
					$('#startButton').text("Level " + self.currentLevel)
					$('#startButton').css({ backgroundColor: '#23E162' })
				}
			}
			else if (guessed.indexOf(clicked) < 0 && !done) {
				var newSelf = this;
				$(this).animate({ backgroundColor: 'Red' }, 200)
				numWrong++;
				if (numWrong >= missesAllowed && self.currentLevel > 2) {
					self.changeLevel(false);
				}
				setTimeout(function () {
					$(newSelf).animate({ backgroundColor: '#065373' }, 500)
				}, 600)
			}
		})
	}, tileDisableTime)
}

$(document).ready(function () {
	var game = new Game();
	game.generateGrid(5);
	$('td').animate({ backgroundColor: '#065373' }, 0)
	$('#startButton').on('click', function () {
		game.changeLevel(true);
	});
	$('#leftArrow,#rightArrow').on('click', function (event) {
		if (this.id == 'leftArrow') {
			if (game.currentLevel > 2) {
				game.changeLevel(false)
			}
		}
		else { game.changeLevel(true); }
	})
});

