
//Proprieta
var x_turn = true;
var victoryPositions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];


resetGameBoard();


document.getElementById('reset_game_board').addEventListener("click", function(){
	resetGameBoard();
});


//********* DRAG AND DROP FUNCTIONS ***********///

function allowDrop(ev) {
	ev.preventDefault();
}


//Grabbing data from the element i'm starting to drag
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}


function manageScore(currEl){
	switch(currEl){
		case "x":
			var x_points = parseInt(document.getElementById("x_points").innerHTML);
			document.getElementById("x_points").innerHTML = x_points + 1;
		break;
		case "o":
			var o_points = parseInt(document.getElementById("o_points").innerHTML);
			document.getElementById("o_points").innerHTML = o_points + 1;
		break;
		case "reset":
			document.getElementById("o_points").innerHTML = "0";
			document.getElementById("x_points").innerHTML = "0";
		break;
		default:
			console.log("Nessuno prende punti");
		break;

	}
}

//Function that occurs when i drop the elements
function drop(ev) {
	ev.preventDefault();
	var element_id = ev.dataTransfer.getData("text");
	
	try{
		if(ev.target.childNodes[0].classList.contains("fill_element")){
			
			switch(element_id){
				case "x_img":
					
					if(x_turn){
						ev.target.parentElement.innerHTML = "<center><p class='element x_element'><b>X</b></p></center>";
						x_turn = false;
					}
					break;
				
				case "o_img":
					
					if(!x_turn){
						ev.target.parentElement.innerHTML = "<center><p class='element o_element'><b>O</b></p></center>";
						x_turn = true;
					}
					break;
			}
			checkForVictory();	
			
		}
	}catch(err){
		console.log("piazzato");
	}
	
	
}

//********* END: DRAG AND DROP FUNCTIONS ***********///


//Reset the game. Empty cells and zero points
function resetGameBoard(){
	var tds = document.getElementsByClassName('board_cell');
	x_turn = true;

	for(var i=0; i<tds.length; i++){
		tds[i].innerHTML = "<center><p class='element fill_element'>X</p></center>";
	}
	
	manageScore("reset");
}


//Check if there's a winner.
function checkForVictory(){
	var table_elements = document.getElementsByClassName('element');
	var current_board_elements = [];
	var current_winner = "";
	
	//A loop that fills the current board status array.
	for(var i=0; i<table_elements.length; i++){
		
		if(table_elements[i].classList.contains("x_element")){
			current_board_elements.push("x");
		}else if(table_elements[i].classList.contains("o_element")){
			current_board_elements.push("o");
		}else{
			current_board_elements.push("*");
		}
	}

	
	for(var i=0; i<table_elements.length; i++){
		var victoryPosition = victoryPositions[i];

		if(current_board_elements[victoryPosition[0]] == current_board_elements[victoryPosition[1]] &&
			current_board_elements[victoryPosition[0]] == current_board_elements[victoryPosition[2]]){
			
			current_winner = current_board_elements[victoryPosition[0]];
			
			if(current_winner != "*"){
				
				setTimeout(function(){ 
					alert("Ha vinto " + current_winner.toUpperCase()); 
					resetGameBoard();
					manageScore(current_winner);
				}, 100);

				break;
			}
		}
	}
}



