(function(){

  'use strict';

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

})();
