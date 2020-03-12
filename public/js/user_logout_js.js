
$(document).ready(function(){
    $('#user-logout').click(function(e){
                e.preventDefault();
            $.ajax({
                    url:"http://localhost:3000/users/logoutAll",
                    method:'POST',
                    dataType:"json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader ("Authorization", "Bearer "+localStorage.getItem('token') );
                      }, 
                    success: function(response){
                       console.log(response);
                       localStorage.setItem('token', '');
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