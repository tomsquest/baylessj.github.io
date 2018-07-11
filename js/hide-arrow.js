$(document).ready(function(){
    $(window).scroll(function () {
      let h = $(this).scrollTop() * 100 / $(window).height();
      if(h <= 50) {
         $('.page-down').fadeIn();
      }
      else {
        $('.page-down').fadeOut();
      }
    });
});
