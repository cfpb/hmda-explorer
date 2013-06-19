define([
    'underscore',
    'backbone'
  ], function( _, Backbone ) {

  var WidgetModel = Backbone.Model.extend({

    defaults: {

      label: '',
      type: 'select',
      visibile: true,
      modified: new Date()

    }

  });

  return WidgetModel;

});
