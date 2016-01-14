var $form = $('#the-form');
var $table = $('#the-table');
var $tbody = $table.find('tbody');
var editingItem = null;
var page = 1;
var totalPages = 1;
var sortField = 'name';
var sortDir = 'asc';

var drawTable = function(store) {

    store.getAll(page,sortField,sortDir).then(function(data){
        $tbody.empty();
        $.each(data.list, function() {
            var tr = (tmpl("tpl", this));
            $tbody.append(tr);
        });
        totalPages = data.totalPages;
        $('#page').text(page);
        $('#totalPages').text(totalPages);
        attachTableEvents();
    });
};

var onSubmit = function() {
    var formData = {
        name: $('input[name="city"]').val(),
        visited: $('input[name="visited"]').is(":checked") ? 1 : 0,
        stars: parseInt($('input[name="stele"]').val(), 10)
    };

    if (editingItem) {
        store.update(editingItem.id,formData).then(function() {
            $form.removeClass("editing");
            drawTable(store);
        });
    } else {
        store.add(formData).then(function() {
            drawTable(store);
        });
    }
    resetForm();

    return false;
};

var attachTableEvents = function() {
    $tbody.find('a.delete').click(deleteClicked);
    $tbody.find('a.edit').click(editClicked);
    showGiphy();
};

var deleteClicked = function() {
    var id = $(this).closest('tr').data('id');

    store.delete(id).then(function() {
        drawTable(store);
    });

    return false;
};

var editClicked = function() {
    $form.addClass("editing");
    var id = $(this).closest('tr').data('id');

    store.get(id).then(function(data) {
        editingItem = data;
        $('input[name="city"]').val(data.name);
        $('input[name="visited"]').prop("checked", data.visited);
        $('input[name="stele"]').val(data.stars).change();

        return false;
    });

    return false;
};

var cancelClicked = function (){
    $form.removeClass("editing");
    resetForm();

    return false;
};

var resetForm = function (){
    $('#inputCity').val('');
    $('input[name="stele"]').val('').change();
    $('input[name="visited"]').prop('checked', false);
    editingItem = null;
};

var nextClicked = function(){
    if (page < totalPages) {
        page++;
        drawTable(store);
    }

    return false;
};

var prevClicked = function() {
    if (page > 1) {
        page--;
        drawTable(store);
    }

    return false;
};

var sortHeaderClicked = function (){
    $(this).find('i').removeClass("fa-sort-asc").addClass("fa-sort");
    sortField = $(this).data('field');
    //sortDir = $(this).data('dir');

console.log(this)
    drawTable(store);



    //ternary operators in care selectez toate linkurile si intai le fac pe
    // toate la fel sagetele si apoi ii setez sageata aleia pe care sunt
    //if (sortDir == 'desc' && sortField) {
    //    sortDir = 'desc';
    //    $(this).find('i').removeClass("fa-sort").addClass("fa-sort-desc");
    //    drawTable(store);
    //} else if (sortDir == 'asc' && sortField){
    //    sortDir = 'asc';
    //    $(this).find('i').removeClass("fa-sort").addClass("fa-sort-asc");
    //    drawTable(store);
    //    console.log('cevaaa')
    //}
};

var showGiphy = function(){
    $('.city-name').click(function(){
        var cityName = $(this).closest("td").text();
        console.log(cityName)
    });

};

//var getGiphy = function (id) {
//    return new Promise(function (resolve, reject) {
//        $.ajax(entriesUrl + "/" + id, {
//            type: 'GET',
//            headers: headers,
//            data: JSON.stringify(id)
//        }).done(function (data) {
//            resolve(data);
//        }).fail(error);
//    });
$(document).on("ajaxSend", function(){
    $("#loading").show();
    $("input").prop("disabled", true);
}).on("ajaxComplete", function(){
    $("input").prop("disabled", false);
    $("#loading").hide();
});

$(document).ready(function() {
    $form.submit(onSubmit);
    $form.find('a.cancel').click(cancelClicked);
    $('[name="stele"]').stars();
    $('a.previous').click(prevClicked);
    $('a.next').click(nextClicked);
    $table.find('.sortable').click(sortHeaderClicked);
    drawTable(store);
});


