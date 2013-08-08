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

  $('.section-toggle a').on( 'click', function( ev ){

    ev.preventDefault();

    var targetSection = $( this ).attr('href').replace('#', '');

    pdp.observer.emitEvent( 'navigation:clicked', [ targetSection ] );

  });

  // Whenever a field element is changed emit an event.

  $('.filter').on( 'change', '.field select, .field input', function(){

    pdp.observer.emitEvent('field:changed', [ $( this ).attr('id') ] );

  });

  // Add a new location section whenever the `#add-state` link is clicked.

  $('a#add-state').on( 'click', function( ev ){

    var numLocations = $('#location-sets .location-set').last().data('location-num');

    ev.preventDefault();

    pdp.form.addState( ++numLocations );

  });

  // Co-applicant toggle.

  $('.include_co_applicant input').on( 'change', function(){

    if ( +$('.include_co_applicant input:checked').val() ) {
      pdp.form.toggleCoApplicants( 'show' );
    } else {
      pdp.form.toggleCoApplicants( 'hide' );
    }

  });

  // Hijack the submit button.

  $('form#explore').on( 'submit', function( ev ){

    var format = $('#format').val(),
        url = pdp.query.generateApiUrl( format );

    ev.preventDefault();

    pdp.app.redirect( url );

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

  // Open and close preview section

  $('.preview .title').on( 'click', function( ev ){

    var id = $( this ).find('a').attr('href'),
        $el = $( id ),
        $container = $el.parent('.preview');

    ev.preventDefault();

    if ( $container.hasClass('closed') ) {

      $el.slideDown( 250 );
      $container.removeClass('closed');

    } else {

      $el.slideUp( 150 );
      $container.addClass('closed');

    }

  });

  // When the format is changed, updated `query.format` and the share URL.

  $('#format').on( 'change', function(){

    pdp.query.format = $( this ).val();

  });

  // When a link pointing to the download section is clicked, jump the user there.

  $('a[href=#download]').on( 'click', function( ev ){

    ev.preventDefault();

    $('html, body').animate({ scrollTop: $( document ).height() }, 100);

  });

  // Clear fields and scroll to the top of the filters page.

  $('a.reset').on( 'click', function( ev ){

    ev.preventDefault();

    pdp.form.resetFields();
    pdp.query.reset( { empty: true } );
    pdp.form.updateShareLink();

    var parents = _.map( $('select[data-dependent], input[data-dependent]'), function( el ){
      return $( el ).attr('id');
    });

    pdp.form.checkDeps( parents );

    $('html, body').animate({ scrollTop: $( '#filters' ).position().top }, 200);

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
