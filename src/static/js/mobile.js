$(function(){

  'use strict';

  var mobileNav = (function(){

    var $navicon = $('button.navicon'),
        $menu = $('.hmda header nav');

    return {

      open: function(){
        $navicon.addClass('open');
        $menu.slideDown( 200 );
      },

      close: function(){
        $menu.slideUp( 200, function(){
          $navicon.removeClass('open');
        });
      }

    };

  })();

  $('button.navicon').on( 'click', function(){
    
    if ( $( this ).hasClass('open') ) {
      mobileNav.close();
    } else {
      mobileNav.open();
    }
    
  });

});
