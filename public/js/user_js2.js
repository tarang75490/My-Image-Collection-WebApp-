
$(document).ready(function(){
    function read(){
        myhtml ="";
         $('#ul-body').html('');
         
         $.ajax({
             url:"/users",
             method:'get',
             dataType:'json',
             success: function(data){
                 $(data).each(function(i,item){
                    //  myhtml += `<tr>
                    //  <td>${item.name}</td>
                    //  <td>${item.age}</td>
                    //  <td>${item.phone_number}</td>
                    //  <td>${item.email}</td>
                    //  <td>${item.password}</td>
                    //  </tr>`;
                    myhtml += `      <div class="alert ">
                    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                <strong>${item.name}</strong> &emsp;  &emsp; ${item.age}<br>
                <span>${item.email}</span><br>
                <span>${item.phone_number}</span>
              </div><hr>`;
 
                     $('#list').html(myhtml);
                 })
             },
             error: function(data){
                 $('#table1body').html(data.statusText);
             }
         })
     }
     read();
 
     
             
     })