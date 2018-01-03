function Game(){
	this.currentLevel = 1;
	this.targets=[];
	this.idArr = [];
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
//console.log(gameGrid);
$('#gameTable').append(gameGrid);
}



 function genRandom(min, max)
 {return Math.floor(Math.random() * (max - min)) + min; }
 //genRandom(0,1) // exclusive of max

Game.prototype.randomNoRepeats = function(arr, num){
	
	var arrCopy=[];
	  var retArr = [];

	arrCopy = arr.slice();
  for(var i = 0; i< num;i++){
    randInd = genRandom(0, arrCopy.length);
    retArr.push(arrCopy[randInd]);
    arrCopy.splice(randInd,1)
  }
  console.log('RUNN')
console.log('ID ARR: ',arrCopy)
	console.log('retArr: ',retArr)  
	return retArr
}

Game.prototype.chooseTargetTiles = function(){
var	numCubes = this.currentLevel*this.currentLevel;
	var numTarget = Math.floor(numCubes/3);
	var targetArr=[];
	 targetArr= this.randomNoRepeats(this.idArr,numTarget) ;
	//console.log('numTargets = ', numTarget, 'numCubes = ', numCubes)

	// for(var i = 0; i< numTarget; i++){
	// 	var randomVal = genRandom(0, numCubes);
	// 	targetArr.push(randomVal)
	// }

	//console.log('targetArrRRR = ', targetArr)
	return targetArr;

}


//newPanel.add(prevBtn).add(nextBtn).add(infoPanel).fadeIn(200);
//$(".home, .services, .location, .contact,").fadeOut(500);


Game.prototype.showTiles = function(){
var selectorArr = [];
var blueTilesPreexposureTime = 500; //works
var exposureTime = 1500;
var joined= [];
	this.targets = this.chooseTargetTiles();
	console.log('thisTarg = ',this.targets)
	//console.log('targets in showTiles  = ',this.targets);
	//var exposureTime = 2000;
	for (var i  =0; i< this.targets.length; i++){
	var targetElement = this.targets[i];
	//console.log('targetElement = ',targetElement)
	var selector = '#tile'+targetElement
	//console.log('selector = ', selector)
	selectorArr.push(selector);
}
	 joined =  selectorArr.join(', ');
	$('td').animate({backgroundColor:'#065373'},{duration: blueTilesPreexposureTime})
	$(joined).animate({backgroundColor:'#F6D550'},{duration:500})
	$(joined).animate({backgroundColor:'#F6D550'},{duration:500})
	$('td').animate({backgroundColor:'#065373'},{duration:500})

	
	 

	
	
	

}
Game.prototype.nextLevel = function(){
	this.currentLevel++;
	this.targets=[];
	this.idArr = [];
	$('#gameTable').empty();	
	//console.log('start button clicked');
	this.generateGrid(this.currentLevel);
	this.showTiles();
	this.attemptSelection();
	$('#startButton').prop('disabled',true);
}

	Game.prototype.attemptSelection = function(){
		var self = this; //game
		var guessed = [];
var done = false;
	var numberCorrect = 0;
	$('td').on('click', function(){console.log(this.id,self.targets)
		var clicked = parseInt(this.id.slice(4));
		if(self.targets.indexOf(clicked)>-1 && guessed.indexOf(clicked) <0){
			guessed.push(clicked)
			$(this).animate({backgroundColor:'#F6D550'},500)
			//console.log('WAS COLORED');
			numberCorrect++;
			if(numberCorrect==self.targets.length){
				 done = true;
				$('td').animate({backgroundColor:'#F6D550'},500);
//ADD TIMER
//SHOW CORRECT BEFORE NXT LEVEL
//POINT SYSTEM
				$('#startButton').prop('disabled',false)
				$('#startButton').text("Level "+ self.currentLevel)

					
			}
		}
		else if (guessed.indexOf(clicked) <0){
			console.log('NOT COLROEDDD')
			var newSelf = this;
			$(this).animate({backgroundColor:'Red'},500)
		setTimeout(function(){
			
			$(newSelf).animate({backgroundColor:'#065373'},2300)

		})
	}
})
}



$(document).ready(function(){

	var game = new Game();
	game.generateGrid(6);
		//



$('#startButton').on('click', function(){

	game.nextLevel();


});

$('#testButton').on('click', function(){
	console.log('test button clicked');


});



//$(document).on('click', function(){console.log('click event!')});
});

