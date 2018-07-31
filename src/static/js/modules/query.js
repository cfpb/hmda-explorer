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
  query.endpoint = query.debug ? 'static/js/static_data/' : 'https://api.consumerfinance.gov/data/hmda/';

  // Seconds to wait on a response from the API before giving up.
  query.secondsToWait = 300;

  // Whether or not they want codes in their downloaded file.
  query.codes = false;

  // `query`'s `params` stores filter values.
  query.params = {};

  // The `reset` method empties the `params` object.
  // If a preset is passed, some defaults will be set.
  query.reset = function( preset ) {

    // The year is selected independent of the preset, because
    // of this we have to ensure it doesn't get overwritten.
    var years = $('.field.as_of_year select').val() || [2017];

    switch( preset ) {

      // All originated mortgages.
      case 'originations':
        this.params = {
          as_of_year: {
            values: years,
            comparator: '='
          },
          action_taken: {
            values: [1],
            comparator: '='
          }
        };
      break;

      // First-lien, owner-occupied, 1-4 family homes (including manufactured homes).
      case 'common':
        this.params = {
          as_of_year: {
            values: years,
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
      break;

      // Default to an empty state with whatever years they've selected.
      case 'all':
        this.params = {
          as_of_year: {
            values: years,
            comparator: '='
          }
        };
        break;

      // Empty everything.
      case 'clear':
        this.params = {};
        break;

      // Default to an empty state with whatever years they've selected.
      default:
        this.params = {
          as_of_year: {
            values: [2017],
            comparator: '='
          }
        };
        break;

    }

    return this;

  };

  // The `updateAll` method runs through all the filter field values the user has selected
  // and stores them in the `params` object.
  query.updateAll = function( options ) {

    var fields,
        opts = options || {};

    switch( opts.source ) {
      case 'url':
        fields = pdp.app.getUrlValues();
        break;
      // State is stored in a cookie. Removing this functionality for now because
      // it's confusing the UX team. I'd rather work on other stuff than explain
      // to them how this works. Winter is coming.
      // case 'session':
      //   fields = pdp.query.getCookie();
      //   break;
      default:
        fields = pdp.form.getFields();
    }

    this.reset('clear');

    // If all fields are updated and no as_of_year value is present,
    // explicitly set all years of HMDA so Share links properly generate
    // and Summary Tables function for All Years
    // #UpdateYearly
    if(  fields.length === 0 || fields[0].name !== 'as_of_year' ) {
      fields.unshift( {
        name: 'as_of_year',
        tagName: 'select',
        values: ['2017', '2016', '2015', '2014', '2013', '2012', '2011',
                  '2010', '2009', '2008', '2007'],
        comparator: '='
      });
    }

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
        // over it because it will be split up the characters.
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

  // The `setCookie` method stores the param object in a cookie.
  query.setCookie = function() {

    $.cookie( '_hmda', pdp.form.getFields(), { expires: 1 } );

  };

  // The `getCookie` method retrives the param object from a cookie.
  query.getCookie = function() {

    return $.cookie( '_hmda' );

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

  query.removeSelectParam = function (params) {
    //using a copy of the params means that the select obj
    //is still available on query.params for share url generation
    var paramsCopy = $.extend(true, {}, params);
    try {
      delete paramsCopy.clauses.where.select;
    } catch (e) {
      //nested property doesn't exist
    }
    delete paramsCopy.select;
    return paramsCopy;
  };

  // The `generateApiUrl` method builds and returns a Qu URL from `query`'s `params`.
  query.generateApiUrl = function( format, codes, params ) {

    var url,
        apiCallParams = params || this.params,
        showCodes = codes || this.codes,
        downloadFormat = format || this.format;
    //remove 'select' from params so it won't be added to where clause
    apiCallParams = query.removeSelectParam(apiCallParams);

    // Set a base url to append params to
    url = this.endpoint + 'slice/hmda_lar.' + downloadFormat + '?';

    if ( !showCodes ) {
      apiCallParams = {
        clauses: {
          where: apiCallParams,
          select: ['action_taken_name','agency_abbr','agency_name','applicant_ethnicity_name','applicant_race_name_1','applicant_race_name_2','applicant_race_name_3','applicant_race_name_4','applicant_race_name_5','applicant_sex_name','application_date_indicator','as_of_year','census_tract_number','co_applicant_ethnicity_name','co_applicant_race_name_1','co_applicant_race_name_2','co_applicant_race_name_3','co_applicant_race_name_4','co_applicant_race_name_5','co_applicant_sex_name','county_name','denial_reason_name_1','denial_reason_name_2','denial_reason_name_3','edit_status_name','hoepa_status_name','lien_status_name','loan_purpose_name','loan_type_name','msamd_name','owner_occupancy_name','preapproval_name','property_type_name','purchaser_type_name','respondent_id','sequence_number','state_abbr','state_name','applicant_income_000s','hud_median_family_income','loan_amount_000s','number_of_1_to_4_family_units','number_of_owner_occupied_units','minority_population','population','rate_spread','tract_to_msamd_income']
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
          queryVals = [],
          locVals = [],
          locGroup = {}, //Create a group that finds state / counties with similar numbers.
          where;

      // In order to compensate for enumerated location fields (state_code-1, county_name-1, etc.)
      // we have to go through and consolidate all enumerated params into unified objects.
      _.forEach( params, function( param, paramName ) {
        //joiner used to allow for congifurable AND/OR statements in query
        param.joiner = ' AND ';

        if ( !param.values || !param.values[0] ) {
          return;
        }

        var consolidatedName, groupName;
        // If the parameter is an enumerated (state-code-1) field then
        if ( paramName.match(/\-\d+$/) ) {

          // If this is a special case with county, state, or census tract
          // then they needs to be grouped together as an object for appropriate query creation
          if ( paramName.indexOf('state_code') > -1 || paramName.indexOf('county_code') > -1 || paramName.indexOf('census_tract_number') > -1 ){
            // If a number exists, create a location group to bring city, state, and census tract together
            groupName = paramName.slice(-2);

            // Initialize an empty location group if necessary
            if( typeof locGroup[ groupName ] === 'undefined' ){
              locGroup[ groupName ] = {
                stateValue: '',
                countyValues: [],
                censusValues: [],
                comparator: '=',
                joiner: ' OR '
              };
            }
            // Loop through each location group parameter and push it to the appropriate object
            _.forEach( param.values, function( value ){
              if ( paramName.indexOf('state_code') > -1 ){
                locGroup[ groupName ].stateValue = value;
              } else if ( paramName.indexOf('county_code') > -1 ){
                locGroup[ groupName ].countyValues.push( value );
              } else if ( paramName.indexOf('census_tract_number') > -1 ){
                locGroup[ groupName ].censusValues.push( '"' + value + '"' );
              }
            });
          // If not state, county, census, then create a consolidated parameter (ie 'msamd')
          } else {
            // Initalize an empty param object if need be.
            consolidatedName = paramName.replace(/\-\d+$/, '');
            if ( typeof _params[ consolidatedName ] === 'undefined' ) {
              _params[ consolidatedName ] = {
                values: [],
                comparator: '=',
                joiner: ' AND '
              };
            }

            _.forEach( param.values, function( value ){
              _params[ consolidatedName ].values.push( value );
            });
          }
        // If the parameter is NOT an enumerated field, push it to _params
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
        // If calling msamd, then it needs to be joined to location data with "OR" and placed at end of array
        if( paramName.indexOf('msamd') > -1 ){
          param.joiner = ' OR ';
          locVals.push( paramVals );
          locVals.push( param.joiner );
        // Otherwise, push the parameter to the queryVals array which is joined first (below)
        } else {
          queryVals.push( paramVals );
        }
      }.bind( this ));

      // For each location group, iterate through and create valid, grouped query string
      _.forEach( locGroup, function(i, val){
        var queryStr = '', item = locGroup[val];
        if( item.stateValue === '' ){
        } else if( item.countyValues.length === 0 && item.censusValues.length === 0 ){
            queryStr += 'state_code=' + item.stateValue;
            locVals.push(queryStr);
            locVals.push(item.joiner);
        } else if( item.countyValues.length === 0 && item.censusValues.length > 0 ){
            queryStr += '(state_code=' + item.stateValue + ' AND census_tract_number IN (' + item.censusValues + '))';
            locVals.push(queryStr);
            locVals.push(item.joiner);
        } else if( item.censusValues.length === 0 ){
          queryStr += '(state_code=' + item.stateValue + ' AND county_code IN (' + item.countyValues.toString() + '))';
          locVals.push(queryStr);
          locVals.push(item.joiner);
        } else {
          queryStr += '(state_code=' + item.stateValue + ' AND county_code IN (' + item.countyValues.toString() + ') AND census_tract_number IN (' + item.censusValues.toString() + '))';
          locVals.push(queryStr);
          locVals.push(item.joiner);
        }
      });

      locVals.pop(); //Get rid of the last joiner / operator - not needed.
      // Add each queryVals parameter and their joiner string to where variable
      if( queryVals.length > 0 ){
        where = queryVals.join(' AND ');
        // If location information selected, then join that to the existing query
        if( locVals.length > 0 ){
          where += ' AND (' + locVals.join('') + ')';
        }
      } else {
        // If no queryvals exist, set to empty and append any location filter without AND
        where = '';
        if( locVals.length > 0 ){
          where += '(' + locVals.join('') + ')';
        }
      }
      // A REGEX used to be here that substituted in certain scenarios - this was not sufficient for the use case.

      // Encode for URIs and replace spaces with plus signs.
      return '&$where=' + encodeURI( where ).replace( /%20/g, '+' );

    },

    // select and group clauses are formatted the same way sans name
    select: function( param ) {
      return '&$select=' + this._listVals( param );
    },

    group: function( param ) {
      return '&$group=' + this._listVals( param ) + '&$orderBy=' + this._listVals( _.clone( param ).reverse() );
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

        // Rate spread specialness
        if ( param.values[0] == 'null' ) {
          paramVal = paramName + param.comparator + '""';
        // Strings
        } else if ( isNaN( param.values[0] ) || paramName === 'msamd' || paramName === 'respondent_id' || paramName === 'census_tract_number' ) {
          paramVal = paramName + param.comparator + '"' + param.values[0] + '"';
        // Numbers
        } else {
          paramVal = paramName + param.comparator + param.values[0];
        }

        return paramVal;

      // If there are multiple values for a single parameter, we iterate over them and
      // put an `OR` operator between them. We then then [group them](http://cfpb.github.io/qu/articles/queries.html#boolean_operators)
      // with parens and add the grouping to the `params` array.
      } else {

        _.forEach( param.values, function( val, key ){

          if ( isNaN( val ) || paramName === 'msamd' || paramName === 'respondent_id' || paramName === 'census_tract_number' ) {
            paramVals.push( '"' + val + '"' );
          } else {
            paramVals.push( val );
          }

        });

        return paramName + ' IN (' + paramVals + ')';

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
