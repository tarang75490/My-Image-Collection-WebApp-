
$(document).ready(function(){
    function read(){
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
         
         $.ajax({
             url:"/users/me",
             method:'get',
             dataType:'json',
            //  headers    :JSON.stringify({Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTY3MWE2ODcwN2RkNDRlNWNlMGMzZWMiLCJpYXQiOjE1ODM4MTY0Mzl9.fj4p2P0bR0XxQeuI9KbI8siz-pdOkjsMSKzjCOmBXdw"}),
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Bearer "+localStorage.getItem('token') );
              }, 
            success: function(item){
                    console.log(item)
                     myhtml = `
                     <div><h3>Name  : ${item.user.name}</h3> </div>
                     <div><h3>Age : ${item.user.age}</h3> </div>
                     <div><h3>Phone Number :${item.user.phone_number}</h3> </div>
                     <div><h3>Email : ${item.user.email}</h3> </div>
                     <div><h3>Password : ${item.user.password}</h3> </div>
                     `;
                     $('#profile-content').html(myhtml);
                     myhtml=``;
                     $(item.images).each(function(i,img){
                        var title1 = camelize(img.title)
                        myhtml += `<div class="col-md-4">
                                     <div class="thumbnail">
                                         <img src=${img.image} alt=${title1} style="width:100%">
                                            <div class="caption">
                                             <p id="img_caption">${title1}</p>
                                            </div>
                                     </div>
                                </div>`;
                     })
                     $('#imagess').html(myhtml);
             },
             error: function(data){
                 $('#profile-content').html(`<h1>Not Authenticated</h1>`);
             }
         })
     }
     read();
             
 
    //  $('#but2').click(function(){
                 
    //          $.ajax({
    //                  url:"http://localhost:3000/users/5e646ac1f4c5a34790d99d8d",
    //                  method:'DELETE',
    //                  contentType:"application/json",
    //                  dataType:"json",
    //                  success: function(response){
    //                     console.log(response);
    //                  },
    //                  error: function(error){
    //                      console.log(error)
    //                  }
            
    //              });})
 
 
     
             
     })