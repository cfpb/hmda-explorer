// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  // The Observer
  // ----------------
  // The [observer pattern](http://en.wikipedia.org/wiki/Observer_pattern) 
  // is used to decouple DOM elements from events. The [EventEmitter](https://github.com/Wolfy87/EventEmitter)
  // library is used.

  var observer = new EventEmitter();

  // Export the public API.

  pdp.observer = observer;

  return pdp;

}( PDP || {} ));
