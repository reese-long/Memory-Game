function Game(){
	this.currentLevel = 0;
}

Game.prototype.generateGrid = function(level){
	var gameGrid = '';
	var row = '<tr>'
for(var i=0; i<level; i++){
	for(var j = 0; j<level;j++){
    row+= '<td></td>';
}
row+='</tr>'
gameGrid += row;
row = '';
}
console.log(gameGrid);
$('#gameTable').append(gameGrid);

}
var game = new Game();
$(document).ready(function(){

$('#startButton').on('click', function(){
	console.log('button clicked');
	game.generateGrid(5);
});

});