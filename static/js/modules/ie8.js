$(function(){

  'use strict';

  // Close video overlay
  $( 'section.video .exit, #youtube' ).on( 'click', function( ev ) {

      ev.preventDefault();
      window.location.reload( true );
      window.location.hash = '';

  });

  $( document ).on( 'keyup', function( ev ) {

    if ( ev.which === 27 ) {
      ev.preventDefault();
      window.location.reload( true );
      window.location.hash = '';
    }

  });

});
