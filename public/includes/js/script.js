//For Searching

$(document).ready(function() {
    var len;
    $.ajax({
            method: "GET",
            url: 'http://localhost:8080/users',
            success: function(data) {
            }});
    $('#searchNext').hide();
    $('#prev').hide();
        $("#content").on('click', function() {
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/users/?q=" + $('#find').val(),
            dataType: 'json',
            success: function(data) {
                var t = '';
                $(data).each(function(i, item) {
                    t += '<tr><td id="id1">' + data[i].id + '</td>' + '<td id="name1">' + data[i].name + '</td>' + '<td id="gender1">' +
                        data[i].gender + '</td>' + '<td id="company1">' + data[i].company + '</td>' + '<td id="email1">' +
                        data[i].email + '</td>' + '<td>' + '<a href="#myModal1" role="button" data-toggle="modal"><button class="edit btn btn-primary"type="button" id="editId" ><span class="glyphicon glyphicon-edit"></span>  Edit</button></a>' +
                        '  ' + '<button class="delete btn btn-danger" type="button" id="deleteId"><span class="glyphicon glyphicon-trash"></span>  Delete</button>' + '</td></tr>'
                });
                $('#tblBody').empty();
                $('#searchNext').hide();
                $('#prev').hide();
                $('#tblBody').append(t);
            }
        });
    });

    //to view the data

    $("#tblData").on('click', function() {
        $('#searchNext').show();
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/users/?' + '&_limit=10',
            success: function(data) {
                var t = '';
                $(data).each(function(i, item) {
                    t += '<tr><td id="id1">' + data[i].id + '</td>' + '<td id="name1">' + data[i].name + '</td>' + '<td id="gender1">' +
                        data[i].gender + '</td>' + '<td id="company1">' + data[i].company + '</td>' + '<td id="email1">' +
                        data[i].email + '</td>' + '<td>' +
                        '<a href="#myModal1" role="button" data-toggle="modal"><button class="edit btn btn-primary"type="button" id="editId" ><span class="glyphicon glyphicon-edit"></span>  Edit</button></a>' +
                        '  ' + '<button class="delete btn btn-danger" type="button" id="deleteId"><span class="glyphicon glyphicon-trash"></span>  Delete</button>' + '</td></tr>'
                });
                $('#tblBody').empty();
                $('#prev').hide();
                $('#tblBody').append(t);
            }
        });
    });

    //Next 10 users data will be displayed
    var srt = 0;
    $("#searchNext").on('click', function() {
        $('#prev').show();
        srt = srt + 10;
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/users/?=&_start=' + srt + '&_limit=10',
            dataType: 'json',
            success: function(data) {
                var t = '';
                $(data).each(function(i, item) {
                    t += '<tr><td id="id1">' + data[i].id + '</td>' + '<td id="name1">' + data[i].name + '</td>' + '<td id="gender1">' +
                        data[i].gender + '</td>' + '<td id="company1">' + data[i].company + '</td>' + '<td id="email1">' +
                        data[i].email + '</td>' + '<td>' + '<a href="#myModal1" role="button" data-toggle="modal"><button class="edit btn btn-primary"type="button" id="editId" ><span class="glyphicon glyphicon-edit"></span>  Edit</button></a>' +
                        '  ' + '<button class="delete btn btn-danger" type="button" id="deleteId"><span class="glyphicon glyphicon-trash"></span>  Delete</button>' + '</td></tr>'
                });
                $('#tblBody').empty();
                $('#tblBody').append(t);

            },
            error: function(data) {
                console.log("Error");
            }
        });

    });

    //Previous 10 users data will be displayed
    $("#prev").on('click', function() {
        $('#searchNext').show();
        if (srt == 10) {
            $('#prev').hide();
        }

        srt = srt - 10;
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/users/?=&_start=' + srt + '&_limit=10',
            dataType: 'json',
            success: function(data) {
                var t = '';
                $(data).each(function(i, item) {
                    t += '<tr><td id="id1">' + data[i].id + '</td>' + '<td id="name1">' + data[i].name + '</td>' + '<td id="gender1">' +
                        data[i].gender + '</td>' + '<td id="company1">' + data[i].company + '</td>' + '<td id="email1">' +
                        data[i].email + '</td>' + '<td>' + '<a href="#myModal1" role="button" data-toggle="modal"><button class="edit btn btn-primary"type="button" id="editId" ><span class="glyphicon glyphicon-edit"></span>  Edit</button></a>' +
                        '  ' + '<button class="delete btn btn-danger" type="button" id="deleteId"><span class="glyphicon glyphicon-trash"></span>  Delete</button>' + '</td></tr>'
                });
                $('#tblBody').empty();
                $('#tblBody').append(t);
            },
            error: function(data) {
                console.log("Error");
            }
        });

    });


    //For addition

    $("#part2").on('click', '#add', function() {
        $("#formAdd").click(function() {
            var add = {
                //"id": $('#id').val(),
                "name": $('#name').val(),
                "gender": $('#gender').val(),
                "company": $('#company').val(),
                "email": $('#email').val()
            }
            $.ajax({
                url: 'http://localhost:8080/users',
                type: 'post',
                data: add,
                contentType: 'application/json',
                success: function(data) {
                    alert("added successfully");
                }
            })
        });
    });

    //For deletion

    $("#tbl").on('click', '.delete', function() {
        var i = $('td:first', $(this).parents('tr')).text();
        var a=$(this);
        console.log(i);
        $.ajax({
            url: 'http://localhost:8080/users/' + i,
            method: 'DELETE',
            success: function(data) {
                $(a).closest('tr').remove();
                alert("Deleted Successfully");
            }
        });
    });

    //For updating

    $("#tbl").on('click', '#editId', function() {
        var i = $('td:first', $(this).parents('tr')).text();
        var $tr = $(this).closest("tr");
        var name = $tr.find("#name1").text();
        var gender = $tr.find("#gender1").text();
        var company = $tr.find("#company1").text();
        var email = $tr.find("#email1").text();
        var obj = {};
        $('#name2').attr("placeholder", name);
        $('#gender2').attr("placeholder", gender);
        $('#company2').attr("placeholder", company);
        $('#email2').attr("placeholder", email);
        $("#formEdit").on('submit',function() {
            if (($('#name2').val() != '')) {
                obj["name"] = $('#name2').val();
                console.log($('#name2').val());
            } else {
                obj["name"] = name;
                console.log(name);
            }
            if (($('#gender2').val() != '')) {
                obj["gender"] = $('#gender2').val();
                console.log($('#gender2').val());
            } else {
                obj["gender"] = gender;
                console.log(gender);
            }
            if (($('#company2').val() != '')) {
                obj["company"] = $('#company2').val();
                console.log($('#company2').val());
            } else {
                obj["company"] = company;
                console.log(company);
            }
            if (($('#email2').val() != '')) {
                obj["email"] = $('#email2').val();
                console.log($('#email2').val());
            } else {
                obj["email"] = email;
                console.log(email);
            }
            $.ajax({
                url: 'http://localhost:8080/users/' + i,
                method: 'PATCH',
                data: obj,
                "content-Type": 'application/json',
                success: function(data) {
                    alert("Edited Successfully");
                }
            });
        });
    });
    /*function validateForm() {

        console.log("onsubmit");
    var isValid = false;
    $('#formAdd').on('click',function(e){
        e.preventDefault();
    if ( $('#name').val() != '' ){
        isValid = true;
    }
});
  return isValid;
}*/

});
