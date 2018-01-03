










//ADD TIMER
//SHOW CORRECT BEFORE NXT LEVEL
//POINT SYSTEM

function Game(){
	this.currentLevel = 1;
	this.targets=[];
	this.idArr = [];
	this.num
	//varbuttonColor = '#542B72'
}

Game.prototype.generateGrid = function(level){
	var gameGrid = '';
	var idNum = 0;
	this.idArr = [];
	var row = '<tr>'
	for(var i=0; i<level; i++){
		for(var j = 0; j<level;j++){
    		row+= "<td id = '"+'tile'+ idNum+ "'></td>";
        	this.idArr.push(idNum)
    		idNum++;
			}
		row+= "</tr>";
		gameGrid += row;
		row = '';
		}
	$('#gameTable').append(gameGrid);

}



Game.prototype.genRandom = function(min, max){
	return Math.floor(Math.random() * (max - min)) + min; //exclusive of max
}

Game.prototype.randomNoRepeats = function(arr, num){
	
	var arrCopy=[];
	var retArr = [];
	arrCopy = arr.slice();
  	for(var i = 0; i< num;i++){
    	randInd = this.genRandom(0, arrCopy.length);
    	retArr.push(arrCopy[randInd]);
    	arrCopy.splice(randInd,1)
  		}
	return retArr

}


Game.prototype.chooseTargetTiles = function(){
	var	numCubes=this.currentLevel*this.currentLevel;
	var numTarget=Math.floor(numCubes/3);
	var targetArr=[];
	targetArr=this.randomNoRepeats(this.idArr,numTarget) ;
	return targetArr;
}


Game.prototype.showTiles = function(){

	var selectorArr = [];
	var blueTilesPreexposureTime = 1700; //works
	var exposureTime =600;
	if(this.currentLevel>3){
		exposureTime+=1000;
		if(this.currentLevel>5){
			exposureTime+=1000
			}
		}


	this.targets = this.chooseTargetTiles();
	console.log('thisTarg = ',this.targets)

	for (var i  =0; i< this.targets.length; i++)
		{
		var selector = '#tile'+this.targets[i];
		selectorArr.push(selector);
		}

	var joined =  selectorArr.join(', ');
	$('td').animate({backgroundColor:'#065373'},{duration: 300})
	setTimeout(function(){
		$(joined).animate({backgroundColor:'#F6D550'},{duration:300})
	$(joined).animate({backgroundColor:'#F6D550'},{duration:exposureTime})
	$('td').animate({backgroundColor:'#065373'},{duration:300})
},blueTilesPreexposureTime)
	
	
}



Game.prototype.changeLevel = function(upOrDown){

	(upOrDown === true)?this.currentLevel++:this.currentLevel--;
	this.targets=[];
	this.idArr = [];
	$('#gameTable').empty();	
	this.generateGrid(this.currentLevel);
	this.showTiles();
	this.attemptSelection();
		$('#startButton').prop('disabled',true);

}


Game.prototype.attemptSelection = function(){
	var numWrong = 0;
	var self = this; //game
	var guessed = [];
	var done = false;
	var numberCorrect = 0;
	var missesAllowed = Math.floor(this.targets.length/2)+Math.ceil(this.currentLevel/2);
	$('td').on('click', function(){console.log(this.id,self.targets)
	var clicked = parseInt(this.id.slice(4));
	if(self.targets.indexOf(clicked)>-1 && guessed.indexOf(clicked) <0){
		guessed.push(clicked)
		$(this).animate({backgroundColor:'#F6D550'},200)
		numberCorrect++;
		if(numberCorrect==self.targets.length){
			done = true;
			$('td').animate({backgroundColor:'#F6D550'},500);
			$('#startButton').prop('disabled',false)
			$('#startButton').text("Go to Level "+ self.currentLevel)					
			}
		}
		else if (guessed.indexOf(clicked) <0){
						var newSelf = this;
			$(this).animate({backgroundColor:'Red'},500)
			numWrong++;
			if(numWrong >= missesAllowed){
			//	setTimeout(function(){},1000;)
				self.changeLevel(false);
			}

			setTimeout(function(){
				$(newSelf).animate({backgroundColor:'#065373'},2300)

		})
	}
})

}


$(document).ready(function(){

	var game = new Game();
	game.generateGrid(6);

	$('#startButton').on('click', function(){
		game.changeLevel(true);
	});

});

