
$(document).ready(function(){
    $(".closebtn").click(function(){
        window.location.reload(true);
    })
    $('#user-logout').click(function(e){
                e.preventDefault();
            $.ajax({
                    url:"/users/logoutAll",
                    method:'POST',
                    dataType:"json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader ("Authorization", "Bearer "+localStorage.getItem('token') );
                      }, 
                    success: function(response){
                       console.log(response);
                       localStorage.setItem('token', '');
                       window.setTimeout(function() {
                           window.location.href = '/home';
                       }, 100);
                    },
                    error: function(error){
                        console.log(error)
                    }
           
                });
            })

   

    
            
    })