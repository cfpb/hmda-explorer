var PDP = (function ( pdp ) {

  'use strict';

  // The Preview
  // -----------
  // The preview is a table of records the user can inspect before downloading the data slice.
  var preview = {};

  // Cache a reference to the preview table's jQuery object.
  preview.$el = $('#preview');

  // Cache a reference to the download size messaging section.
  preview.$downloadSize = $('.filesize');

  // Whether or not the preview is currently updating.
  preview._updating = false;

  // Object for handling NLW stuff.
  preview.nlw = {

    $el: $('.nlw'),
    count: 'many'

  };

  // The `startLoading` method adds a class to the preview section's element so we can
  // visualize the loading of content.
  preview.startLoading = function() {

    this.$el.addClass('loading');
    this.nlw.$el.addClass('loading');
    this.nlw.$el.find('.calculating').show();
    this.nlw.$el.find('.count').hide();
    preview.$downloadSize.addClass('hidden');

  };

  // The `stopLoading` method removes the preview section's loading class.
  preview.stopLoading = function() {

    this.$el.removeClass('loading');
    this.nlw.$el.removeClass('loading');
    this.nlw.$el.find('.calculating').hide();
    this.nlw.$el.find('.count').show();

  };

  // Show the preview table.
  preview.showTable = function() {

    this.$el.slideDown( 250 );
    this.enableTable();
    $('.preview').removeClass('closed');

  };

  // Hide the preview table.
  preview.hideTable = function() {

    this.$el.slideUp( 250 );
    $('.preview').addClass('closed');

  };

  // Enable the preview table.
  preview.enableTable = function() {

    $('.preview .title').removeClass('disabled');
    this.$el.find('th, td').tooltip({ container: 'body', html: true });
    $('.msg.preview-table').removeClass('error').html('');

  };

  // Disable the preview table.
  preview.disableTable = function() {

    var $title = $('.preview .title');

    $title.addClass('disabled');

    $('.msg.preview-table').addClass('error').html('<i class="icon-error-alt"></i> There was a problem connecting to the API. Reload the page and if this problem persists, <a href="http://www.consumerfinance.gov/contact-us/">contact us</a>.');

  };

  // This is used to ensure only the latest AJAX requested is acted upon.
  preview._lastRequestTime = new Date().getTime();

  // The `_fetchPreviewJSON` method returns a promise of JSON
  preview._fetchPreviewJSON = function() {
    var url = pdp.query.generateApiUrl( null, true ) + '&$limit=100',
        promise = pdp.utils.getJSON( url );

    preview._lastRequestTime = new Date().getTime();
    promise._timestamp = preview._lastRequestTime;

    return promise;

  };

  // The `update` method updates the preview section.
  preview.update = function() {

    var promise = this._fetchPreviewJSON(),
        $downloadButton = $('#download .action'),
        check,
        aborted;

    // Has the request been aborted?
    aborted = false;

    function _abort( data, textStatus ) {

      aborted = true;
      preview.nlw.count = 'probably a whole lot of';
      preview.updateNLW();
      preview.stopLoading();
      preview.disableTable();
      pdp.form.disableField( $downloadButton );

    }

    preview.startLoading();
    preview.enableTable();
    pdp.form.enableField( $downloadButton );
    preview.updateNLW();

    promise.done( function( data ) {

      if ( promise._timestamp < preview._lastRequestTime || aborted ) {
        return;
      }

      if ( data.total <= 0 ) {
        pdp.form.disableField( $downloadButton );
      }

      preview.nlw.count = data.total;
      preview.updateTable( data.results );
      preview.updateNLW();
      preview.updateDownloadSize();
      preview.stopLoading();

    });

    promise.fail( _abort );

    check = setTimeout(function(){
      if ( promise.state() !== 'resolved' && promise._timestamp == preview._lastRequestTime ) {
        _abort( null, 'time out' );
      }
    }, pdp.query.secondsToWait * 1000 );

  };

  // The `updateNLW` method updates the natural language sentence above the preview table.
  preview.updateNLW = function() {

    // If there are year(s) selected use 'em, otherwise use all years.
    var countFormatted = pdp.utils.commify( preview.nlw.count ),
        filters,
        areConsecutive,
        years = $.map( $('#as_of_year option'), function( year ) {
          return year.value;
        });
      
    // If there's a year param in the query, grab any valid years from it.
    if ( typeof pdp.query.params.as_of_year !== 'undefined' && !_.isEmpty(pdp.query.params.as_of_year.values) ) {
      years = _.filter( _.clone( pdp.query.params.as_of_year.values ), function( year ) {
          return years.indexOf( String(year) ) > -1;
      }); 
    }

    switch( $('#suggested').val() ) {
      case 'common':
        filters = ' for first-lien, owner-occupied, 1-4 family homes';
        break;
      case 'originations':
        filters = ' with originated mortgages';
        break;
      case 'default':
        filters = '';
        break;
      case 'all':
        filters = '';
        break;
      default:
        filters = ' with the above selected filters';
    }

    if ( years.length > 1 ) {
          
      years = years.sort();
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
    preview.nlw.$el.find('.filter-selection').html( filters );

  };

  // The `updateDownloadSize` method estimates how large the downloaded file will be and 
  // updates the text under the download button.
  preview.updateDownloadSize = function() {

    var count = preview.nlw.count,
        multiplier = pdp.query.codes ? 724.88 : 684.88,
        filesize;

    if ( isNaN( count ) || !count ) {
      preview.$downloadSize.addClass('hidden');
      return;
    }

    preview.$downloadSize.removeClass('hidden');

    // The multiplier numbers above is the result of averaging the filesizes of a random 
    // sample of file downloads.
    filesize = pdp.utils.getPrettyFilesize( count * multiplier );

    preview.$downloadSize.find('.bytes').html( filesize );

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
