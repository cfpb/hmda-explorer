$(function(){

  'use strict';

  window.mapboxIE8 = true;

  // Close video overlay
  $( 'section.video .exit, #youtube' ).on( 'click', function( ev ) {

      ev.preventDefault();
      window.location.reload(true);

  });

  $( document ).on( 'keyup', function( ev ) {

    if ( ev.which === 27 ) {
      ev.preventDefault();
      window.location.reload(true);
    }

  });

});
