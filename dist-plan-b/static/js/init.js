// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  // Init.js
  // ----------------
  // Start doing stuff!

  // Listen for specific events and act accordingly.

  pdp.observer.addListeners({
    'dom:loaded': pdp.app.init.bind( pdp.app ),
    'app:ready': [
      pdp.app.start.bind( pdp.app ),
      pdp.app.stopLoading.bind( pdp.app )
    ],
    'filter:changed': [
      pdp.query.updateAll.bind( pdp.query ),
      pdp.form.checkDeps.bind( pdp.form )
    ],
    'field:shown': [
      pdp.form.updateField.bind( pdp.form )
    ],
    'update:started': pdp.app.startLoading.bind( pdp.app ),
    'update:stopped': pdp.app.stopLoading.bind( pdp.app ),
    'download': pdp.app.redirect.bind( pdp.app )

  });

  // Export the public API.

  return pdp;

}( PDP || {} ));
