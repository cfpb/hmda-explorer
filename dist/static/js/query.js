// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  // The Query Object
  // ----------------
  // The `query` object is used to cache filter values and store methods 
  // that manipulate filter values. 

  var query = {};

  // Set a default format for the data download.

  query.format = 'json';

  // Set a default endpoint for AJAX requests.

  query.endpoint = 'static/js/dummy_data/';

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

  // Export the public API.

  pdp.query = query;

  return pdp;

}( PDP || {} ));
