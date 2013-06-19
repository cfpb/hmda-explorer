define([
    'jquery',
    'backbone',
    'underscore',
    'models/widget'
  ], function( $, Backbone, _, Widget ) {

  var WidgetCollection = Backbone.Collection.extend({

    model: Widget

  });

  return WidgetCollection;

});
