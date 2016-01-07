$(document).ready(function() {
    $('form').submit(onSubmit);
    drawTable(store);
});
//------------------------SUBMIT FORM-------------------------------------//
var onSubmit = function(){
    var data = {
        city: $('input[name="city"]').val(),
        visited: $('input[name="visited"]').is(":checked"),
        stars: 5
    };
    store.add(data).then(function() {
        drawTable(store);
    });
    $('#inputCity').val('');

    return false;
};
//---------------------------------ADD ROWS-------------------------------------//
var drawTable= function(store) {
    $('table').find('tbody').empty();
    store.getAll().then(function(data) {
        $.each(data, function() {
           var tr = (tmpl("tpl", this));
            $('table').find('tbody').append(tr);
        });
        attachEvents();
    });
};
var attachEvents = function(){
    $('table a.delete').click( function(){
        var id = $(this).closest('tr').data('id');
        store.delete(id).then(function() {
                drawTable(store);
            });
        return false;
    });
};