(function(){

  'use strict';

  function setUpErrorFixture() {
    jasmine.getFixtures().set('<div id="error"></div>');
  }

  describe('The browser\'s window object', function(){
    it('should exist', function(){
      expect( window ).not.toBeUndefined();
    });
    it('should have a location property', function(){
      expect( window.location ).not.toBeUndefined();
    });
    it('should have a hash property', function(){
      expect( window.location.hash ).not.toBeUndefined();
    });
  });

  describe('The utils hash param getter', function(){
    it('should get hash params from the url', function(){
      window.location.hash = '#!/as_of_year=2011&state_abbr=OR';
      var hashParams = JSON.stringify( PDP.utils.getHashParams() ),
          result = '{"as_of_year":{"values":"2011","comparator":"="},"state_abbr":{"values":"OR","comparator":"="}}';
      expect( hashParams ).toBe( result );
    });
  });

  describe('The native bind method', function(){
    it('should be defined', function(){
      var foo = function(){
        return true;
      };
      expect( foo.bind ).not.toBeUndefined();
    });
  });

  describe('emptyObject', function() {
      var _data = [
        [[], true, 'should return true on empty array'],
        [[''], true, 'should return true on array containing only empty values'],
        [[null], true, 'should return true on array containing only null values'],
        [['hello'], false, 'should return false on array containing a value'],
        [['', 'hello'], false, 'should return false on array containing at least one value']
      ];
      using( _data, function(val) {
        it('', function(){
          expect(PDP.utils.emptyObject(val[0]))
            .toEqual(val[1]);
        });
     });
  });

  describe('Error handling', function(){
    it('should show an error message', function() {
      setUpErrorFixture();
      PDP.utils.showError('foo');
      expect($('#error').text()).toBe('foo');
    });
  });

  describe('Filesize estimator', function(){
    it('should show bytes correctly', function() {
      var fs = PDP.utils.getPrettyFilesize(0);
      expect(fs).toBe('0 byte');
      fs = PDP.utils.getPrettyFilesize(1);
      expect(fs).toBe('1 byte');
      fs = PDP.utils.getPrettyFilesize(100);
      expect(fs).toBe('100 bytes');
      fs = PDP.utils.getPrettyFilesize(10000);
      expect(fs).toBe('10 KB');
      fs = PDP.utils.getPrettyFilesize(10485778);
      expect(fs).toBe('10.0 MB');
      fs = PDP.utils.getPrettyFilesize(760737418249);
      expect(fs).toBe('708.5 GB');
    });
  });

  describe('Misc. utils', function(){
    it('should show an error message', function() {
      var obj = PDP.utils.nonEmptyValues({});
      expect(obj.length).toBe(0);
      obj = PDP.utils.nonEmptyValues('foo');
      expect(JSON.stringify(obj)).toBe(JSON.stringify([]));
    });
    it('require numeric values in certain fields', function() {
      setUpErrorFixture();
      // PDP.utils.requireNumeric();
      var e = jQuery.Event('keydown');
      e.which = 0;
      $('#error').on( 'keydown', PDP.utils.requireNumeric );
      $('#error').trigger(e);
      expect( $('.tooltip').length ).toEqual( 1 );
    });
  });

})();
