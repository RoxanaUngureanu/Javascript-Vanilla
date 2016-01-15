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
        $.each(data.list, function(index,element) {
            var tableStars = "";
            for (i = 1; i <= element.stars; i++) {
                tableStars = tableStars + '<span class="star hover">★</span>';
            }
            var tableVisited = element.visited == 1?
                '<span class="glyphicon glyphicon-ok"></span>':
                '<span class="glyphicon glyphicon-remove"></span>';
            var tr = (tmpl("tpl", {
                id: element.id,
                name: element.name,
                stars: tableStars,
                visited: tableVisited
            }));
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
    $table.find('.sortable i')
        .removeAttr("class")
        .attr("class","fa fa-fw fa-sort");
    sortField = $(this).data('field');

    if (sortDir == 'asc'){
        sortDir = 'desc';
        $(this).find('i')
            .removeAttr("class")
            .attr("class","fa fa-fw fa-sort-desc");
    } else {
        sortDir='asc';
        $(this).find('i')
            .removeAttr("class")
            .attr("class","fa fa-fw fa-sort-asc");
    }
    drawTable(store);
};

var showGiphy = function(){
    $('.city-name').click(function(){
        var cityName = $(this).closest("td").text();
        var giphyURL = "http://api.giphy.com/v1/gifs/search?q=";
        var giphyKey = "&api_key=dc6zaTOxFJmzC";

        $.get(giphyURL + cityName + giphyKey, {
            }).done(function (data) {

                if (data.data[0]){
                    $('#giphy').show();
                    $('#giphy-img')
                        .attr('src',data.data[0].images.downsized.url);
                }else{
                    $('#giphy').show();
                    $('#giphy-img')
                        .attr('src','https://media.giphy.com/media/Rkis28kMJd1aE/giphy.gif');
                    alert("Sorry, we didn't find any GIFs");
                }
            });

            return false;
        });

    $(".close-giphy").click(function() {
        $("#giphy").hide();
        $('#giphy-img').removeAttr('src');
    });
};
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


