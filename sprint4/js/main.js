$(document).ready(function() {
    $('form').submit(onSubmit);
    $('[name="stele"]').stars();
    drawTable(store);

});
//------------------------SUBMIT FORM-------------------------------------//
var onSubmit = function(){
    var data = {
        city: $('input[name="city"]').val(),
        visited: $('input[name="visited"]').is(":checked"),
        stars: $('input[name="stele"]').val()
    };
    store.add(data).then(function() {
        drawTable(store);
    });
    resetForm();
    $('form').trigger('reset');
    return false;
};
//---------------------------------DRAW TABLE-------------------------------------//
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
    $('a.delete').confirm({
        message: 'Are you sure?',
        onConfirm: function() {
            //$('table a.delete').click(function(){
                var id = $(this).closest('tr').data('id');
                store.delete(id).then(function() {
                    drawTable(store);
                });
                return false;
            //});
        },
        onReject: function() {
        }
    });
    var editedItem = null;

    $('a.edit').click(function () {
        var id = $(this).closest('tr').data('id');
        store.getAll().then(function (data) {
            $.each(data, function () {
                if (this.id == id) {
                    editedItem=this;
                    $('input[name="city"]').val(this.city);
                    $('input[name="visited"]').prop( "checked", this.visited );
                    $('input[name="stele"]').val(this.stars).change();
                    //console.log(id);
                }
            });
            return false;
        });
        $("a.cancel").show().click(function(){
            //$('form').trigger('reset');
            resetForm();
            $("a.cancel").hide();
            $(".update").hide();
            $(".save").show();
            //console.log(id)
        });
        $(".save").hide();
       $(".update").show().click(function(){
           var updateData = {
               city: $('input[name="city"]').val(),
               visited: $('input[name="visited"]').is(":checked"),
               stars: $('input[name="stele"]').val(),
               id:id
           };
           store.update(id,updateData).then(function() {
              drawTable(store);
           });
           $(".update").hide();
           $("a.cancel").hide();
           $(".save").show();
           resetForm();
           //$('form').trigger('reset');
           //console.log(id)
           return false;
       });
        return false;
    });
      return false;
};

var resetForm = function (){
    $('#inputCity').val('');
    $('input[name="stele"]').val('').change();
    $('input[name="visited"]').prop('checked', false);
};
