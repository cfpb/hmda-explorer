// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  // The Preview
  // -----------
  // The preview is a table of records the user can inspect before downloading the data slice.

  var preview = {};

  // Cache a reference to the preview table's jQuery object.

  preview.$el = $('#preview');

  // Whether or not the preview is currently updating.

  preview._updating = false;

  // Object for handling NLW stuff.

  preview.nlw = {

    $el: $('#nlw'),
    count: '1000+'

  };

  // The `startLoading` method adds a class to the preview section's element so we can
  // visualize the loading of content.

  preview.startLoading = function() {

    this.$el.addClass('loading');
    this.nlw.$el.addClass('loading');
    this.nlw.$el.find('.calculating').show();
    this.nlw.$el.find('.count').hide();

  };

  // The `stopLoading` method removes the preview section's loading class.

  preview.stopLoading = function() {

    this.$el.removeClass('loading');
    this.nlw.$el.removeClass('loading');
    this.nlw.$el.find('.calculating').hide();
    this.nlw.$el.find('.count').show();

  };

  // The `_fetchPreviewJSON` method returns a promise of JSON

  preview._fetchPreviewJSON = function() {

    var url = pdp.query.generateApiUrl() + '&$limit=50',
        promise = pdp.utils.getJSON( url );

    return promise;

  };

  // The `update` method updates the preview section.

  preview.update = function() {

    preview.startLoading();

    this._fetchPreviewJSON().done( function( data ) {

      preview.nlw.count = data.total;

      preview.updateTable( data.results );
      preview.updateNLW();

      preview.stopLoading();

    }).fail( function( data, textStatus ) {

      console.error( 'Error updating preview table: ' + textStatus );
      preview.stopLoading();

    });

  };

  // The `updateNLW` method updates the natural language sentence above the preview table.

  preview.updateNLW = function( count ) {

    // If there are year(s) selected use 'em, otherwise use all years.

    var years = typeof pdp.query.params.as_of_year !== 'undefined' ? _.clone( pdp.query.params.as_of_year.values ).sort() : [2007, 2008, 2009, 2010, 2011, 2012],
        countFormatted = preview.nlw.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        areConsecutive;

    if ( years.length > 1 ) {

      // Are the selected years consecutive?

      areConsecutive = _.every( years, function( val, i, arr ){
        if ( i > 0 ) {
          return val == +arr[ i - 1 ] + 1;
        }
        return true;
      });

      // If they're consecutive, display the first and last with a dash in the middle.
      // Otherwise, join with commas for a list.

      years = areConsecutive ? years[0] + ' - ' + _.last( years ) : years.join(', ');

    }

    preview.nlw.$el.find('.count').html( countFormatted );
    preview.nlw.$el.find('.years').html( years );

  };

  // The `updateTable` method updates the preview table.
  // @data = JS object of all the data to populate the HTML table with.

  preview.updateTable = function( data ) {

      // We don't want to show every dimension from the API in the preview table so we 
      // specify which ones to show here.

      var _fields = {
                    action_taken_name: 'Action taken',
                    agency_name: 'Agency name',
                    applicant_ethnicity_name: 'Applicant ethnicity',
                    applicant_race_name_1: 'Applicant race',
                    applicant_sex_name: 'Applicant sex',
                    census_tract_number: 'Census tract',
                    co_applicant_ethnicity_name: 'Co-applicant ethnicity',
                    co_applicant_race_name_1: 'Co-applicant race',
                    co_applicant_sex_name: 'Co-applicant sex',
                    county_name: 'County',
                    denial_reason_name_1: 'Denial reason',
                    edit_status_name: 'Status',
                    hoepa_status_name: 'HOEPA status',
                    lien_status_name: 'Lien status',
                    loan_purpose_name: 'Loan purpose',
                    loan_type_name: 'Loan type',
                    msamd_name: 'MSA',
                    owner_occupancy_name: 'Owner occupancy',
                    preapproval_name: 'Preapproval',
                    property_type_name: 'Property type',
                    purchaser_type_name: 'Purchaser type',
                    respondent_id: 'Respondent ID',
                    sequence_number: 'Sequence number',
                    state_name: 'State',
                    as_of_year: 'Year'
                  },
          _keys = _.keys( _fields ),
          _rows = [],
          _rowConstructor = {};


      _( _keys ).forEach( function( key ){
        _rowConstructor[ key ] = '<em>N/A</em>';
      });

      _( data ).forEach( function( row ){

        var _row = _.clone( _rowConstructor ),
            _flattenedRow = [];

        _( row ).forEach( function( entry, key ){
          if ( _.include( _keys, key ) ) {
            _row[ key ] = entry;
          }
        });

        _( _row ).forEach( function( entry ){
          _flattenedRow.push( entry );
        });

        _rows.push( _flattenedRow );

      });

      preview.$el.TidyTable({
        //enableCheckbox: true
      }, {
        columnTitles: _.toArray( _fields ),
        columnValues: _rows
      });

  };

  // Export the public API.

  pdp.preview = preview;

  return pdp;

}( PDP || {} ));
