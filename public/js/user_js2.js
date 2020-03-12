
$(document).ready(function(){
    function read(){
        myhtml ="";
         $('#table1body').html('');
         
         $.ajax({
             url:"http://localhost:3000/users",
             method:'get',
             dataType:'json',
             success: function(data){
                 $(data).each(function(i,item){
                     myhtml += `<tr>
                     <td>${item.name}</td>
                     <td>${item.age}</td>
                     <td>${item.phone_number}</td>
                     <td>${item.email}</td>
                     <td>${item.password}</td>
                     </tr>`;
 
                     $('#table1body').html(myhtml);
                 })
             },
             error: function(data){
                 $('#table1body').html(data.statusText);
             }
         })
     }
     read();
 
     
             
     })