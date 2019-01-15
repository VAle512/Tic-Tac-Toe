
//Proprieta
var x_turn = true;
var victoryPositions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
var is_single_player = true;
var current_board_state = ['*','*','*','*','*','*','*','*','*'];
var first_multi_move = true;


//Setting the single player mode as the default onload
document.getElementById("ia_off").checked = false;
document.getElementById("ia_on").checked = true;

resetGameBoard(true);

document.getElementById('reset_game_board').addEventListener("click", function(){
	resetGameBoard(true);
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
			
			if(is_single_player){
				singlePlayerMode(element_id,ev);
			}else{
				multiPlayerMode(element_id,ev);
			}
			
			checkForVictory();	
		}
	}catch(err){
		console.log(err);
	}
}



//********* END: DRAG AND DROP FUNCTIONS ***********///


//It Keeps track of the single or multiplayer mode through a boolean variable in the code
document.getElementById('ia_off').addEventListener("click", function(){
	is_single_player = false;
	resetGameBoard(true);
});

document.getElementById('ia_on').addEventListener("click", function(){
	first_multi_move = true;
	is_single_player = true;
	resetGameBoard(true);
});



//Reset the game. Empty cells and zero points
function resetGameBoard(reset_points){
	var tds = document.getElementsByClassName('board_cell');
	x_turn = true;

	for(var i=0; i<tds.length; i++){
		tds[i].innerHTML = "<center><p id='cell_" + i + "' class='element fill_element'>X</p></center>";
	}
	
	if(reset_points) manageScore("reset");
}


//Check if there's a winner.
function checkForVictory(){
	updateCurrentBoardState();
	var current_winner = "";
	
	for(var i=0; i<victoryPositions.length; i++){
		
		if(current_board_state[victoryPositions[i][0]] == current_board_state[victoryPositions[i][1]] &&
			current_board_state[victoryPositions[i][0]] == current_board_state[victoryPositions[i][2]]){
			
			current_winner = current_board_state[victoryPositions[i][0]];
			
			if(current_winner != "*"){
				
				setTimeout(function(){ 
					alert("Ha vinto " + current_winner.toUpperCase()); 
					resetGameBoard(false);
					manageScore(current_winner);
				}, 100);

				return;
			}
		}
	}
	
	/*This check for ties once the board is full*/
	var notEmptyCounter = 0;
	for (var j = 0; j<current_board_state.length; j++) {
		if(current_board_state[j] != "*")
			notEmptyCounter++;
	}
	if (notEmptyCounter == 9) {
		setTimeout(function(){ 
					alert("Pareggio!"); 
					resetGameBoard(false);
				}, 100);
	}

}


function updateCurrentBoardState(){
	var table_elements = document.getElementsByClassName('element');
	current_board_state = [];
	
	//A loop that fills the current board status array.
	for(var i=0; i<table_elements.length; i++){
		
		if(table_elements[i].classList.contains("x_element")){
			current_board_state.push("x");
		}else if(table_elements[i].classList.contains("o_element")){
			current_board_state.push("o");
		}else{
			current_board_state.push("*");
		}
	}
}


//Single player Rules
function multiPlayerMode(element_id,ev){
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
}


//Multi player Rules
function singlePlayerMode(element_id,ev){
	
	if(element_id == "x_img"){
		ev.target.parentElement.innerHTML = "<center><p class='element x_element'><b>X</b></p></center>";
		
		setTimeout(IA , 300);
	}
}


function IA(){
	
	//Controllo le posizioni occupate dai O (Se non ci sono ancora cerchietti posizionati scelgo una posizione casuale non occupata dalle X)
	if(first_multi_move){
		first_multi_move = false;
		var randEmptyPos = randomEmptyPosition();	
		document.getElementById('cell_' + randEmptyPos).parentElement.innerHTML = "<center><p class='element o_element'><b>O</b></p></center>";
	
	}else{
		for(var i=0; i<current_board_state.length; i++){
			
			if(current_board_state[i] == "o"){
				console.log("Questo e l indice: " + i);
				for(var z=0; z<victoryPositions.length; z++){
					console.log(victoryPositions[z]);
					
					if(victoryPositions[z].includes(i)){
						//Checking if the current victory positions are actually empty
						var emptySlot = checkForEmptyVictoryPositions(victoryPositions[z]);
						console.log("Questo lo contiene! " +  emptySlot)
						
						if(emptySlot != -1){
							document.getElementById("cell_" + emptySlot).parentElement.innerHTML = "<center><p class='element o_element'><b>O</b></p></center>";
							break;
						}
					}
				}
			}
		}
	}
	
	
	
	//Per ogni posizione occupata dai cerchietti controllo le posizioni di vittoria che la contengono. Ciclo le posizioni di vittoria e se ce n'e una libera
	//tra le tre posiziono il cerchietto.
}



//Returns the index of a random position that is currently empty
function randomEmptyPosition(){
	var emptySlots = [];
	console.log(current_board_state);
	
	for(var i=0; i<current_board_state.length; i++){
		
		if(current_board_state[i] == "*"){
			emptySlots.push(i);
		}
	}
	var rand = Math.floor(Math.random() * emptySlots.length);
	console.log(emptySlots);
	
	return emptySlots[rand];	
}


//Returns the index of the empty position if it exists in the current victoryPositions array
function checkForEmptyVictoryPositions(victoryPos){
	for(var i=0; i<victoryPos.length; i++){
		updateCurrentBoardState();
		console.log("Stato board: " + current_board_state);
		if(current_board_state[victoryPos[i]] == "*"){
			
			console.log("Posizione finale di vittoria: " +  victoryPos[i]);
			return victoryPos[i];
		}
	}
	
	return -1; //There are no empty positions
}
