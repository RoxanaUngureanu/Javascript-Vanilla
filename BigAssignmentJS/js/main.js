var theTable = document.getElementById("the-table");
var tableBody = theTable.getElementsByTagName("tbody")[0];
var addBtn = document.getElementById("addBtn");
var names = document.getElementById("inputName");
var city = document.getElementById("inputCity");
var stars = document.getElementsByClassName("star");
var theRating = document.getElementById("rating");
var row = tableBody.getElementsByTagName("tr");
//var rmvBtn = tableBody.getElementsByClassName("rmvBtn");
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
    tr.innerHTML = tmpl("tpl",{messageName:messageName,messageCity:messageCity,messageRating:messageRating});
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

addBtn.addEventListener("click", function(event) {
    event.preventDefault();

    if (namesValid() && citiesValid() && starsValid()) {

            createRow();
            total.innerHTML = row.length;
        initMap();
            clearInputs();
            warn1.style.display = "none";
            warn2.style.display = "none";
            warn3.style.display = "none";

    }
    else {
        if (namesValid() == false)  warn1.style.display = "inline-block"; else warn1.style.display = "none";
        if (citiesValid() == false) warn2.style.display = "inline-block";  else warn2.style.display = "none";
        if (starsValid() == false) warn3.style.display = "inline-block";  else warn3.style.display = "none";
    }

});


//var isRmvBtn = function (target) {
//    return target.classList.contains("rmvBtn");
//};
//tableBody.addEventListener("click", function(event){
//    event.preventDefault();
//    if (isRmvBtn(event.target)){
//        console.log("REMOVE")
//        for (index = row.length - 1; index >= 0; index--) {
//        row[index].parentNode.removeChild(row[index]);
//    }
//});

//------------------------MAP-------------------------//

//Here is your API key
//AIzaSyAorlvqdz5vGHbc_1MglL59zfOLrYzmzcY

var map;
//function initMap() {
//    map = new google.maps.Map(document.getElementById('map'), {
//        center: {lat: -34.397, lng: 150.644},
//        zoom: 8
//    });
//}
//var marker;
//
//function initMap() {
//    var map = new google.maps.Map(document.getElementById('map'), {
//        zoom: 10,
//        center: {lat: 44.4268, lng: 26.1025}
//    });
//
//    marker = new google.maps.Marker({
//        map: map,
//        draggable: true,
//        animation: google.maps.Animation.DROP,
//        position: {lat: 44.4268, lng: 26.1025}
//    });
//    marker.addListener('click', toggleBounce);
//}
//
//function toggleBounce() {
//    if (marker.getAnimation() !== null) {
//        marker.setAnimation(null);
//    } else {
//        marker.setAnimation(google.maps.Animation.BOUNCE);
//    }
//}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 44.4268, lng: 26.1025}
    });
    var geocoder = new google.maps.Geocoder();

    //document.getElementById('addBtn').addEventListener('click', function() {
        geocodeAddress(geocoder, map);

   //;
}
var markers = [];
function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('inputCity').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
            markers.push(marker);
        }

        console.log(markers)
      //else {
        //    alert('Geocode was not successful for the following reason: ' + status);
        //}
    });
}
