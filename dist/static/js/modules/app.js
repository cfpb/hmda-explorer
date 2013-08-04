// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  // The App Object
  // ----------------
  // The `app` object stores global app properties and methods.

  var app = {};

  // Cache a reference to the app's jQuery object.

  app.$el = $('#filters');

  // The current section the user is viewing.

  app.currentSection = 'filters';

  // The `init` method is called when the DOM is loaded so we can do some preparation.

  app.init = function() {

    var hashParams = pdp.utils.getHashParams();

    // Activate [chosen](http://harvesthq.github.io/chosen/) on select elements.

    app.$el.find('select').chosen({ width: '100%', disable_search_threshold: 10, allow_single_deselect: true });

    // Initialize Bootstrap tooltips

    app.$el.find('.help').tooltip({ placement: 'left' });
    app.$el.find('#share_url').tooltip({ title: 'Copied to clipboard!', trigger: 'manual' });

    // If there are hash params in the URL, grab them and populate the DOM fields.

    if ( !_.isEmpty( hashParams ) ) {

      pdp.query.updateAll({source: 'url'});

    } else {

      // Clear out any cached values.

      pdp.query.reset({ defaults: true });

    }

    // Give our app a special class.

    this.$el.addClass('ready');

    // Broadcast that the app is loaded and good to go.

    pdp.observer.emitEvent('app:ready');

  };

  // The `start` method is called when we're ready for the app to start chooglin'.

  app.start = function() {

    var parents = _.map( $('select[data-dependent], input[data-dependent]'), function( el ){
      return $( el ).attr('id');
    });

    // Pull any `param` entries into the DOM.

    pdp.form.setFields();

    // Check if any fields that were preloaded have dependents we need to show.

    pdp.form.checkDeps( parents );

    // Check if any filter sections are hiding fields with values.

    pdp.form.checkFilters();

    // Hide the preview table.

    $('#preview').hide();

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

    window.location.href = url;

  };

  // The 'getUrlValue' method returns an object containing a hash params name and value
  // when passed the param's name.

  app.getUrlValue = function( name ) {

    var param,
        params = pdp.utils.getHashParams();

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

  app.changeSection = function( section ) {

    section = section || this.currentSection;

    $('.app-section').addClass('hidden');
    $('#section-toggle a').removeClass('active');
    $('#' + section).removeClass('hidden');
    $('#section-toggle a[href=#' + section + ']').addClass('active');

    // Update the current section

    this.currentSection = section;

    // Update all the DOM fields.

    pdp.form.setFields();

    // Show relevant filters.

    pdp.form.checkFilters();

  };

  // I was fairly intoxicated when I wrote this, not too sure what it does.

  app.setPreset = function( options ) {

    var $parents = $('select[data-dependent], input[data-dependent]');

    pdp.form.setFields({ empty: true });

    pdp.query.reset( options || {} );

    pdp.form.setFields();

  };

  // Export the public API.

  pdp.app = app;

  return pdp;

}( PDP || {} ));
