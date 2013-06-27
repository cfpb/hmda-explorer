define([
    'jquery',
    'backbone',
    'underscore',
    'models/app',
    'views/fields'
  ], function( $, Backbone, _, App, fieldsView ) {

  var AppView = Backbone.View.extend({

    el: '#filter',

    model: new App(),

    initialize: function() {

    },

    events: {

    },

    render: function() {

      this.$el.html( fieldsView.render().el );

    }

  });

  return AppView;

});
