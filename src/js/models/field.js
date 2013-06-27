define([
    'underscore',
    'backbone'
  ], function( _, Backbone ) {

  var FieldModel = Backbone.Model.extend({

    defaults: {

      label: '',
      slug: '',
      type: 'select',
      options: [
        {
          label: 'one'
        },
        {
          label: 'two'
        },
        {
          label: 'three'
        }
      ],
      visible: true,
      popular: false,
      created: new Date()

    }

  });

  return FieldModel;

});
