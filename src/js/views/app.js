define([
    'jquery',
    'backbone',
    'underscore',
    'models/app',
    'layoutmanager'
  ], function( $, Backbone, _, App, LayoutManager ) {

  var AppView = Backbone.View.extend({

    el: '',

    model: new App(),

    initialize: function() {
      var foo = new LayoutManager();
      return foo;
    },

    events: {

    },

    render: function() {

    },

  });

  return AppView;

});
