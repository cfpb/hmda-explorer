var PDP = (function ( pdp ) {

  'use strict';

  // DOM Interactions
  // ----------------
  // A place for misc. event handlers.

  // Toggle the popular/all filters sections
  $('a.section-toggle').on( 'click', function( ev ){

    var targetSection = $( this ).attr('href').replace('#', '');

    ev.preventDefault();
    pdp.observer.emitEvent( 'navigation:clicked', [ targetSection ] );

  });

  // Check for year based anomalies
  $('.field.as_of_year').on( 'change', _.debounce(function( ev ){

    var years = $('.field.as_of_year select').val();

    // Check for year-based rules
    pdp.form.checkYearRules(years);

  }, 100));

  // Highlight the MSA message
  $('#location').on( 'click', '#highlight-msa-note', function( ev ){
    ev.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 100);
    $('#msa-note .highlight').addClass('highlight-msa');
  });

  // Act appropriately when suggested filter sets are changed.
  $('.field.suggested').on( 'change', _.debounce(function( ev ){

    var $field = $('.field.suggested select'),
        preset = $field.val(),
        parents;

    ev.preventDefault();

    // Log event to GA
    //track( 'Page Interaction', 'Filters', preset );

    if ( preset === 'custom' ) {
      return;
    } else if ( preset === 'default' ) {
      pdp.query.reset();
    } else {
      pdp.query.reset( preset );
    }

    pdp.form.resetFields();
    pdp.form.setFields();
    pdp.form.showSections();
    pdp.form.updateShareLink();

  }, 100));

  // Whenever a field element is changed emit an event.
  $('.filter').on( 'change', '.field select, .field:not(.optional-toggle) input', _.debounce(function(){

    var name,
        value = $('#suggested').val(),
        isSuggestedField = $( this ).parents('.field').hasClass('suggested') || $( this ).parents('.field').hasClass('as_of_year'),
        isCustomAlreadyChosen = value === 'custom';

    pdp.observer.emitEvent('field:changed', [ $( this ).attr('id') ] );

    // Select the 'custom' suggestion if the field they're changing is NOT
    // the suggestion dropdown and the 'custom' suggestion isn't already chosen.
    if ( !isSuggestedField && !isCustomAlreadyChosen && value ) {
      name = $('.field.suggested select').find('option[value=' + $('.field.suggested select').val() + ']').text();
      name = name ? name + ' (modified)' : 'User modified (see filters below)';
      pdp.form.setCustom( name );
      pdp.form.selectCustom();
    } else if ( isSuggestedField ) {
      pdp.form.removeCustom();
    }

  }, 300 ));

  // Add a new location section whenever the `#add-state` link is clicked.
  $('a#add-state').on( 'click', function( ev ){

    ev.preventDefault();
    pdp.form.locationCount++;
    pdp.form.locationSetNum++;
    pdp.form.addState( pdp.form.locationSetNum );
    if ( pdp.form.locationCount >= pdp.form.maxNumLocations ) {
      $('a#add-state').hide();
    }

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
        showCodes = !!parseInt( $('.codes input[type=radio]:checked').val(), 10 ),
        url = pdp.query.generateApiUrl( format, showCodes ) + '&$limit=0',
        codeStatus = 'labels';

    if( showCodes ){
      codeStatus = 'core';
    }

    if( pdp.form.checkStatic( codeStatus, format ) ){
      url = pdp.form.checkStatic( codeStatus, format );
    }

    // Log event to GA
    //track( 'downloads', 'HMDA raw data', 'filter-page:' + url );

    ev.preventDefault();
    pdp.app.redirect( url );

  });

  // Hijack the 'download raw data' button on the summary table page.
  $('#download-raw-button').on( 'click', function( ev ){
    var format = $('#format').val(),
        showCodes = !!parseInt( $('.codes input[type=radio]:checked').val(), 10 ),
        url = pdp.query.generateApiUrl( format, showCodes ) + '&$limit=0',
        codeStatus = 'labels';

    if( showCodes ){
      codeStatus = 'core';
    }

    if( pdp.form.checkStatic( codeStatus, format ) ){
      url = pdp.form.checkStatic( codeStatus, format );
    }

    // Log event to GA
    //track( 'downloads', 'HMDA raw data', 'summary-table-page:' + url );

    ev.preventDefault();
    pdp.app.redirect( url );

  });

  // Hijack the summary table submission.
  $('#download-summary-button').on( 'click', function( ev ){

    var format = $('#summary-table-format').val(),
        showCodes = true,
        url = pdp.query.generateApiUrl( format, showCodes, pdp.summaryTable.queryParams ) + '&$limit=0';

    ev.preventDefault();
    pdp.app.redirect( url );

  });

  // When the codes/no codes toggle is changed, update the filesize preview.
  $('#download .codes input').on( 'change', function( ev ){

    pdp.query.codes = !!parseInt( $('.codes input[type=radio]:checked').val(), 10 );
    pdp.preview.updateDownloadSize();

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

  // Let user deselect the rate spread radios
  $('input[name=rate_spread]').on( 'click', function( ev ) {
    var $this = $( this );
    if ( $this.hasClass('rate-checked') ) {
      $this.prop( 'checked', false ).trigger('change');
      $('input[name=rate_spread]').removeClass('rate-checked');
    } else {
      $('input[name=rate_spread]').removeClass('rate-checked');
      $this.addClass('rate-checked');
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

  // When a link pointing to the download section is clicked, jump the user there (to the bottom of the page).
  $('a[href=#download]').on( 'click', function( ev ){

    ev.preventDefault();
    $('html, body').animate({ scrollTop: $( document ).height() }, 100);

  });

  // Clear fields and scroll to the top of the filters page.
  $('a.reset').on( 'click', function( ev ){

    ev.preventDefault();

    pdp.form.hideSections();
    $.removeCookie('_hmda');
    pdp.query.reset();
    pdp.form.resetFields(true);
    pdp.form.setFields();
    pdp.form.updateShareLink();
    pdp.preview.update();
    $('.field.suggested select').val('default').trigger('liszt:updated');

  });

  // Set fields to default values and scroll to the top of the filters page.
  $('a.reset-default').on( 'click', function( ev ){

    ev.preventDefault();

    pdp.form.resetFields();
    pdp.query.reset( { defaults: true } );
    pdp.form.setFields();
    pdp.form.updateShareLink();

    var parents = _.map( $('select[data-dependent], input[data-dependent]'), function( el ){
      return $( el ).attr('id');
    });
    pdp.form.checkDeps( parents );

    pdp.preview.update();

  });

  // Prevent non-numeric characters from being typed into specified fields.
  $('.require-numeric').on( 'keydown', pdp.utils.requireNumeric );

  $('.check-range').on( 'change', function( e ){

      var $this = $( this ),
          $min = $this.find('.min-value'),
          $max = $this.find('.max-value');

      if ( $min.val() && $max.val() && parseInt( $min.val(), 10 ) > parseInt( $max.val(), 10 ) ) {
        e.preventDefault();
        $max.tooltip( { title: 'Maximum amount must be greater than or equal to the minimum amount', trigger: 'manual' } );
        $max.tooltip( 'show' );
        $max.val('');
        setTimeout( function(){
          $max.tooltip('destroy');
        }.bind( this ), 5000);
      }
    });

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
