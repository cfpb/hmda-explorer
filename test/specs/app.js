(function(){

  'use strict';

  function setUpAppFixture() {
    jasmine.getFixtures().set('<div id="filters"><div class="app-section filters" id="foo"></div><div class="app-section summary" id="bar"></div><li class="field as_of_year"><label for="as_of_year">Select year(s) of data:</label><div class="widget select"><select class="param" name="as_of_year" id="as_of_year" multiple data-placeholder="Select one or more years"><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option></select></div></li></div>');
  }

  describe('The data platform', function(){

    it('should provide an object called PDP', function(){
      expect( PDP ).not.toBeUndefined();
    });

    it('should have a container element', function(){
      PDP.app.init();
      expect( PDP.app.$el ).not.toBeUndefined();
    });

    it('should indicate that it\'s loading', function() {
      setUpAppFixture();
      PDP.app.$el = $('#filters');
      PDP.app.startLoading();
      expect( $('#filters').attr('class').indexOf('loading') ).toBeGreaterThan( -1 );
    });

    it('should indicate that it\'s done loading', function() {
      setUpAppFixture();
      PDP.app.$el = $('#filters');
      PDP.app.stopLoading();
      expect( $('#filters').attr('class') ).toBeFalsy();
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
