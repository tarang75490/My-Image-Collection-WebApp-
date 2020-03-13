$(document).ready(function(){
    console.log(window.location.href)
    if (localStorage.getItem('token')){
        $(".alert-1").css("display","block");
        $(".alert-2").css("display","none");
    }
    else{
        $(".alert-1").css("display","none");
        }
        // console.log(window.history.back())
    }
    
    )