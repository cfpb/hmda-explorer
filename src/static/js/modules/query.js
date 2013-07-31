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

  // If debug is set to true, dummy data will be used.

  query.debug = true;

  // Set a default format for the data download.

  query.format = query.debug ? 'json' : 'jsonp?$callback=';

  // Set a default endpoint for AJAX requests.

  query.endpoint = query.debug ? 'static/js/dummy_data/' : 'http://qu.demo.cfpb.gov/data/hmda/';

  // `query`'s `params` stores filter values.

  query.params = {};

  // The `reset` method resets the `params` object to some defaults.
  // If empty: true is passed, `params` will be cleared completely.

  query.reset = function( options ) {

    options = options || {};

    if ( options.defaults ) {

      this.params = {
        as_of_year: {
          values: [2011],
          comparator: '='
        }
      };

    } else {

      this.params = {};

    }

    return this;

  };

  // The `updateAll` method runs through all the filter field values the user has selected
  // and stores them in the `params` object.

  query.updateAll = function( options ) {

    var fields,
        opts = options || {};

    // Get our fields array from either the hash in the url or the DOM field elements.

    if ( opts.source === 'url' ) {
      fields = pdp.app.getUrlValues();
    } else {
      fields = pdp.form.getFields();
    }

    this.reset();

    // Iterate over all the filter field values and push them into `query.params`.

    function _processField( field ) {

      if ( field.name && field.values ) {

        // Initalize an empty param object if need be.

        if ( typeof query.params[ field.name ] === 'undefined' ) {

          query.params[ field.name ] = {
            values: [],
            comparator: '='
          };

        }

        // If the value is a string from a text box we don't want to iterate 
        // over it because it will split up the characters.

        if ( field.type === 'text' ) {

          query.params[ field.name ].values = [ field.values ];

        } else {

          _.forEach( field.values, function( val, name ){

            var values = query.params[ field.name ].values;

            // Only push the value if it's not already in there.

            if ( !_.contains( values, val ) ) {
              values.push( val );
            }

          });

        }

        query.params[ field.name ].comparator = field.comparator;

      }

    }

    _.forEach( fields, _processField );

    pdp.observer.emitEvent( 'params:updated' );

  };

  // The `generateUrlHash` method builds and returns a URL hash from `query`'s `params`.

  query.generateUrlHash = function() {

    var hash,
        hashParams = [];

    // Loop through params, stringify them and push them into the temp array.

    function buildHashParam( param, name ) {

      // If it's not a number, add quotes around the params.

      hashParams.push( name + param.comparator + param.values.join(',') );

    }

    _.forEach( query.params, buildHashParam );

    hash = '!/' + hashParams.join('&') + '&section=' + pdp.app.currentSection;

    return hash;

  };

  // The `generateApiUrl` method builds and returns a Qu URL from `query`'s `params`.

  query.generateApiUrl = function( format, params ) {

    var url,
        apiCallParams = params || this.params,
        downloadFormat = format || this.format;

    // Set a base url to append params to

    url = this.endpoint + 'slice/hmda_lar.' + downloadFormat + '?';

    // fetch, compile queries

    url += this.buildApiQuery( apiCallParams );

    return url;

  };

  // Convert each param to a proper [`$where` clause](http://cfpb.github.io/qu/articles/queries.html#where_in_detail).

  query.buildApiQuery = function( params ) {
    var url = '',
      key;

    if (params.hasOwnProperty('clauses')) {
      for ( key in params.clauses ) {
        if (params.clauses.hasOwnProperty( key )) {
          url += this._buildClause[key]( params.clauses[key] );
        }
      }
    } else {
      url = this._buildClause.where( params );
    }

    return url;
  };

  query._buildClause = {
    where: function( params ) {
      var param, paramName, _params, queryVals = [];

      _.forEach( params, function( param, paramName ) {

        var paramVals = this._gatherParamValues( param, paramName );

        queryVals.push( paramVals );

      }.bind( this ));

      // Join all the params with `AND` operators and append it to the base url,
      // replacing spaces with plus signs.
      return '&$where=' + encodeURI( queryVals.join(' AND ') ).replace( /%20/g, '+' );
    },

    select: function( param ) {
      return '&$select=' + this._listVals( param );
    },

    group: function( param ) {
      return '&$group=' + this._listVals( param );
    },

    _listVals: function( param ) {
      var i = param.length,
        str = '';

      while( i-- ) {
        str += param[i];
        if ( i > 0 ) {
          str += ',';
        }
      }

      return str;
    },

    _gatherParamValues: function( param, paramName ){
      var paramVal,
          paramVals = [];

      // If there's only value for the param, meaning they only selected one item or
      // it's a radio button that only allows once value, add the stringified
      // param to the `queryVals` array.
      if ( param.values.length === 1 ) {

        if ( isNaN( param.values[0] ) ) {
          paramVal = paramName + param.comparator + '"' + param.values[0] + '"';
        } else {
          paramVal = paramName + param.comparator + param.values[0];
        }

        return paramVal;

      // If there are multiple values for a single parameter, we iterate over them and
      // put an `OR` operator between them. We then then [group them](http://cfpb.github.io/qu/articles/queries.html#boolean_operators)
      // with parens and add the grouping to the `params` array.
      } else {

        _.forEach( param.values, function( val, key ){
          if ( isNaN( val ) ) {
            paramVals.push( paramName + param.comparator + '"' + val + '"' );
          } else {
            paramVals.push( paramName + param.comparator + val );
          }
        });

        return '(' + paramVals.join(' OR ') + ')';

      }

    }

  };

  // The `fetch` method requests and returns JSON from Qu matching the
  // user's filter and grouping clauses

  query.fetch = function() {

  };

  // Export the public API.

  pdp.query = query;

  return pdp;

}( PDP || {} ));
