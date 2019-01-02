//I fill all of the td to make them look right
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
	console.log("drag");
	ev.dataTransfer.setData("text", ev.target.id);
}


function drop(ev) {
	ev.preventDefault();
	var element_id = ev.dataTransfer.getData("text");
	
	try{
		if(ev.target.childNodes[0].classList.contains("fill_element")){
			switch(element_id){
				case "x_img":
					ev.target.parentElement.innerHTML = "<center><p class='element x_element'><b>X</b></p></center>";
					break;
				
				case "o_img":
					ev.target.parentElement.innerHTML = "<center><p class='element o_element'><b>O</b></p></center>";
					break;
			}
		}
	}catch(err){
		console.log("piazzato");
	}
	
	
}


function resetGameBoard(){
	var tds = document.getElementsByClassName('board_cell');

	for(var i=0; i<tds.length; i++){
		tds[i].innerHTML = "<center><p class='element fill_element'>X</p></center>";
	}
}








