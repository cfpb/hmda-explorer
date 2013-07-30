// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  // DOM Interactions
  // ----------------
  // jQuery is used to attach event handlers to DOM elements.

  var pdpd = pdp;

  // Whenever a `select` element is changed, emit an event.

  $('.field select, .field input').on( 'change', function(){
    pdp.observer.emitEvent('filter:changed', $( this ) );
  });

  // When the DOM is Ready
  // ----------------

  $(function() {

    pdpd.observer.emitEvent('dom:loaded');

  });

  return pdp;

}( PDP || {} ));
