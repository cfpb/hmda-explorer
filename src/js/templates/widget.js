define([
    'jquery',
    'backbone',
    'underscore',
    'text!templates/widget.html'
  ], function( $, Backbone, _, widgetTemplate ) {

  var WidgetView = Backbone.View.extend({

    tagName: 'div',

    className: 'widget',

    template: _.template( widgetTemplate ),

    events: {


    },

    render: function() {

      this.$el.html( this.template( this.model.toJSON() ) );
      return this;

    }

  });

  return WidgetView;

});
