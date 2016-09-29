var PDP = (function ( pdp ) {

  'use strict';

  // The App Object
  // ----------------
  // The `app` object stores global app properties and methods.
  var app = {};

  // Our itty-bitty router.
  window.onhashchange = function(){
    // Change to the section in the URL and don't change the URL afterward.
    app.changeSection( app.getUrlValue('section'), false );
  };

  // Cache a reference to the app's jQuery object.
  app.$el = $('#filters');

  // The current section the user is viewing.
  app.currentSection = 'filters';

  // The `init` method is called when the DOM is loaded so we can do some preparation.
  app.init = function() {

    var hashParams = pdp.utils.getHashParams(),
        tooltipPlacement = $( window ).width() > 768 ? 'right' : 'left';

    // Turn on automatic storage of JSON objects passed as the cookie value.
    $.cookie.json = true;

    // Activate [chosen](http://harvesthq.github.io/chosen/) on select elements and correct 
    // a bug that cuts off the placeholder text.
    app.$el.find('select').chosen({ width: '100%', disable_search_threshold: 10, allow_single_deselect: true });
    $('.chzn-container .search-field input').css( 'width', '130%' );

    // Initialize Bootstrap tooltips
    app.$el.initTooltips({ placement: tooltipPlacement });
    app.$el.find('.share_url').tooltip({ title: 'Copied to clipboard!', trigger: 'manual' });

    // If there are hash params in the URL OR the only hashParam is to designate which section,
    // grab them and populate the DOM fields.
    if ( !_.isEmpty( hashParams ) ) {
      pdp.query.updateAll({ source: 'url' });
    // } else if ( !_.isEmpty( $.cookie('_hmda') ) ) {
    //   // Read from the cookie if it exists.
    //   pdp.query.updateAll({ source: 'session' });
    } else {
      // Clear out any cached values.
      pdp.query.reset();
    }

    // Give our app a special class.
    $('.app-section').addClass('ready');

    // Broadcast that the app is loaded and good to go.
    pdp.observer.emitEvent('app:ready');

  };

  // The `start` method is called when we're ready for the app to start chooglin'.
  app.start = function() {

    var parents,
        toggles;

    // Check if any state/msa sections need to be added.
    pdp.form.checkLocations();

    // Initialize the form.
    pdp.form.init();
    pdp.form.hideSections();

    // Pull any `param` entries into the DOM.
    pdp.form.setFields();

    // Check for year-based rules
    pdp.form.checkYearRules(pdp.query.params.as_of_year.values);

    // Check if any fields that were preloaded have dependents we need to show.
    parents = _.map( $('select[data-dependent], input[data-dependent]'), function( el ){
      return $( el ).attr('id');
    });
    pdp.form.checkDeps( parents );

    // Check if any fields that were preloaded have mutually exclusive fields that need to be disabled.
    toggles = _.map( $('select[data-toggle], input[data-toggle]'), function( el ){
      return $( el ).attr('id');
    });
    pdp.form.checkMutuallyExclusive( toggles );

    // Check if any filter sections are hiding fields with values.
    pdp.form.checkFilters();

    // Hide the preview table.
    $('#preview').hide();

    // Change sections if necessary.
    app.changeSection( app.currentSection, false );

    // Switch it into custom mode if need be.
    if ( !_.isEmpty( pdp.utils.getHashParams() ) ) {
      $('.field.suggested select').val('custom').trigger('liszt:updated');
      pdp.form.showSections();
    }

    // Broadcast that the app has started.
    pdp.observer.emitEvent('app:started');

  };

  // The `startLoading` method adds a class to the app's element so we can
  // visualize the loading of content.
  app.startLoading = function() {
    this.$el.addClass('loading');
  };

  // The `stopLoading` method removes the app's loading class.
  app.stopLoading = function() {
    this.$el.removeClass('loading');
  };

  // The `redirect` method redirects the browser to a new URL.
  // It is used to send the user to the Qu URL with their results.
  app.redirect = function( url ) {
    window.open( url, '_blank' );
  };

  // The 'getUrlValue' method returns an object containing a hash params name and value
  // when passed the param's name.
  app.getUrlValue = function( name ) {

    var param,
        params = pdp.utils.getHashParams(),
        values;

    if ( name === 'section' ) {
      return typeof params.section !== 'undefined' ? params.section.values : 'filters';
    }

    values = params[ name ].values;

    values = _.map( values, function( v ){
      return pdp.utils.sanitize( v );
    });

    // Build and return the param's deets.
    param = {
      name: name,
      value: params[ name ].values,
      comparator: params[ name ].comparator
    };

    return param;

  };

  // The 'getUrlValues' method returns an array of *all* hash param attributes and values.
  app.getUrlValues = function() {

    var _params = [],
        params = pdp.utils.getHashParams();

    function buildParam( val, name ) {

      var _param = {},
          _values = [],
          values = val.values.split(',');

      values = _.map( values, function( v ){
        return pdp.utils.sanitize( v );
      });

      // If it's the section hash, save it and abort.
      if ( name === 'section' ) {
        app.currentSection = values;
        return;
      }

      _.forEach( values, function( value ){
        _values.push( value );
      });

      _param = {
        name: name,
        values: _values,
        comparator: val.comparator
      };

      _params.push( _param );

    }

    _.forEach( params, buildParam );

    return _params;

  };

  // The `changeSection` toggles between the filters and summary tables sections.
  // @section = id of the section to show.
  app.changeSection = function( section, changeUrl ) {

    section = section || this.currentSection;
    changeUrl = typeof changeUrl === 'undefined' ? true : changeUrl;

    if ( !$('#' + section).length ) {
      if ( section instanceof Array ) {
        section = section[0].indexOf('summary') > -1 ? 'summary' : 'filters';
      } else {
        return;
      }
    }

    $('.app-section').addClass('hidden');
    $('nav a.section-toggle ').removeClass('active');
    $('#' + section).removeClass('hidden');
    $('nav a[href=#' + section + '].section-toggle').addClass('active');

    // Update the current section
    this.currentSection = section;

    // Update all the DOM fields.
    pdp.form.setFields();

    // Show relevant filters.
    pdp.form.checkFilters();

    // Scroll to the top of the page.
    window.scrollTo(0,0);

    if ( changeUrl ) {
      // Update URL hash
      window.location.hash = PDP.query.generateUrlHash();
    }

    if (this.currentSection === 'summary') {
      pdp.summaryTable.setupTable();
    } else {
      pdp.summaryTable.cancelTimeout();
    }

  };

  // Export the public API.
  pdp.app = app;

  return pdp;

}( PDP || {} ));
