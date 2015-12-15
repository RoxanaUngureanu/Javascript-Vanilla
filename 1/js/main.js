bar = document.getElementById("bar");
btn = document.getElementById("btn");

var getRandomNumber = function () {
	return Math.floor (Math.random()*100);
};

btn.addEventListener("click", function () {
	var result = getRandomNumber() + "%";
	bar.style.width = result;
}
);
