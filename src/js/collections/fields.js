define([
    'jquery',
    'backbone',
    'underscore',
    'models/field'
  ], function( $, Backbone, _, Field ) {

  var FieldCollection = Backbone.Collection.extend({

    model: Field

  });

  return FieldCollection;

});
