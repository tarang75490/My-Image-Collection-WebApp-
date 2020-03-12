
$(document).ready(function(){
    if(localStorage.getItem('token')){
        window.setTimeout(function() {
            window.location.href = 'http://localhost:3000';
        }, 0000);
    }

     $('#login-form').submit(function(e){
                 e.preventDefault();
                 var data = {       
                     password: $('#pwd').val(),
                     email: $('#email').val()
                 }
             $.ajax({
                     url:"http://localhost:3000/users/login",
                     method:'POST',
                     contentType:"application/json",
                     dataType:"json",
                     data:JSON.stringify(data),
                     success: function(data){
                        console.log(data);
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('name', data.user.name);
                        window.setTimeout(function() {
                            window.location.href = 'http://localhost:3000';
                        }, 100);
                     },
                     error: function(error){
                         console.log(error)
                     }
            
                 });
             })
 
    
 
     
             
     })