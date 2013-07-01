define([
    'jquery',
    'backbone',
    'underscore',
    'models/app',
    'collections/fields',
    'views/fields'
  ], function( $, Backbone, _, App, Fields, FieldsView ) {

  var AppView = Backbone.View.extend({

    el: '#filters',

    model: new App(),

    initialize: function() {

      console.log('initialized app view');

      // Bind this views' methods to its instantiation
      _.bindAll( this, 'render' );

      // Instantiate a Fields collection
      this.fields = new Fields([], { url: '/definition.json' });

      this.fields.on( 'sync', this.render );

      // Fetch our fields
      this.fields.fetch({ timeout: 20000 });

    },

    events: {

    },

    render: function() {

      var fieldsView = new FieldsView({ collection: this.fields });

      this.$el.html( fieldsView.render().el );

    }

  });

  return AppView;

});
