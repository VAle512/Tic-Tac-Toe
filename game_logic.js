
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
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
}