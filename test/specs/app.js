(function(){

  'use strict';

  describe('The data platform', function(){

    it('should provide an object called PDP', function(){

        expect( PDP ).not.toBeUndefined();

    });

    it('should have a container element', function(){

      PDP.app.init();

      expect( PDP.app.$el ).not.toBeUndefined();

    });

    it('should initialize the form when it starts', function(){

      spyOn(PDP.form, 'checkLocations');
      spyOn(PDP.form, 'init');
      spyOn(PDP.form, 'setFields');
      spyOn(PDP.form, 'checkFilters');

      PDP.app.start();

      expect( PDP.form.checkLocations ).toHaveBeenCalled();
      expect( PDP.form.init ).toHaveBeenCalled();
      expect( PDP.form.setFields ).toHaveBeenCalled();
      expect( PDP.form.checkFilters ).toHaveBeenCalled();

    });

    describe('The app\'s URL', function(){

      it('should know its values', function(){

        var originalHash = '#!/as_of_year=2011&state_abbr=OR',
            expectedArray = [ { name : 'as_of_year', values : [ '2011' ], comparator : '=' }, { name : 'state_abbr', values : [ 'OR' ], comparator : '=' } ];

        window.location.hash = originalHash;

        expect( PDP.app.getUrlValues() ).toEqual( expectedArray );

      });

    });

  });

})();
