define([
    'jquery',
    'backbone',
    'underscore',
    'text!templates/select.html',
    'text!templates/chosen.html',
    'text!templates/checkbox.html',
    'text!templates/radio.html',
    'text!templates/text.html'
  ], function( $, Backbone, _, selectTemplate, chosenTemplate, checkboxTemplate, radioTemplate, textTemplate ) {

  var FieldView = Backbone.View.extend({

    tagName: 'div',

    className: 'field',

    template: function( type, json ) {

      var temp;

      // You want to fight about it?
      eval('temp = ' + type + 'Template');

      var tmpl = _.template( temp );

      return tmpl( json );

    },

    render: function() {

      return this.template( this.model.get('type'), this.model.toJSON() );

    }

  });

  return FieldView;

});
