var theTable = document.getElementById("the-table");
var tableBody = theTable.getElementsByTagName("tbody")[0];
var addBtn = document.getElementById("addBtn");
var names = document.getElementById("inputName");
var city = document.getElementById("inputCity");
var stars = document.getElementsByClassName("star");
var theRating = document.getElementById("rating");
var row = tableBody.getElementsByTagName("tr");
var warn1 = document.getElementById("warn1");
var warn2 = document.getElementById("warn2");
var warn3 = document.getElementById("warn3");
var total = document.getElementById("total");
var avgRating = document.getElementById("avgRating");

var store = [];
var getValues = function () {
    return {
        city: city.value,
        names: names.value,
        theRating: theRating.value
    }
};

var createRow = function (values){
    var tr = document.createElement("tr");
    //var messageName = document.getElementById("inputName").value;
    //var messageCity = document.getElementById("inputCity").value;
    //var messageRating = document.getElementById("rating").value;
    //tr.innerHTML = tmpl("tpl",{messageName:messageName,messageCity:messageCity,messageRating:messageRating});
    tr.innerHTML = tmpl("tpl",values);
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
var average = function(){
    var sum = 0;
    for( var i = 0; i < store.length; i++ ){
        sum += parseFloat(store[i].theRating)
    }
    var avg = sum/store.length;
        avgRating.innerHTML = parseFloat(avg).toFixed(1) + " / 5";
    if (store.length == 0) avgRating.innerHTML = 0;
};
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
    return (nameValid >= 2 && isNaN(names.value[0]));
};
var citiesValid = function () {
    var cityValid = city.value.length;
    return (cityValid >= 2);
};
var totalRows = function () {
    total.innerHTML = row.length;
};
var render = function (store) {
    popTable(store);
    totalRows(store);
    average();
};
var popTable = function (store) {
    tableBody.innerHTML = '';
    for (var i = 0; i < store.length; i++) {
        var data = store[i];
        createRow(data);
    }
};
addBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var data = getValues();
    if (namesValid() && citiesValid() && starsValid()) {

            codeAddress();
            store.push(data);
            render(store);
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

//----------------------------REMOVE--------------------------//
tableBody.addEventListener("click", function (event) {
    if (isRmvBtn(event.target)) {
        removeRow(event.target);
    }
});
var isRmvBtn = function (target) {
    return target.classList.contains("rmvBtn");
};
var getBtnIndex = function (target) {
    var tr = target.parentNode.parentNode;
    var allTrs = tableBody.getElementsByTagName('tr');
    allTrs = [].slice.call(allTrs);
    return index = allTrs.indexOf(tr);
};
var removeRow = function (target) {
    var index = getBtnIndex (target);
    removeFromStore(store, index);
    render(store);
    removeMarker();
};
var removeFromStore = function (store, index) {
    store.splice(index, 1);
};

//------------------------MAP-------------------------//

//Here is your API key
//AIzaSyAorlvqdz5vGHbc_1MglL59zfOLrYzmzcY


var geocoder;
var map;
var markers = [];
var autocomplete;

function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(44.4268, 26.1025);
    var mapOptions = {
        zoom: 5,
        center: latlng
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

}
initialize();
function codeAddress() {
    var address = city.value;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            markers.push(marker);

        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}
function removeMarker() {
    markers[index].setMap(null);
}
autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */ (
        document.getElementById('inputCity')), {
        types: ['(cities)']
    });
places = new google.maps.places.PlacesService(map);
