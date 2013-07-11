// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside a
// PDP object, first checking if the object already exists.

var PDP = PDP || (function(){

  'use strict';

  var observer = new EventEmitter(),
      app = {},
      query = {},
      form = {},
      preview = {};

  // The App Object
  // ----------------
  // The `app` object stores general app properties and methods.

  // Cache a reference to the app's jQuery object.

  app.$el = $('#filters');

  // The `init` method is called when the DOM is loaded so we can do some preparation.

  app.init = function() {

    // Activate [chosen](http://harvesthq.github.io/chosen/) on select elements.

    app.$el.find('select').chosen({ width: '100%' });

    // Broadcast that the app is loaded and good to go.

    observer.emitEvent('app:ready');
    this.$el.addClass('ready');

  };

  // The `start` method is called when we're ready for the app to start chooglin'.

  app.start = function() {

    console.log('App started!');

    // Broadcast that the app has started.

    observer.emitEvent('app:started');

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

  app.redirect = function() {
    console.log('The user has been redirected!');
  };

  // The Query Object
  // ----------------
  // The `query` object is used to cache filter values and store methods 
  // that manipulate filter values. 

  // Set a default format for the data download.

  query.format = 'json';

  // Set a default endpoint for AJAX requests.

  query.endpoint = '/static/js/dummy_data/';

  // `query`'s `params` stores filter values.

  query.params = {};

  // The `reset` method resets the params object to some defaults.

  query.reset = function() {
    this.params = {
      as_of_year: [2012]
    };
  };

  // The `updateAll` method runs through all the filter field values the user has selected
  // and stores them in the `params` object.

  query.updateAll = function() {

    var $fields = app.$el.find('.param'),
        url;

    // Broadcast that an update is beginning.

    observer.emitEvent('update:started');

    // Clear out current params

    this.reset();

    // Iterate over all the filter field values

    $fields.each(function(){

      var $this = $( this ),
          field = form.getField( $this );

      // If the field has a value AND it's either a `select` element or it's checked
      // (meaning it's a radio or checkbox)

      if ( field.value && ( field.tagName === 'select' || $this.is(':checked') ) ) {

        // Initalize an empty array if need be.

        if ( typeof query.params[ field.name ] === 'undefined' ) {
          query.params[ field.name ] = [];
        }

        _.forEach( field.value, function( val, name ){

          query.params[ field.name ].push( val );

        });

      }

    });

    // Encode the URL.

    url = encodeURI( this.getUrl() );

    console.log( url );

    observer.emitEvent('update:stopped');

    return url;

  };

  // The `getUrl` method builds and returns a Qu URL from `query`'s `params`.

  query.getUrl = function() {

    var url,
        params = [];

    // Set a base url to append params to

    url = 'http://qu.demo.cfpb.gov/data/hmda/hmda_lar';

    // Convert each param to a proper [`$where` clause](http://cfpb.github.io/qu/articles/queries.html#where_in_detail).

    function buildParam( param, name ) {

      // If there's only value for the param, meaning they only selected one item or
      // it's a radio button that only allows once value, add the stringified
      // param to the `params` array.

      if ( param.length === 1 ) {

        params.push( name + '="' + param[0] + '"' );

      // If there are multiple values for a single parameter, we iterate over them and
      // put an `OR` operator between them. We then then [group them](http://cfpb.github.io/qu/articles/queries.html#boolean_operators)
      // with parens and add the grouping to the `params` array.

      } else if ( param.length > 1 ) {

        var _params = [];

        _.forEach( param, function( val, key ){
          _params.push( name + '="' + val + '"' );
        });

        _params = '(' + _params.join(' OR ') + ')';

        params.push( _params );

      }
    }

    _.forEach( query.params, buildParam );

    // Join all the params with `AND` operators and append it to the base url.

    url += '?$where=' + params.join(' AND ');

    return url;

  };

  // The `fetch` method requests and returns JSON from Qu matching the
  // user's filter and grouping clauses

  query.fetch = function() {

  };

  // The Form Object
  // ----------------
  // The `form` object stores stuff specific to the DOM form.

  // Cache a reference to the form's jQuery object.

  form.$el = $('form');

  // Cache a reference to all the filter fields.

  form.$fields = form.$el.find('.field');

  // The 'getField' method returns a field's name and value when given
  // a jQuery object of the field's HTML element.

  form.getField = function( $el ) {

    var tagName = $el.prop('tagName').toLowerCase(),
        type = $el.attr('type'),
        name = $el.attr('name') || 'untitled',
        value = $el.val(),
        field = {};

    // If the element has no tag name or type, or it has no `value`, abort.
    // It's either not selected or broken.

    if ( !( tagName || type ) || !value ) {
      return false;
    }

    // If it's a radio or checkbox element, abort if it's not selected. Otherwise,
    // remove the empty array from the value name (which really only applies to checkboxes).

    if ( type === 'radio' || type === 'checkbox' ) {
      if ( !$el.is(':checked') ) {
        return false;
      } else {
        name = name.replace( '[]', '' );
      }
    }

    // Build and return the field's deets.

    field = {
      name: name,
      tagName: tagName,
      type: type,
      value: value
    };

    return field;

  };

  form.updateField = function( el, dependency ) {

    // Broadcast that an update is starting.

    observer.emitEvent('update:started');

    // Remove all current options from field.

    this.resetField( el );

    var id = $(el).find('select').attr('id');

    // Fetch form field options and set fields when that request is fulfilled.

    this.fetchFieldOptions( id ).done( function( options ) {

        this.setFieldOptions( el, options );

        // Broadcast that the update has ended.

        observer.emitEvent('update:stopped');

    }.bind( this ));

  };

  // The `setFieldOptions` populates a select element with supplied options.

  form.setFieldOptions = function( el, options ) {

    var dropdown = $( el ).find('select'),
        template = _.template('<option value="<%= value %>"><%= label %></option>');

    _.forEach( options, function( option ) {
      dropdown.append( template( option ) );
    });

    dropdown.trigger('liszt:updated');

  };

  // The `fetchFieldOptions` method returns a promise to a field's options.

  form.fetchFieldOptions = function( id ) {

    var promise = $.ajax( query.endpoint + id + '.json' );

    return promise;

  };

  // The `emptyField` method removes all options from a `select` element and tells
  // chosen to update the element accordingly.

  form.resetField = function( el ) {

    $( el ).find('option').remove();
    $( el ).find('select').trigger('liszt:updated');

  };

  // Check if any filter fields need to be shown or hidden.

  form.checkDeps = function( el ) {

    // The form field element is passed from the observer.
    // Grab the data-dependent attribute on the form field.

    var $el = $( el ),
        dependents = $el.attr('data-dependent'),
        $dependents;

    // Helper function to emit events

    function emit( el, id ) {
      observer.emitEvent( 'field:shown', [el, id] );
    }

    // If the form field does in fact have any dependents, create a jQuery
    // object of their field containers and show/hide them as needed.

    if ( dependents ) {

      // Split and join the dependents with hashes if there are multiple 
      // so we can reference the appropriate fields by id later.

      dependents = dependents.split(' ').join(', #');
      $dependents = $( '#' + dependents ).parents('.field');

      // If it has a value, show all of its dependent fields. For each
      // dependent field, broadcast that is has been shown.

      if ( $el.val() ) {
        $dependents.removeClass('hidden');
        _.forEach( $dependents, function( $dependent ){
          emit( $dependent, $el.attr('id') );
        });
      } else {
        $dependents.addClass('hidden');
      }

    }

  };

  // The Preview Table
  // ----------------

  // Cache a reference to the preview table's jQuery object.

  preview.$el = $('#preview-table');

  // The Observer
  // ----------------
  // The [observer pattern](http://en.wikipedia.org/wiki/Observer_pattern) 
  // is used to decouple DOM elements from events. The [EventEmitter](https://github.com/Wolfy87/EventEmitter)
  // library is used.

  // Listen for specific events and act accordingly.

  observer.addListeners({
    'dom:loaded': app.init.bind( app ),
    'app:ready': [
      app.start.bind( app ),
      app.stopLoading.bind( app )
    ],
    'filter:changed': [
      query.updateAll.bind( query ),
      form.checkDeps.bind( form )
    ],
    'field:shown': [
      form.updateField.bind( form )
    ],
    'update:started': app.startLoading.bind( app ),
    'update:stopped': app.stopLoading.bind( app ),
    'download': app.redirect.bind( app )

  });

  // DOM Interactions
  // ----------------
  // jQuery is used to attach event handlers to DOM elements.

  // Whenever a `select` element is changed, emit an event.

  $('.field select, .field input').on( 'change', function(){
    observer.emitEvent('filter:changed', $( this ) );
  });

  // Export the public API.

  return {
    query: query,
    observer: observer
  };

}());

// When the DOM is Ready
// ----------------

$(function() {

  'use strict';

  PDP.observer.emitEvent('dom:loaded');

});
