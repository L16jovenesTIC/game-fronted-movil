define(['jqueryMobile'], function(){
  return function(){
   $(document).ready(function() {  
          //add your other targets here
       $(".carousel").swiperight(function() {  
          $(this).carousel('prev');  
          });  
      //add your other targets here
       $(".carousel").swipeleft(function() {  
          $(this).carousel('next');  
     });  
  });  
 }
})