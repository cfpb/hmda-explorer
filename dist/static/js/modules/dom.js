// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  // DOM Interactions
  // ----------------
  // jQuery is used to attach event handlers to DOM elements.

  // Toggle the popular/all filters sections  

  $('#section-toggle a').on( 'click', function( ev ){

    ev.preventDefault();

    var targetSection = $( this ).attr('href').replace('#', '');

    pdp.observer.emitEvent( 'navigation:clicked', [ targetSection ] );

  });

  // Whenever a field element is changed emit an event.

  $('.field select, .field input').on( 'change', function(){

    pdp.observer.emitEvent('field:changed', [ $( this ).attr('id') ] );

  });

  // Hijack the submit button.

  $('form#explore').on( 'submit', function( ev ){

    var url = pdp.query.generateApiUrl();

    ev.preventDefault();

    //window.location.href = url;

    window.open( url , '_blank' );

  });

  // Open and close filters

  $('.filter .title').on( 'click', function( ev ){

    var id = $( this ).parents('.filter').attr('id'),
        $el = $('#' + id);

    ev.preventDefault();

    if ( $el.hasClass('closed') ) {

      pdp.form.showFilter( $el );

    } else {

      pdp.form.hideFilter( $el );

    }

  });

  // When the format is changed, updated `query.format` and the share URL.

  $('#format').on( 'change', function(){

    pdp.query.format = $( this ).val();

    pdp.form.updateShareLink();

  });

  // When the share URL text box is focused, select all the text inside.
  // `click` is used instead of `focus` due to a [Chrome bug](http://stackoverflow.com/questions/3150275/jquery-input-select-all-on-focus).

  $('#share_url').on( 'click', function(){

    $( this ).select();

  });

  // For now, open a new window with the shareable URL when the share
  // button is clicked.
  /*
  $('#share').on( 'click', function(){

    window.open( $('#share_url').val() , '_blank' );

  });
  */

  // When the DOM is Ready
  // ----------------

  $(function() {

    pdp.observer.emitEvent('dom:loaded');

  });

  return pdp;

}( PDP || {} ));
