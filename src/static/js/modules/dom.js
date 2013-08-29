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
  $('a.section-toggle').on( 'click', function( ev ){

    var targetSection = $( this ).attr('href').replace('#', '');

    ev.preventDefault();

    pdp.observer.emitEvent( 'navigation:clicked', [ targetSection ] );

  });

  // Whenever a field element is changed emit an event.
  $('.filter').on( 'change', '.field select, .field:not(".optional-toggle") input', _.debounce( function(){
    pdp.observer.emitEvent('field:changed', [ $( this ).attr('id') ] );
  }, 300 ));

  // Add a new location section whenever the `#add-state` link is clicked.
  $('a#add-state').on( 'click', function( ev ){

    var numLocations = $('#location-sets .location-set').last().data('location-num');

    ev.preventDefault();
    
    pdp.form.addState( ++numLocations );

  });

  // Co-applicant toggle.
  $('.optional-toggle input').on( 'change', function(){

    var section = $( this ).parents('.optional-toggle').data('optional');

    if ( +$( this ).val() ) {
      pdp.form.toggleOptional( section, 'show' );
    } else {
      pdp.form.toggleOptional( section, 'hide' );
    }

  });

  // Hijack the explore page form submission.
  $('form#explore').on( 'submit', function( ev ){

    var format = $('#format').val(),
        showCodes = !!parseInt( $('input[type=radio][name=codes]:checked').val(), 10 ),
        url = pdp.query.generateApiUrl( format, showCodes );

    ev.preventDefault();
    pdp.app.redirect( url );

  });

  // Hijack the summary table submission.
  $('#download-summary-button').on( 'click', function( ev ){

    ev.preventDefault();

    var format = $('#summary-table-format').val(),
        showCodes = true,
        url = pdp.query.generateApiUrl( format, showCodes, pdp.summaryTable.queryParams );

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

    var $container = $('.preview');

    ev.preventDefault();

    if ( !$( this ).hasClass('disabled') ) {

      if ( $container.hasClass('closed') ) {
        pdp.preview.showTable();
      } else {
        pdp.preview.hideTable();
      }

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

    pdp.preview.update();
    $('html, body').animate({ scrollTop: $( '#filters' ).position().top }, 200);

  });

  // Prevent non-numeric characters from being typed into specified fields.
  $('.require-numeric').on( 'keydown', pdp.utils.requireNumeric );

  // When the share URL text box is focused, select all the text inside.
  // `click` is used instead of `focus` due to a [Chrome bug](http://stackoverflow.com/questions/3150275/jquery-input-select-all-on-focus).
  $('.share_url').on( 'click', function(){
    $( this ).select();
  });

  // When the DOM is Ready
  // ----------------
  $(function() {
    pdp.observer.emitEvent('dom:loaded');
  });

  return pdp;

}( PDP || {} ));
