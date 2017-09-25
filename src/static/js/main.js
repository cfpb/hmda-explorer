// This file is interpreted *after* all modules have loaded.
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
      pdp.summaryTable.init.bind( pdp.summaryTable )
    ],

    // After the app has started.
    'app:started': [
      pdp.form.updateShareLink.bind( pdp.form ),
      pdp.form.updateFieldOptions.bind( pdp.form ),
      pdp.preview.update.bind( pdp.preview )
    ],

    // When a field is changed: Update the `query.params` hash, check form
    // field dependencies and update the share link.
    'field:changed': [
      pdp.form.checkDeps.bind( pdp.form ),
      pdp.form.checkMutuallyExclusive.bind( pdp.form ),
      pdp.query.updateAll.bind( pdp.query ),
      pdp.form.updateShareLink.bind( pdp.form ),
      pdp.query.setCookie.bind( pdp.query )
    ],

    // When the popular/all nav is clicked: change to the appropriate section
    // and update the share link to reflect the new section.
    'navigation:clicked': [
      pdp.app.changeSection.bind( pdp.app ),
      pdp.form.updateShareLink.bind( pdp.form )
    ],

    // When the `query.params` hash is finished updating,
    // update the preview table and store the params.
    'params:updated': [
      pdp.preview.update.bind( pdp.preview )
    ],

    // When a previously hidden field is shown: Update the field's options.
    'field:shown': [
      pdp.form.showField.bind( pdp.form ),
      pdp.form.enableField.bind( pdp.form ),
      pdp.form.updateFieldOptions.bind( pdp.form )
    ],

    // When a field is hidden.
    'field:hidden': [
      pdp.form.resetField.bind( pdp.form ),
      pdp.form.disableField.bind( pdp.form ),
      pdp.form.hideField.bind( pdp.form )
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
