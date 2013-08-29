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
  query.debug = false;

  // Set a default format for the data download.
  query.format = query.debug ? 'json' : 'jsonp?$callback=';

  // Set a default endpoint for AJAX requests.
  query.endpoint = query.debug ? 'static/js/dummy_data/' : 'https://qu.demo.cfpb.gov/data/hmda/';

  // Seconds to wait on a response from the API before giving up.
  query.secondsToWait = 600;

  // Whether or not they want codes in their downloaded file.
  query.codes = false;

  // `query`'s `params` stores filter values.
  query.params = {};

  // The `reset` method empties the `params` object.
  // If defaults: true is passed, some defaults will be set.
  query.reset = function( options ) {

    options = options || {};

    if ( options.defaults ) {
      this.params = {
        as_of_year: {
          values: [2011],
          comparator: '='
        },
        property_type: {
          values: [1,2],
          comparator: '='
        },
        owner_occupancy: {
          values: [1],
          comparator: '='
        },
        lien_status: {
          values: [1],
          comparator: '='
        },
        action_taken: {
          values: [1],
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

      if ( !param.values[0] ) {
        return;
      }

      // If it's not a number, add quotes around the params.
      hashParams.push( name + param.comparator + param.values.join(',') );

    }

    _.forEach( query.params, buildHashParam );

    hash = '!/' + hashParams.join('&') + '&section=' + pdp.app.currentSection;

    return hash;

  };

  // The `generateApiUrl` method builds and returns a Qu URL from `query`'s `params`.
  query.generateApiUrl = function( format, codes, params ) {

    var url,
        apiCallParams = params || this.params,
        showCodes = codes || this.codes,
        downloadFormat = format || this.format;

    // Set a base url to append params to
    url = this.endpoint + 'slice/hmda_lar.' + downloadFormat + '?';

    if ( !showCodes ) {
      apiCallParams = {
        clauses: {
          where: apiCallParams,
          select: ['action_taken_name','agency_abbr','agency_name','applicant_ethnicity_name','applicant_race_name_1','applicant_race_name_2','applicant_race_name_3','applicant_race_name_4','applicant_race_name_5','applicant_sex_name','application_date_indicator','as_of_year','census_tract_number','co_applicant_ethnicity_name','co_applicant_race_name_1','co_applicant_race_name_2','co_applicant_race_name_3','co_applicant_race_name_4','co_applicant_race_name_5','co_applicant_sex_name','county_name','denial_reason_name_1','denial_reason_name_2','denial_reason_name_3','edit_status_name','hoepa_status_name','lien_status_name','loan_purpose_name','loan_type_name','msamd_name','owner_occupancy_name','preapproval_name','property_type_name','purchaser_type_name','respondent_id','sequence_number','state_abbr','state_name','applicant_income_000s','co_applicant_income_000s','hud_median_family_income','loan_amount_000s','number_of_1_to_4_family_units','number_of_owner_occupied_units','minority_population','population','rate_spread','tract_to_msamd_income']
        }
      };
    }

    // fetch, compile queries
    url += this._buildApiQuery( apiCallParams );

    return url;

  };

  // builds the query string to append to api url
  // arg: params, object. if you only need a 'where' clause, passing in
  // query.params will do just fine
  // if you need to use the 'select' and 'group' clauses, pass an object
  // that has a property 'clauses' with an array of objects that correspond to 
  // each clause. example:
  // params = {
  //   clauses: {
  //     select: ['var_one', 'var_two'],
  //     group: ['var_one', 'var_two']
  //   }
  // } 
  query._buildApiQuery = function( params ) {

    var url = '', key;

    if ( params.hasOwnProperty('clauses') ) {
      for ( key in params.clauses ) {
        if ( params.clauses.hasOwnProperty( key ) ) {
          url += this._buildClause[key]( params.clauses[key] );
        }
      }
    } else {
      url = this._buildClause.where( params );
    }

    return url;

  };

  // methods correspond to each type of clause that the API takes
  // builds part of api call query string pertaining to clause
  query._buildClause = {

  // Convert each param to a proper [`$where` clause](http://cfpb.github.io/qu/articles/queries.html#where_in_detail).
    where: function( params ) {

      var _params = {},
          queryVals = [];

      // In order to compensate for enumerated location fields (state_code-1, county_name-1, etc.)
      // we have to go through and consolidate all enumerated params into unified objects.
      _.forEach( params, function( param, paramName ) {

        if ( !param.values || !param.values[0] ) {
          return;
        }

        var consolidatedName;

        if ( paramName.match(/\-\d+$/) ) {
          consolidatedName = paramName.replace(/\-\d+$/, '');

          // Initalize an empty param object if need be.
          if ( typeof _params[ consolidatedName ] === 'undefined' ) {
            _params[ consolidatedName ] = {
              values: [],
              comparator: '='
            };
          }

          _.forEach( param.values, function( value ){
            _params[ consolidatedName ].values.push( value );
          });

        } else {
          _params[ paramName ] = param;
        }

      });

      // We can now get back to business and generate that WERECLAWS
      _.forEach( _params, function( param, paramName ) {

        var paramVals;

        // Strip `-min/max` from the end of the param. This is mainly done for the loan_amount_000s fields.
        paramName = paramName.replace( /\-(min|max)$/, '' );
        paramVals = this._formatComparisonValues( param, paramName );
        queryVals.push( paramVals );

      }.bind( this ));

      // Join all the params with `AND` operators and append it to the base url,
      // replacing spaces with plus signs.
      return '&$where=' + encodeURI( queryVals.join(' AND ') ).replace( /%20/g, '+' );

    },

    // select and group clauses are formatted the same way sans name
    select: function( param ) {
      return '&$select=' + this._listVals( param );
    },

    group: function( param ) {
      return '&$group=' + this._listVals( param );
    },

    // formats single value clauses
    // returns string of comma-delimited values
    _listVals: function( param ) {

      var i = param.length,

        str = '';

      while( i-- ) {
        if ( typeof param[i] !== 'undefined' ) {
          str += param[i];
          // if this is not the last value, add comma
          if ( i > 0 ) {
            str += ',';
          }
        }
      }

      return str;
    },

    // formats api call values that have a comparison operator
    _formatComparisonValues: function( param, paramName ){
      var paramVal,
          paramVals = [];

      // If there's only value for the param, meaning they only selected one item or
      // it's a radio button that only allows once value, add the stringified
      // param to the `queryVals` array.
      if ( param.values.length === 1 ) {

        if ( isNaN( param.values[0] ) || paramName === 'msamd' || paramName === 'respondent_id' ) {
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

          if ( isNaN( val ) || paramName === 'msamd' || paramName === 'respondent_id' ) {
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
