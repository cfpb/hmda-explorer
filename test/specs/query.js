(function(){

  'use strict';

  describe('Query builder', function(){

    it('stores its params in an object called params', function(){

      expect( PDP.query.params ).not.toBeUndefined();

    });

    it('should be able to clear out its params', function(){

      PDP.query.reset();

      expect( _.isEmpty( PDP.query.params ) ).toBeTruthy();

    });

    it('should be able to reset with defaults', function(){

      PDP.query.reset({ defaults: true });

      expect( PDP.query.params['as_of_year'].values[0] ).toBe( 2011 );

    });

    it('properly deserialize a URL\'s hash params', function(){

      window.location.hash = '#!/as_of_year=2011&state_abbr=OR';

      var params = PDP.query.updateAll({ source: 'url' }),
          paramsStringified = JSON.stringify( PDP.query.params ),
          result = '{"as_of_year":{"values":["2011"],"comparator":"="},"state_abbr":{"values":["OR"],"comparator":"="}}';

      expect( paramsStringified ).toBe( result );

    });

    it('should be able to generate a URL hash', function(){

      var originalHash = '#!/as_of_year=2011&state_abbr=OR';

      window.location.hash = originalHash;

      var params = PDP.query.updateAll({ source: 'url' }),
          generatedHash = '#' + PDP.query.generateUrlHash(),
          expectedHash = '#!/as_of_year=2011&state_abbr=OR&section=filters';

      expect( generatedHash ).toBe( expectedHash );

    });

    it('should be able to generate an API URL with a where clause', function(){

      var originalHash = '#!/as_of_year=2011&state_abbr=OR';

      window.location.hash = originalHash;

      var params = PDP.query.updateAll({ source: 'url' }),
          generatedUrl = PDP.query.generateApiUrl(),
          expectedUrl = PDP.query.debug ? 'static/js/dummy_data/slice/hmda_lar.json?&$where=as_of_year=2011+AND+state_abbr=%22OR%22' : 'http://qu.demo.cfpb.gov/data/hmda/slice/hmda_lar.jsonp?$callback=?&$where=as_of_year=2011+AND+state_abbr=%22OR%22';

      expect( generatedUrl ).toBe( expectedUrl );

    });

    it('should be able to generate an API URL when a param has multiple values', function(){

      var originalHash = '#!/as_of_year=2012,2011';

      window.location.hash = originalHash;

      var params = PDP.query.updateAll({ source: 'url' }),
          generatedUrl = PDP.query.generateApiUrl(),
          expectedUrl = PDP.query.debug ? 'static/js/dummy_data/slice/hmda_lar.json?&$where=(as_of_year=2012+OR+as_of_year=2011)' : 'http://qu.demo.cfpb.gov/data/hmda/slice/hmda_lar.jsonp?$callback=?&$where=(as_of_year=2012+OR+as_of_year=2011)';

      expect( generatedUrl ).toBe( expectedUrl );

    });

    it('should be able to generate an API URL with select and group clauses', function(){
      var configObj, generatedUrl, productionUrl, demoUrl;

      configObj = {
        clauses: {
          'select': ['state_name', 'applicant_sex_name'],
          'group': ['state_name', 'applicant_sex_name']
        }
      };
      generatedUrl = PDP.query.generateApiUrl( 'json', configObj );
      productionUrl = 'http://qu.demo.cfpb.gov/data/hmda/slice/hmda_lar.json?&$select=applicant_sex_name,state_name&$group=applicant_sex_name,state_name';
      demoUrl = 'static/js/dummy_data/slice/hmda_lar.json?&$select=applicant_sex_name,state_name&$group=applicant_sex_name,state_name';

  expect( generatedUrl ).toBe( demoUrl );

    });

    it('should be able to generate an API URL with select, where and group clauses', function(){
      var originalHash, params, configObj, generatedUrl, productionUrl, demoUrl;
          
      originalHash = '#!/as_of_year=2012,2011';

      window.location.hash = originalHash;

      params = PDP.query.updateAll({ source: 'url' }),

      configObj = {
        clauses: {
          'select': ['state_name', 'applicant_sex_name'],
          'group': ['state_name', 'applicant_sex_name'],
          'where': PDP.query.params
        }
      };
      generatedUrl = PDP.query.generateApiUrl( 'json', configObj );
      productionUrl = 'http://qu.demo.cfpb.gov/data/hmda/slice/hmda_lar.json?&$select=applicant_sex_name,state_name&$group=applicant_sex_name,state_name&$where=(as_of_year=2012%20OR%20as_of_year=2011)';
      demoUrl = 'static/js/dummy_data/slice/hmda_lar.json?&$select=applicant_sex_name,state_name&$group=applicant_sex_name,state_name&$where=(as_of_year=2012+OR+as_of_year=2011)';

      expect( generatedUrl ).toBe( demoUrl );

    });

  });

})();
