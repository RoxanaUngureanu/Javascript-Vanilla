

var width = window.innerWidth;
var height = window.innerHeight;

document.addEventListener ("mousemove", function(event){
	var clientX = event.clientX;
	var clientY = event.clientY;


	var sat = Math.round(clientX/width *100) + "%";
	var hue = Math.round(clientY/height *360);

	document.body.style.backgroundColor = "hsl(" + hue + "," + sat + ",50%)";
});