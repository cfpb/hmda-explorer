define([
  'backbone',
  'models/field'
  ], function( Backbone, Field ) {

  describe('Field model', function(){

    it('should have a default type', function(){

      var field = new Field();
      expect( field.get('type') ).toBe('select');

    });

    it('should accept overrided properties', function(){

      var field = new Field({type: 'checkbox'});
      expect( field.get('type') ).toBe('checkbox');

    });

  });

});
