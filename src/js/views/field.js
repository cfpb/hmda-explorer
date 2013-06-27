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

      var template = _.template( type + 'Template' );

      return template( json );

    },

    events: {


    },

    render: function() {

      this.$el.html( this.template( this.model.get('type'), this.model.toJSON() ) );
      return this;

    }

  });

  return FieldView;

});
