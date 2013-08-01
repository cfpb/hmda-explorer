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

    var url = pdp.query.generateApiUrl(),
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

    var years = _.clone( pdp.query.params.as_of_year.values ).sort() || '2007 - 2012',
        countFormatted = preview.nlw.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    preview.nlw.$el.find('.count').html( countFormatted );
    preview.nlw.$el.find('.years').html( years.join(', ') );

  };

  // The `updateTable` method updates the preview table.
  // @data = JS object of all the data to populate the HTML table with.

  preview.updateTable = function( data ) {

      var _rows = [];

      _( data ).forEach( function( obj ){
        var _row = [];
        _( obj ).forEach( function( entry ){
          _row.push( entry || '' );
        });
        _rows.push( _row );
      });

      preview.$el.TidyTable({
        //enableCheckbox: true
      }, {
        columnTitles: _.keys( data[0] ),
        columnValues: _rows
      });

  };

  // Export the public API.

  pdp.preview = preview;

  return pdp;

}( PDP || {} ));
