var theTable = document.getElementById("the-table");
var tableBody = theTable.getElementsByTagName("tbody")[0];
var addBtn = document.getElementById("addBtn");
var names = document.getElementById("inputName");
var city = document.getElementById("inputCity");
var stars = document.getElementsByClassName("star");
var theRating = document.getElementById("rating");
var row = tableBody.getElementsByTagName("tr");
var rmvBtn = tableBody.getElementsByClassName("rmvBtn");
var warn1 = document.getElementById("warn1");
var warn2 = document.getElementById("warn2");
var warn3 = document.getElementById("warn3");
var total = document.getElementById("total");
var avgRating = document.getElementById("avgRating");


var createRow = function (){
    var tr = document.createElement("tr");
    var messageName = document.getElementById("inputName").value;
    var messageCity = document.getElementById("inputCity").value;
    var messageRating = document.getElementById("rating").value;
    tr.innerHTML = tmpl("tpl",{messageName,messageCity,messageRating});
    tableBody.appendChild(tr);

};
var clearInputs = function (){
    names.value = "";
    city.value = "";
    for (var j=0; j<stars.length; j++) {
        stars[j].classList.remove("active");
    }
    theRating.value = "";
};
//avgRating = ??+parseFloat(theRating.value)/row.length.
for ( var i=0; i<stars.length; i++ ) {
    var star = stars[i];
    star.addEventListener("click", function () {
        var rating = this.getAttribute("data-value");
        theRating.value = rating;
        var length = parseFloat(rating);
        for (var j = 0; j < length; j++) {
            stars[j].classList.add("active");
            } for (var k = stars.length-1; k >=length; k--){
            stars[k].classList.remove("active");
        }
    })
}
var starsValid = function (){
    return (theRating.value >= 1);
};
var namesValid = function (){
    var nameValid = names.value.length;
    return (nameValid >= 2);
};
var citiesValid = function () {
    var cityValid = city.value.length;
    return (cityValid >= 2);
};
addBtn.addEventListener("click", function() {
    event.preventDefault();
    if (namesValid() && citiesValid() && starsValid()) {
            createRow();
            //var number = row.length;
            total.innerHTML = row.length;
        var sum = sum + theRating.value;
            clearInputs();
            warn1.style.display = "none";
            warn2.style.display = "none";
            warn3.style.display = "none";

            console.log(sum);
    }
    else {
        if (namesValid() == false)  warn1.style.display = "inline"; else warn1.style.display = "none";
        if (citiesValid() == false) warn2.style.display = "inline";  else warn2.style.display = "none";
        if (starsValid() == false) warn3.style.display = "inline";  else warn3.style.display = "none";
    }
});


////rmvBtn.addEventListener("click", function(){
////    rmvBtns()
////});
//var rmvBtns = function (){
//    var row = tableBody.getElementsByTagName("tr");
//    var rows = row.item(row.length - 1);
//    rows.parentNode.removeChild(rows);
//    for (index = row.length - 1; index >= 0; index--) {
//        row[index].parentNode.removeChild(row[index]);
//    }
//};
//

