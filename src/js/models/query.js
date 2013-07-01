define([
    'config',
    'backbone'
  ], function( config, Backbone ) {

  var QueryModel = Backbone.Model.extend({

    // Manually override these values in config.js
    defaults: function() {

      return {
        endpoint: config.endpoint || this.getEndpoint()
      };

    },

    getEndpoint: function() {

      // You could do some magic here
      var endpoint = 'http://qu.demo.cfpb.gov/';

      return endpoint;

    }

  });

  return QueryModel;

});
