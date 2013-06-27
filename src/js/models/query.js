define([
    'underscore',
    'backbone'
  ], function( _, Backbone ) {

  var QueryModel = Backbone.Model.extend({

    defaults: {

      label: '',
      type: 'select',
      visibile: true,
      modified: new Date()

    }

  });

  return QueryModel;

});
