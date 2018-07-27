(function(){

  'use strict';

  describe('Query builder', function(){

    it('stores its params in an object called params', function(){

      expect( PDP.query.params ).not.toBeUndefined();

    });

    it('should be able to clear out its params', function(){

      PDP.query.reset();

      expect( Object.keys( PDP.query.params ).length ).toEqual( 1 );

    });

    it('should be able to reset with defaults', function(){

      PDP.query.reset( 'common' );

      expect( PDP.query.params['property_type'].values[1] ).toBe( 2 );
      expect( PDP.query.params['owner_occupancy'].values[0] ).toBe( 1 );
      expect( PDP.query.params['lien_status'].values[0] ).toBe( 1 );

    });

    it('should be able to store params in a cookie', function(){

      PDP.query.setCookie();
    
      expect( $.cookie('_hmda') ).toBeDefined();
    
    });

    it('should be able to retrive its cookie', function(){
    
      expect( PDP.query.getCookie() ).toBeDefined();
    
    });

    it('should properly deserialize a URL\'s hash params', function(){

      window.location.hash = '#!/as_of_year=2011&state_abbr=OR';

      var params = PDP.query.updateAll({ source: 'url' }),
          paramsStringified = JSON.stringify( PDP.query.params ),
          result = '{"as_of_year":{"values":["2011"],"comparator":"="},"state_abbr":{"values":["OR"],"comparator":"="}}';

      expect( paramsStringified ).toBe( result );

    });

    it('replaces all years explicitly if user removes year from form', function(){
      window.location.hash = '#!/state_abbr=OR';
      PDP.query.updateAll({ source: 'url' });
      expect( PDP.query.params.as_of_year.values.length ).toBe(11);
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
          expectedUrl = PDP.query.endpoint + 'slice/hmda_lar.jsonp?$callback=?&$where=as_of_year=2011+AND+state_abbr=%22OR%22&$select=tract_to_msamd_income,rate_spread,population,minority_population,number_of_owner_occupied_units,number_of_1_to_4_family_units,loan_amount_000s,hud_median_family_income,applicant_income_000s,state_name,state_abbr,sequence_number,respondent_id,purchaser_type_name,property_type_name,preapproval_name,owner_occupancy_name,msamd_name,loan_type_name,loan_purpose_name,lien_status_name,hoepa_status_name,edit_status_name,denial_reason_name_3,denial_reason_name_2,denial_reason_name_1,county_name,co_applicant_sex_name,co_applicant_race_name_5,co_applicant_race_name_4,co_applicant_race_name_3,co_applicant_race_name_2,co_applicant_race_name_1,co_applicant_ethnicity_name,census_tract_number,as_of_year,application_date_indicator,applicant_sex_name,applicant_race_name_5,applicant_race_name_4,applicant_race_name_3,applicant_race_name_2,applicant_race_name_1,applicant_ethnicity_name,agency_name,agency_abbr,action_taken_name';

      expect( generatedUrl ).toBe( expectedUrl );

    });

    it('should be able to generate an API URL when a param has multiple values', function(){

      var originalHash = '#!/as_of_year=2012,2011';

      window.location.hash = originalHash;

      var params = PDP.query.updateAll({ source: 'url' }),
          generatedUrl = PDP.query.generateApiUrl(),
          expectedUrl = PDP.query.endpoint + 'slice/hmda_lar.jsonp?$callback=?&$where=as_of_year+IN+(2012,2011)&$select=tract_to_msamd_income,rate_spread,population,minority_population,number_of_owner_occupied_units,number_of_1_to_4_family_units,loan_amount_000s,hud_median_family_income,applicant_income_000s,state_name,state_abbr,sequence_number,respondent_id,purchaser_type_name,property_type_name,preapproval_name,owner_occupancy_name,msamd_name,loan_type_name,loan_purpose_name,lien_status_name,hoepa_status_name,edit_status_name,denial_reason_name_3,denial_reason_name_2,denial_reason_name_1,county_name,co_applicant_sex_name,co_applicant_race_name_5,co_applicant_race_name_4,co_applicant_race_name_3,co_applicant_race_name_2,co_applicant_race_name_1,co_applicant_ethnicity_name,census_tract_number,as_of_year,application_date_indicator,applicant_sex_name,applicant_race_name_5,applicant_race_name_4,applicant_race_name_3,applicant_race_name_2,applicant_race_name_1,applicant_ethnicity_name,agency_name,agency_abbr,action_taken_name';

      expect( generatedUrl ).toBe( expectedUrl );

    });

    it('should be able to generate where clause when there are multiple locations', function(){

      var originalHash = '#!/as_of_year=2011&state_abbr-1=AZ&county_name-1=04011,04013&state_abbr-2=CA&county_name-2=06009,06069&section=filters';

      window.location.hash = originalHash;

      var params = PDP.query.updateAll({ source: 'url' }),
          generatedUrl = PDP.query.generateApiUrl(),
          expectedUrl = PDP.query.endpoint + 'slice/hmda_lar.jsonp?$callback=?&$where=as_of_year=2011+AND+state_abbr+IN+(%22AZ%22,%22CA%22)+AND+county_name+IN+(04011,04013,06009,06069)&$select=tract_to_msamd_income,rate_spread,population,minority_population,number_of_owner_occupied_units,number_of_1_to_4_family_units,loan_amount_000s,hud_median_family_income,applicant_income_000s,state_name,state_abbr,sequence_number,respondent_id,purchaser_type_name,property_type_name,preapproval_name,owner_occupancy_name,msamd_name,loan_type_name,loan_purpose_name,lien_status_name,hoepa_status_name,edit_status_name,denial_reason_name_3,denial_reason_name_2,denial_reason_name_1,county_name,co_applicant_sex_name,co_applicant_race_name_5,co_applicant_race_name_4,co_applicant_race_name_3,co_applicant_race_name_2,co_applicant_race_name_1,co_applicant_ethnicity_name,census_tract_number,as_of_year,application_date_indicator,applicant_sex_name,applicant_race_name_5,applicant_race_name_4,applicant_race_name_3,applicant_race_name_2,applicant_race_name_1,applicant_ethnicity_name,agency_name,agency_abbr,action_taken_name';

      expect( generatedUrl ).toBe( expectedUrl );

    });

    it('should be able to generate an API URL with select and group clauses', function(){
      var originalHash, params, configObj, generatedUrl, expectedUrl;

      configObj = {
        clauses: {
          select: ['state_name', 'applicant_sex_name'],
          group: ['state_name', 'applicant_sex_name']
        }
      };
      generatedUrl = PDP.query.generateApiUrl( 'json', true, configObj );
      expectedUrl = PDP.query.endpoint + 'slice/hmda_lar.json?&$select=applicant_sex_name,state_name&$group=applicant_sex_name,state_name&$orderBy=state_name,applicant_sex_name';

  expect( generatedUrl ).toBe( expectedUrl );

    });

    it('should be able to generate an API URL with select, where and group clauses', function(){
      var originalHash, params, configObj, generatedUrl, expectedUrl;

      originalHash = '#!/as_of_year=2012,2011';

      window.location.hash = originalHash;

      params = PDP.query.updateAll({ source: 'url' });

      configObj = {
        clauses: {
          'select': ['state_name', 'applicant_sex_name'],
          'group': ['state_name', 'applicant_sex_name'],
          'where': PDP.query.params
        }
      };

      generatedUrl = PDP.query.generateApiUrl( 'json', true, configObj );
      expectedUrl = PDP.query.endpoint + 'slice/hmda_lar.json?&$select=applicant_sex_name,state_name&$group=applicant_sex_name,state_name&$orderBy=state_name,applicant_sex_name&$where=as_of_year+IN+(2012,2011)';

      expect( generatedUrl ).toBe( expectedUrl );

    });

  });

})();
