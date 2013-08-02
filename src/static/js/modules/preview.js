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

      var _keys = [
                'action_taken_name',
                'agency_name',
                'applicant_ethnicity_name',
                'applicant_race_name_1',
                'applicant_sex_name',
                'as_of_year',
                'census_tract_number',
                'co_applicant_ethnicity_name',
                'co_applicant_race_name_1',
                'co_applicant_sex_name',
                'county_name',
                'denial_reason_name_1',
                'edit_status_name',
                'hoepa_status_name',
                'lien_status_name',
                'loan_purpose_name',
                'loan_type_name',
                'msamd_name',
                'owner_occupancy_name',
                'preapproval_name',
                'property_type_name',
                'purchaser_type_name',
                'respondent_id',
                'sequence_number',
                'state_name'
                ],
          _rows = [],
          _rowCollection = {};


      _( _keys ).forEach( function( key ){
        _rowCollection[ key ] = '<em>N/A</em>';
      });

      _( data ).forEach( function( row ){

        var _row = [],
            _rowObj = _.clone( _rowCollection );

        _( row ).forEach( function( entry, key ){
          if ( _.include( _keys, key ) ) {
            _rowObj[ key ] = entry;
          }
        });

        _( _rowObj ).forEach( function( entry ){
          _row.push( entry );
        });

        _rows.push( _row );

      });

      preview.$el.TidyTable({
        //enableCheckbox: true
      }, {
        columnTitles: _keys,
        columnValues: _rows
      });

  };

  // Export the public API.

  pdp.preview = preview;

  return pdp;

}( PDP || {} ));
