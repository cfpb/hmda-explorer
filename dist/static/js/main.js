// This file is interpreted *after* all modules have loaded.

// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  // Listen for specific events and act accordingly.

  pdp.observer.addListeners({

    // When the DOM is loaded: Initalize the app and update the `query.params` hash.

    'dom:loaded': [
      pdp.app.init.bind( pdp.app )
    ],

    // When the app is ready: Start the app and stop any loading visualizations.

    'app:ready': [
      pdp.app.start.bind( pdp.app ),
      pdp.app.stopLoading.bind( pdp.app ),
      // kind of a hack to run init. summarytable shouldn't always init anyway.
      pdp.summaryTable.init.bind( pdp.summaryTable )
    ],

    // After the app has started.

    'app:started': [
      pdp.form.updateShareLink.bind( pdp.form ),
      pdp.preview.update.bind( pdp.preview )
    ],

    // When a field is changed: Update the `query.params` hash, check form
    // field dependencies and update the share link.

    'field:changed': [
      pdp.query.updateAll.bind( pdp.query ),
      pdp.form.checkDeps.bind( pdp.form ),
      pdp.form.updateShareLink.bind( pdp.form )
    ],

    // When a popular field is changed: SetFields to synchronize things.

    'navigation:clicked': [
      pdp.app.changeSection.bind( pdp.app )
    ],

    // When the `query.params` hash is finished updating,
    // update the preview table.
    'params:updated': [
      pdp.preview.update.bind( pdp.preview )
    ],

    // When a previously hidden field is shown: Update the field's options.

    'field:shown': [
      pdp.form.enableField.bind( pdp.form ),
      pdp.form.updateFieldOptions.bind( pdp.form )
    ],

    // When a field is hidden.

    'field:hidden': [
      pdp.form.resetField.bind( pdp.form ),
      pdp.form.disableField.bind( pdp.form )
    ],

    // When a field's options are updated.

    'field:updated': [
      pdp.form.setFields.bind( pdp.form )
    ],

    // When an update is started: Start loading visualizations.

    'update:started': pdp.app.startLoading.bind( pdp.app ),

    // When an update is stopped: Stop loading visualizations.

    'update:stopped': pdp.app.stopLoading.bind( pdp.app ),

    'download': pdp.app.redirect.bind( pdp.app )

  });

  // Export the public API.

  return pdp;

}( PDP || {} ));
