
var redbtn = document.getElementById("redbtn");
var greenbtn = document.getElementById("greenbtn");
var bluebtn = document.getElementById("bluebtn");
var output = document.getElementById("rangevalue");

redbtn.addEventListener("change", function(){
 	
 	var red = redbtn.value;
	document.body.style.backgroundColor = "rgb(" + red + "," + greenbtn.value + "," + bluebtn.value + ")";

});
greenbtn.addEventListener("change", function(){
 	
 	var green = greenbtn.value;
	document.body.style.backgroundColor = "rgb(" + redbtn.value + "," + green + "," + bluebtn.value + ")";

});
bluebtn.addEventListener("change", function(){
 	
 	var blue = bluebtn.value;
	document.body.style.backgroundColor = "rgb(" + redbtn.value + "," + greenbtn.value + "," + blue + ")";

});