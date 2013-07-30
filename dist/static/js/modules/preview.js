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

  preview.$el = $('table#preview');

  preview._updating = false;

  // The `_fetchPreviewJSON` method returns a promise of JSON

  preview._fetchPreviewJSON = function() {

    var url = pdp.query.generateApiUrl('jsonp'),
        promise = pdp.utils.getJSON( url );

    return promise;

  };

  // The `update` method updates the preview table.
  // @TODO Improve and abstract this method, rough right now for prototyping.

  preview.update = function() {

    var _rows = [];

    this._updating = true;

    this._fetchPreviewJSON().done( function( data ) {

      //console.log(data.results);

      _( data.results ).forEach( function( obj ){

        var _row = [];

        _( obj ).forEach( function( entry ){

          _row.push( entry || '' );

        });

        _rows.push( _row );

      });

      $('#preview').TidyTable({
        //enableCheckbox: true
      }, {
        columnTitles: _.keys( data.results[0] ),
        columnValues: _rows
      });

    }).fail( function( data, textStatus ) {

      console.error( 'Error updating preview table: ' + textStatus );

    });

    this._updating = false;

  };

  // Export the public API.

  pdp.preview = preview;

  return pdp;

}( PDP || {} ));
