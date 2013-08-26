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

  preview.$el = $('#preview-table');

  // Export the public API.

  pdp.preview = preview;

  return pdp;

}( PDP || {} ));
