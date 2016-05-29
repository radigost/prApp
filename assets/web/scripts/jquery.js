$(document).ready(function() {

$(document).scroll(function () {

hh = $('#forh').height();

            var y = $(document).scrollTop(),
                header = $("#menu");
                
            if (y >= hh) {
                header.addClass('sticky');
            }
            else {
                header.removeClass('sticky');
            }
            
    
           var e = $(document).scrollTop(),
                sidemenu = $("#sidemenu");
            if (y >= 300) {
                sidemenu.addClass('stickyside');
            }
            else {
                sidemenu.removeClass('stickyside');
            }
  
    
        });
// $('textarea').trumbowyg();

});