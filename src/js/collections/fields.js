define([
    'backbone',
    'underscore',
    'models/field'
  ], function( Backbone, _, Field ) {

  var FieldCollection = Backbone.Collection.extend({

    model: Field,

    // Parses JSON, returning an array of fields
    parse: function( json ) {

      // Pull out the fields array
      var fields = json.fields;

      // Process the array and create models
      fields = _.map( fields, function( item ){

        // Build a field from each JSON record
        var field = {
          label: item.label,
          slug: item.slug,
          type: item.type,
          options: item.options,
          requires: item.requires,
          help: item.help,
          section: item.section,
          visible: item.visible,
          disabled: item.disabled
        };

        // Return the field we've built
        return field;

      }, this);

      return fields;

    }

  });

  return FieldCollection;

});
