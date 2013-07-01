define([
    'jquery',
    'backbone',
    'underscore',
    'views/field',
    'text!templates/fields.html'
  ], function( $, Backbone, _, FieldView, fieldsTemplate ) {

  var FieldsView = Backbone.View.extend({

    tagName: 'div',

    fields: {},

    template: _.template( fieldsTemplate ),

    initialize: function() {

      this.fragment = document.createDocumentFragment();
      this.isRendered = false;

      //this.listenTo( this.collection, 'add', this.addField );
      this.collection.each( this.addField, this );

    },

    events: {

      'change select': 'alertChange'

    },

    alertChange: function( ev ) {

      var slug = $(ev.target).attr('name');

      if ( $(ev.target).val() ) {

        $('li[data-requires="' + slug + '"]').removeClass('hidden');

      } else {

        $('li[data-requires="' + slug + '"]').addClass('hidden');

      }

      console.log(  );

    },

    addField: function ( field ) {

      var fieldView = new FieldView({ model: field });

      this.fields[ field.get('slug') ] = fieldView.render();

      return this;

    },

    render: function() {

      this.$el.html( this.template( this.fields ) );

      return this;

    }

  });

  return FieldsView;

});
