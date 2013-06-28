define([
    'jquery',
    'backbone',
    'underscore',
    'models/field'
  ], function( $, Backbone, _, Field ) {

  var FieldCollection = Backbone.Collection.extend({

    model: Field,

    // Parses JSON, returning an array of artifacts
    parse: function( json ) {

      console.log('parsing json');

      var fields = _.map( json, function( item ){

        // Build an artifact from each JSON record
        var field = {
          label: 'Test label',
          slug: Math.floor((Math.random() * ((9999999999 + 1) - 1111111111)) + 1111111111)
        };

        // Return the artifact we've built
        return field;

      }, this);

      return fields;

    }

  });

  return FieldCollection;

});
