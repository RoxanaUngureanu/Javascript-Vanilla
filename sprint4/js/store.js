var store = (function () {
    // private

    var entriesUrl = "http://server.godev.ro:8080/api/roxanau/entries";
    var headers = {
        'Content-Type': 'application/json'
    };

    var error = function(jqXHR){

        if (jqXHR.status === 409){

            alert(jqXHR.responseJSON.error);

        } else {

            alert("Error unknown");
        }
    };

    return {
        getAll: function (page) {
            return new Promise(function (resolve, reject) {
                $.ajax(entriesUrl + "?page=" + page, {
                    type: 'GET',
                    headers: headers
                }).done(function (data) {
                    resolve(data);
                }).fail(error);
            });
        },
        get: function (id) {
            return new Promise(function (resolve, reject) {
                $.ajax(entriesUrl + "/" + id, {
                    type: 'GET',
                    headers: headers,
                    data: JSON.stringify(id)
                }).done(function (data) {
                    resolve(data);
                }).fail(error);
            });
        },
        add: function (item) {
            return new Promise(function (resolve, reject) {
                    $.ajax(entriesUrl, {
                        type: 'POST',
                        headers: headers,
                        data: JSON.stringify(item)
                    }).done(function (data) {
                        resolve(data);
                    }).fail(error);
            });
        },
        update: function (id, updateData) {
            return new Promise(function (resolve, reject) {
                $.ajax(entriesUrl + "/" + id, {
                    type: 'PUT',
                    headers: headers,
                    data: JSON.stringify(updateData)
                }).done(function (data) {
                    resolve(data);
                }).fail(error);
            });
        },
        delete: function (id) {
            return new Promise(function (resolve, reject) {
                $.ajax(entriesUrl + "/" + id, {
                    type: 'DELETE',
                    headers: headers
                }).done(function () {
                    resolve();
                }).fail(error);
            });
        }
    };
})();

$(document).on("ajaxSend", function(){
    $("#loading").show();
    $("input").prop("disabled", true);
}).on("ajaxComplete", function(){
    $("input").prop("disabled", false);
    $("#loading").hide();
});