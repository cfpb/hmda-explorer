define([
    'jquery',
    'backbone',
    'underscore'
  ], function( $, Backbone, _ ) {

  var FieldsView = Backbone.View.extend({

    tagName: 'div',

    className: 'fields',

    //template: _.template( someTemplate ),

    events: {


    },

    render: function() {

      this.$el.html( this.template( this.model.toJSON() ) );
      return this;

    }

  });

  return FieldsView;

});
