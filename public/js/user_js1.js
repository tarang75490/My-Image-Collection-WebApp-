
$(document).ready(function(){
    if(localStorage.getItem('token')){
        window.setTimeout(function() {
            window.location.href = 'http://localhost:3000';
        }, 0000);
    }

    $('#form1').submit(function(e){
                e.preventDefault();
                var data = {
                    name: $('#name').val(),
                    password: $('#pwd').val(),
                    email: $('#email').val(),
                    phone_number: $('#phno').val(),
                    age: $('#age').val()
                }
            console.log(data)
            $.ajax({
                    url:"http://localhost:3000/users",
                    method:'POST',
                    contentType:"application/json",
                    dataType:"json",
                    data:JSON.stringify(data),
                    success: function(response){
                       console.log(response);
                       localStorage.setItem('token', response.token);
                       localStorage.setItem('name', response.user.name);
                       window.setTimeout(function() {
                        window.location.href = 'http://localhost:3000';
                    }, 100);
                    },
                    error: function(error){
                        console.log(error)
                    }
           
                });

                
            })

    // $('#but2').click(function(){
                
    //         $.ajax({
    //                 url:"http://localhost:3000/users/5e646ac1f4c5a34790d99d8d",
    //                 method:'DELETE',
    //                 contentType:"application/json",
    //                 dataType:"json",
    //                 success: function(response){
    //                    console.log(response);
    //                 },
    //                 error: function(error){
    //                     console.log(error)
    //                 }
           
    //             });})


    
            
    })