define([
    'jquery',
    'backbone',
    'underscore',
    'models/app',
    'collections/fields',
    'views/fields'
  ], function( $, Backbone, _, App, Fields, FieldsView ) {

  var AppView = Backbone.View.extend({

    el: '#filter',

    model: new App(),

    initialize: function() {

      console.log('initialized app view');

      // Bind this views' methods to its instantiation
      _.bindAll( this, 'render' );

      // Instantiate a Fields collection
      this.fields = new Fields([], { url: '/data.json' });

      this.fields.on( 'sync', this.render );

      // Fetch our fields
      this.fields.fetch({ timeout: 20000 });

    },

    events: {

    },

    render: function() {

      console.log('rendered app view');

      var fieldsView = new FieldsView({ collection: this.fields });

      this.$el.html( fieldsView.render().el );

    }

  });

  return AppView;

});
