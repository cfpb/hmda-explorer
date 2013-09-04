// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  // The App Object
  // ----------------
  // The `app` object stores global app properties and methods.

  var app = {};

  // Cache a reference to the app's jQuery object.

  app.$el = $('#filters');

  // The `init` method is called when the DOM is loaded so we can do some preparation.

  app.init = function() {

    // Activate [chosen](http://harvesthq.github.io/chosen/) on select elements.

    app.$el.find('select').chosen({ width: '100%' });

    // Broadcast that the app is loaded and good to go.

    pdp.observer.emitEvent('app:ready');
    this.$el.addClass('ready');

  };

  // The `start` method is called when we're ready for the app to start chooglin'.

  app.start = function() {

    console.log('App started!');

    // Broadcast that the app has started.

    pdp.observer.emitEvent('app:started');

  };

  // The `startLoading` method adds a class to the app's element so we can
  // visualize the loading of content.

  app.startLoading = function() {

    this.$el.addClass('loading');

  };

  // The `stopLoading` method removes the app's loading class.

  app.stopLoading = function() {

    this.$el.removeClass('loading');

  };

  // The `redirect` method redirects the browser to a new URL.
  // It is used to send the user to the Qu URL with their results.

  app.redirect = function() {
    console.log('The user has been redirected!');
  };

  // Export the public API.

  pdp.app = app;

  return pdp;

}( PDP || {} ));
