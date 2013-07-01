define([
    'underscore',
    'backbone'
  ], function( _, Backbone ) {

  var FieldModel = Backbone.Model.extend({

    defaults: {

      label: '',
      slug: '',
      type: 'select',
      options: [],
      requires: '',
      help: '',
      section: '',
      visible: true,
      disabled: false,
      created: new Date()

    }

  });

  return FieldModel;

});
