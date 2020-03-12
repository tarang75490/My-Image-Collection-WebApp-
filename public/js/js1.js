$(document).ready(function(){
    
    if (localStorage.getItem('token')){
    $("[href='/SignUp']").css('display','none')
    $("[href='/LogIn']").css('display','none')
    $("#user-logout").css('display','block')
        $("[href='/profile']").css('display','block')
        $("#show-name").html("Hello  "+localStorage.getItem('name'))
    }
    else{
        $("#user-logout").css('display','none')
        $("[href='/profile']").css('display','none')
        $("[href='/SignUp']").css('display','block')
        $("[href='/LogIn']").css('display','block')
        $("#show-name").html("")

    }
})