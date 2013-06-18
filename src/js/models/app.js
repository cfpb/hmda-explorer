define([
    'config'
  ], function( config ) {

  var AppModel = Backbone.Model.extend({

    // Manually override these values in config.js
    defaults: function() {

      return {
        title: config.title || this.getTitle()
      };

    },

    getTitle: function() {

      // You could do some magic here
      var title = 'Untitled';

      return title;

    }

  });

  return AppModel;

});
