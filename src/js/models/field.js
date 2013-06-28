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
          label: 'One',
          slug: 'one'
        },
        {
          label: 'Two',
          slug: 'two'
        },
        {
          label: 'Three',
          slug: 'three'
        }
      ],
      requires: [],
      visible: true,
      popular: false,
      created: new Date()

    }

  });

  return FieldModel;

});
