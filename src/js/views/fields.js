define([
    'jquery',
    'backbone',
    'underscore',
    'views/field'
  ], function( $, Backbone, _, FieldView ) {

  var FieldsView = Backbone.View.extend({

    tagName: 'div',

    className: 'fields',

    initialize: function() {

      this.fragment = document.createDocumentFragment();
      this.isRendered = false;

      //this.listenTo( this.collection, 'add', this.addField );

    },

    events: {


    },

    addField: function ( field ) {

      var fieldView = new FieldView({ model: field });

      this.$el.append( fieldView.render().el );

      return this;

    },

    render: function() {

      this.collection.each( this.addField, this );
      return this;

    }

  });

  return FieldsView;

});
