define([
  'backbone',
  'models/field'
  ], function( Backbone, Field ) {

  describe('Field model', function(){

    it('should have a default type', function(){

      var field = new Field();
      expect(field.get('type')).toBe('select');

    });

  });

});
