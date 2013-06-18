define([
    'jquery',
    'backbone',
    'underscore',
    'models/app'
  ], function( $, Backbone, _, App ) {

  var AppView = Backbone.View.extend({

    el: '',

    model: new App(),

    initialize: function() {

    },

    events: {

    },

    render: function() {

    }

  });

  return AppView;

});
