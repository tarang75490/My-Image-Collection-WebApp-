var image ;
var counter = 1
var tags = []
var skip = 0
var sortBy="title"
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      image = reader.result
      $('#image-preview').html(`<h2>Image Preview</h2><img src=${image} style="width:40%">`)
    }
    reader.readAsDataURL(file);
}

$(document).ready(function(){
    console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token')){
        $("#upload-but").attr("disabled", false);
        $(".alert").css("display", "none");
        $("#form2 :input").prop("disabled", false);
        
    }
    else{
        $("#upload-but").attr("disabled", true);
        $("#form2 :input").prop("disabled", true);
        $(".alert").css("display", "block");
    }
    function camelize(str) {
        // Split the string at all space characters
        return str.split(' ')
           // get rid of any extra spaces using trim
           .map(a => a.trim())
           // Convert first char to upper case for each word
           .map(a => a[0].toUpperCase() + a.substring(1))
           // Join all the strings back together
           .join(" ")
     }
    function read_images(data,skip,sortby){
        var myhtml2 = '';
        console.log(data,skip)
        $('#imagess').html('');

        $.ajax({
            url:"http://localhost:3000/image/filter?limit=8&skip="+skip+"&sortby="+sortby,
            method:'POST',
            contentType:'application/json',
            dataType:'json',
            data:JSON.stringify(data),
            success: function(data){
                $(data).each(function(i,item){
                    // console.log(item)
                    var title1 = camelize(item.title)
                    console.log(title1)
                    myhtml2 += `<div class="col-md-4">
                                     <div class="thumbnail">
                                         <img src=${item.image} alt=${title1} style="width:100%">
                                            <div class="caption">
                                             <p id="img_caption">${title1}</p>
                                            </div>
                                     </div>
                                </div>`;

                    $('#imagess').html(myhtml2);
                })
            },
            error: function(data){
                prompt('Error in uploading!!! \nTry Another Image!!!! \nFile is Too lARGE  ');
            }
        })
    }
    $( document ).ready(function(){
        var data ={}
        read_images(data,0,sortBy)} );
    // read_images();
    $('#filter').on('change',function(){
        if (($('#filter').val()) == ''){
            var data ={}
        }
        else{
        var data ={
            tags:{$in:[($('#filter').val()).toLowerCase()]}
        }
    }
        console.log(data)
        read_images(data,0,sortBy)
    });  
    $('.page-link1').click(function(){
        skip =  ($('.page-link1').text()-1)*8
        read_images({},skip)
    })
    $('.page-link2').click(function(){
        skip =  ($('.page-link2').text()-1)*8
        read_images({},skip)
    })
    $('.page-link3').click(function(){
        skip =  ($('.page-link3').text()-1)*8
        read_images({},skip)
    })
         
    $('#1').click(function(){
        sortBy='title'
        read_images({},skip,sortBy)
    })
    $('#2').click(function(){
        sortBy='-title'
        read_images({},skip,sortBy)
    })
    $('#3').click(function(){
        sortBy='createdAt'
        read_images({},skip,sortBy)
    })
    $('#4').click(function(){
        sortBy='-createdAt'
        read_images({},skip,sortBy)
    })



    $('#form2').submit(function(e){
        e.preventDefault();
            var data = {
                title: $('#title').val().toLowerCase(),
                image:image,
                tags:tags
                }
        console.log(localStorage.getItem('token'))
        tags.push(data.title.toLowerCase())
        $.ajax({
                url:"http://localhost:3000/image",
                method:'POST',
                contentType:"application/json",
                dataType:"json",//"text" -- to accept string response
                data:JSON.stringify(data),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "Bearer "+localStorage.getItem('token') );
                  }, 
                success: function(response){
                  console.log(response);
                  window.setTimeout(function() {
                    window.location.href = 'http://localhost:3000/img';
                }, 100);
                    },
                error: function(error){
                    alert("Error in uploading!!! \nTry Another Image!!!! \nFile is Too lARGE  ");               
                    //  $('#form2')[0].reset();  --->  only for form refresh
                    window.location.reload(true); // ---->    for whole page refresh on an event 
                    }
                });
        });
    $('#tagbut').click(function(){
        if(!$("#"+counter+"").val()){
            alert('Fill the tag')
        }else{
            tags.push($("#"+counter+"").val().toLowerCase())
            console.log(tags)
        counter += 1
        myhtml = `<div  class="col-xs-3">
                        <input type="text" class="form-control" id="`+counter+`" name="title">
                    </div>`
        $('#tags').append(myhtml)
        }
    })
             
    })