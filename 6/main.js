var box = document.getElementById("box");
var container = document.getElementById("container");


box.addEventListener ("input", function(){

	var value = box.value;
	var words = value.split(" ");
		console.log(words.length);

	if (words.length === 2) {
		
		var prenume = words[0];
		var nume = words[1];

		if (prenume.length >= 3 && nume.length >= 3) {
			container.classList.add("valid");

		} else {
			container.classList.remove("valid");
		}

	} else {
		container.classList.remove("valid");
	}
});

