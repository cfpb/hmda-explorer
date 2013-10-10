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
