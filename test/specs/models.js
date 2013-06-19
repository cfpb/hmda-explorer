define([
  'backbone',
  'models/widget'
  ], function( Backbone, Widget ) {

  describe('Widget model', function(){

    it('should have a default type', function(){

      var widget = new Widget();
      expect(widget.get('type')).toBe('select');

    });

  });

});
