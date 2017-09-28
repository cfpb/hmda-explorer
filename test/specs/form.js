(function(){

  'use strict';

  function setUpPropertyFixture() {
    jasmine.getFixtures().set('<div class="filter property closed" id="property"><div class="title"><a href="#property"><h3><i class="icon-minus-alt"></i> Property</h3></a><div class="desc">Property type and occupancy</div></div><ul class="fields"><li class="field popular"><label for="property_type">Property Type:</label><div class="widget checkbox"><label><input type="checkbox" class="param" name="property_type[]" value="1" id="foo"/>One-to-four family dwelling<br><label class="helper-text"> (other than manufactured housing)</label></label><label><input type="checkbox" class="param" name="property_type[]" value="2" />Manufactured housing</label><label><input type="checkbox" class="param" name="property_type[]" value="3" />Multifamily dwelling</label></div><div class="help" role="tooltip"><i class="icon-help-alt"></i></div><span class="help-text"><%= explore_tooltips_property_type %></span></li><li class="field popular"><label for="owner_occupancy">Will the owner use the property<br> as their primary residence?</label><div class="widget checkbox"><label><input type="checkbox" class="param" name="owner_occupancy[]" value="1" />Owner-occupied as a principal dwelling</label><label><input type="checkbox" class="param" name="owner_occupancy[]" value="2" />Not owner-occupied as a principal dwelling</label><label><input type="checkbox" class="param" name="owner_occupancy[]" value="3" />Not applicable</label></div><div class="help" role="tooltip"><i class="icon-help-alt"></i></div><span class="help-text">help text</span></li></ul></div>');
  }

  function setUpParamFixture() {
    jasmine.getFixtures().set('<div id="filters"><li class="field as_of_year"><label for="as_of_year">Select year(s) of data:</label><div class="widget select"><select class="param" name="as_of_year" id="as_of_year" multiple data-placeholder="Select one or more years"><option value="2014" selected></option><option value="2013"></option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option></select></div></li></div>');
  }

  function setUpRateSpreadFixture() {
    jasmine.getFixtures().set('<div id="filters"><li class="field rate_spread"><label for="rate_spread">Is it a higher-priced loan?</label><div class="widget radio inline rate_spread"><label><input type="radio" class="param" name="rate_spread" data-comparator="!=" value="null">Yes</label><label><input type="radio" class="param" name="rate_spread" data-comparator="=" value="null">No</label></div><div class="help" role="tooltip" data-original-title="" title=""><i class="cf-icon cf-icon-help-round"></i></div><span class="help-text">Generally, higher-priced loans are defined as loans with annual percentage rates (APRs) that exceed the average prime offer rate (APOR) for a comparable transaction by at least 1.5 percentage points for first-lien loans and 3.5 percentage points for subordinate lien loans.</span></li></div>');
  }

  function setUpLocationFixture() {
    jasmine.getFixtures().set('<div class="filter location" id="location" title=""><div class="title"> <a href="#location" class="internal-link"><h3><i class="icon-minus-alt"></i> Location</h3></a><div class="desc">State, metro area, county, and census tract of the property</div></div><div id="location-sets"><ul class="fields location-set location-set-1" data-location-num="1" style="display: block; height: auto;"><div class="cf-alert msa-warning hidden"></div><li class="field state_code state_code-1"><label for="state_code-1">State:</label><div class="widget select"><select class="param chzn-done" name="state_code-1" id="state_code-1" data-dependent="county_code-1 census_tract_number-1" data-toggle="msamd-1" data-placeholder="Select a state" style="display: none;"><option value=""></option><option value="1">Alabama</option><option value="2">Alaska</option><option value="4">Arizona</option><option value="5">Arkansas</option><option value="6">California</option><option value="8">Colorado</option><option value="56">Wyoming</option><option value="72">Puerto Rico</option></select></div></li><li class="location-separator"><span>- or -</span></li><li class="field msamd msamd-1 disabled"><label for="msamd-1">Metro Area:</label><div class="widget select"><select class="param chzn-done" name="msamd-1" id="msamd-1" data-toggle="state_code-1" data-placeholder="Select an MSA/MD" style="display: none;" disabled="disabled"><option value=""></option><option value="10180">Abilene - TX</option><option value="10380">Aguadilla, Isabela, San Sebastian - PR</option><option value="10420">Akron - OH</option><option value="10500">Albany - GA</option><option value="46700">Vallejo, Fairfield - CA</option><option value="47020">Victoria - TX</option><option value="47220">Vineland, Millville, Bridgeton - NJ</option><option value="47260">Virginia Beach, Norfolk, Newport News - VA, NC</option><option value="47300">Visalia, Porterville - CA</option><option value="47380">Waco - TX</option><option value="47580">Warner Robins - GA</option><option value="47644">Warren, Troy, Farmington Hills - MI</option><option value="47894">Washington, Arlington, Alexandria - DC, VA, MD, WV</option><option value="47940">Waterloo, Cedar Falls - IA</option><option value="48140">Wausau - WI</option><option value="48260">Weirton, Steubenville - WV, OH</option><option value="48300">Wenatchee, East Wenatchee - WA</option><option value="48424">West Palm Beach, Boca Raton, Boynton Beach - FL</option><option value="48540">Wheeling - WV, OH</option><option value="48620">Wichita - KS</option><option value="48660">Wichita Falls - TX</option><option value="48700">Williamsport - PA</option><option value="48864">Wilmington - DE, MD, NJ</option><option value="48900">Wilmington - NC</option><option value="49020">Winchester - VA, WV</option><option value="49180">Winston, Salem - NC</option><option value="49340">Worcester - MA</option><option value="49420">Yakima - WA</option><option value="49500">Yauco - PR</option><option value="49620">York, Hanover - PA</option><option value="49660">Youngstown, Warren, Boardman - OH, PA</option><option value="49700">Yuba City - CA</option><option value="49740">Yuma - AZ</option></select></div><div class="help" role="tooltip" data-original-title="" title=""><i class="icon-help-alt"></i></div><span class="help-text">A Metropolitan Statistical Area (MSA) is a region with relatively high population density at its core (usually a single large city) and close economic ties throughout. Larger MSAs are divided into Metropolitan Divisions (MDs).</span></li><li class="field county_code county_code-1"><label for="county_code-1">County:</label><div class="widget select"><select class="param chzn-done" name="county_code-1" id="county_code-1" multiple="" data-concept="fips" data-concept-property="county_name" data-placeholder="Select a county" data-pre-placeholder="Select a state above" data-post-placeholder="Select a county" style="display: none;"><option value="013">Aleutians East Borough</option><option value="016">Aleutians West Census Area</option><option value="020">Anchorage Municipality</option><option value="050">Bethel Census Area</option><option value="060">Bristol Bay Borough</option><option value="068">Denali Borough</option><option value="070">Dillingham Census Area</option><option value="090">Fairbanks North Star Borough</option><option value="100">Haines Borough</option><option value="105">Hoonah-Angoon Census Area</option><option value="110">Juneau City and Borough</option><option value="122">Kenai Peninsula Borough</option><option value="130">Ketchikan Gateway Borough</option><option value="150">Kodiak Island Borough</option><option value="164">Lake and Peninsula Borough</option><option value="170">Matanuska-Susitna Borough</option><option value="180">Nome Census Area</option><option value="185">North Slope Borough</option><option value="188">Northwest Arctic Borough</option><option value="195">Petersburg Census Area</option><option value="198">Prince of Wales-Hyder Census Area</option><option value="220">Sitka City and Borough</option><option value="230">Skagway Municipality</option><option value="240">Southeast Fairbanks Census Area</option><option value="261">Valdez-Cordova Census Area</option><option value="270">Wade Hampton Census Area</option><option value="275">Wrangell City and Borough</option><option value="282">Yakutat City and Borough</option><option value="290">Yukon-Koyukuk Census Area</option></select><div id="county_code_1_chzn" class="chzn-container chzn-container-multi" style="width: 100%;" title=""><ul class="chzn-choices"><li class="search-field"><input type="text" value="Select a state above" class="default" autocomplete="off" style="width: 100%;"></li></ul><div class="chzn-drop"><ul class="chzn-results"><li id="county_code_1_chzn_o_0" class="active-result" style="">Aleutians East Borough</li><li id="county_code_1_chzn_o_1" class="active-result" style="">Aleutians West Census Area</li><li id="county_code_1_chzn_o_2" class="active-result" style="">Anchorage Municipality</li><li id="county_code_1_chzn_o_3" class="active-result" style="">Bethel Census Area</li><li id="county_code_1_chzn_o_4" class="active-result" style="">Bristol Bay Borough</li><li id="county_code_1_chzn_o_5" class="active-result" style="">Denali Borough</li><li id="county_code_1_chzn_o_6" class="active-result" style="">Dillingham Census Area</li><li id="county_code_1_chzn_o_7" class="active-result" style="">Fairbanks North Star Borough</li><li id="county_code_1_chzn_o_8" class="active-result" style="">Haines Borough</li><li id="county_code_1_chzn_o_9" class="active-result" style="">Hoonah-Angoon Census Area</li><li id="county_code_1_chzn_o_10" class="active-result" style="">Juneau City and Borough</li><li id="county_code_1_chzn_o_11" class="active-result" style="">Kenai Peninsula Borough</li><li id="county_code_1_chzn_o_12" class="active-result" style="">Ketchikan Gateway Borough</li><li id="county_code_1_chzn_o_13" class="active-result" style="">Kodiak Island Borough</li><li id="county_code_1_chzn_o_14" class="active-result" style="">Lake and Peninsula Borough</li><li id="county_code_1_chzn_o_15" class="active-result" style="">Matanuska-Susitna Borough</li><li id="county_code_1_chzn_o_16" class="active-result" style="">Nome Census Area</li><li id="county_code_1_chzn_o_17" class="active-result" style="">North Slope Borough</li><li id="county_code_1_chzn_o_18" class="active-result" style="">Northwest Arctic Borough</li><li id="county_code_1_chzn_o_19" class="active-result" style="">Petersburg Census Area</li><li id="county_code_1_chzn_o_20" class="active-result" style="">Prince of Wales-Hyder Census Area</li><li id="county_code_1_chzn_o_21" class="active-result" style="">Sitka City and Borough</li><li id="county_code_1_chzn_o_22" class="active-result" style="">Skagway Municipality</li><li id="county_code_1_chzn_o_23" class="active-result" style="">Southeast Fairbanks Census Area</li><li id="county_code_1_chzn_o_24" class="active-result" style="">Valdez-Cordova Census Area</li><li id="county_code_1_chzn_o_25" class="active-result" style="">Wade Hampton Census Area</li><li id="county_code_1_chzn_o_26" class="active-result" style="">Wrangell City and Borough</li><li id="county_code_1_chzn_o_27" class="active-result" style="">Yakutat City and Borough</li><li id="county_code_1_chzn_o_28" class="active-result" style="">Yukon-Koyukuk Census Area</li></ul></div></div></div><div class="spinning" style="display: none;"></div></li><li class="field census_tract_number census_tract_number-1"><label for="census_tract_number-1">Census tract:</label><div class="widget select"><select class="param chzn-done" name="census_tract_number-1" id="census_tract_number-1" multiple="" data-concept="census_tract_number" data-placeholder="Select a census tract" data-pre-placeholder="Select a state above" data-post-placeholder="Select a census tract" style="display: none;"><option value=""></option><option value="0001.00">0001.00</option><option value="0001.01">0001.01</option><option value="0001.02">0001.02</option><option value="0002.00">0002.00</option><option value="0002.01">0002.01</option><option value="0002.02">0002.02</option><option value="0002.03">0002.03</option><option value="0019.00">0019.00</option><option value="0020.00">0020.00</option><option value="0021.00">0021.00</option><option value="0022.01">0022.01</option><option value="0022.02">0022.02</option><option value="0023.01">0023.01</option><option value="0023.02">0023.02</option><option value="0023.03">0023.03</option><option value="0024.00">0024.00</option><option value="0025.01">0025.01</option><option value="0025.02">0025.02</option><option value="0026.01">0026.01</option><option value="0026.02">0026.02</option><option value="0026.03">0026.03</option><option value="0027.02">0027.02</option><option value="0027.11">0027.11</option><option value="0027.12">0027.12</option><option value="0028.11">0028.11</option><option value="0028.12">0028.12</option><option value="0028.13">0028.13</option><option value="0028.21">0028.21</option><option value="0028.22">0028.22</option><option value="0028.23">0028.23</option><option value="0029.00">0029.00</option><option value="9401.00">9401.00</option></select><div id="census_tract_number_1_chzn" class="chzn-container chzn-container-multi" style="width: 100%;" title=""><ul class="chzn-choices"><li class="search-field"><input type="text" value="Select a state above" class="default" autocomplete="off" style="width: 100%;"></li></ul><div class="chzn-drop"><ul class="chzn-results"><li id="census_tract_number_1_chzn_o_1" class="active-result" style="">0001.00</li><li id="census_tract_number_1_chzn_o_2" class="active-result" style="">0001.01</li><li id="census_tract_number_1_chzn_o_3" class="active-result" style="">0001.02</li><li id="census_tract_number_1_chzn_o_4" class="active-result" style="">0002.00</li><li id="census_tract_number_1_chzn_o_5" class="active-result" style="">0002.01</li><li id="census_tract_number_1_chzn_o_78" class="active-result" style="">9401.00</li></ul></div></div></div><div class="help" role="tooltip" data-original-title="" title=""><i class="icon-help-alt"></i></div><span class="help-text">A census tract is a small geographic area within a county. Census tracts vary in size, but on average about 4,000 people live in a census tract. Census tract numbers are unique within a county.</span><div class="spinning" style="display: none;"></div></li><ul></ul></ul></div><a href="#" id="add-state" class="control internal-link">+ Add another state or metro area</a></div>');
  }

  function setUpMessageFixture() {
    jasmine.getFixtures().set('<div id="filters" class="app-section"><form id="explore" action="" method="get"><div class="cf-alert missing-2014-warning hidden"></div></form></div>');
  }

  describe('The form on the explore page', function(){

    beforeEach(function() {
      setUpPropertyFixture();
    });

    it('should properly initialize', function() {
        PDP.form.init();
        expect(PDP.form.$fields.selector).toBe($('form .field:not(.ignore)').selector);
    });

    it('should all filter categories on load', function() {
      PDP.form.showSections();
      expect( $('.filter:not(.year), .no-summary #share') ).not.toHaveClass( 'hidden' );
    });

    it('be able to hide filters', function() {
      var $el = $('#property');
      PDP.form.hideFilter($el);
      expect( $el.attr('class') ).toBe( 'filter property closed' );
    });

    it('be able to un-hide filters', function() {
      var $el = $('#property'),
          $fields = $el.find('.fields');
      PDP.form.showFilter($el);
      expect( $el ).not.toHaveClass( 'closed' );
    });

    it('be able to remove custom text from the suggestion dropdown', function() {
      PDP.form.removeCustom();
      expect( $('.suggested .custom').text() ).toBeFalsy();
    });

    it('be able to open filters if inner fields are selected', function() {
      $('.filter input[value=2]').prop('checked', true);
      PDP.form.$fields = $('.field');
      PDP.form.checkFilters();
      expect( $('.filter') ).not.toHaveClass('closed');
    });

    it('be able to add state/msa sections if necessary', function() {
      setUpLocationFixture();
      PDP.query.params['state_code-1'] = {};
      PDP.query.params['state_code-2'] = {};
      PDP.form.checkLocations();
      expect( $('.location-set').length ).toBe( 3 );
    });

    it('be able to set High Priced Loan values from parameters', function() {
      setUpRateSpreadFixture();
      PDP.query.params['rate_spread'] = { 'values': [null], 'comparator': '!=' };
      PDP.form.setField('rate_spread');
      expect( $('input[name="rate_spread"][data-comparator="!="]').is(':checked')).toBe(true);
      expect( $('input[name="rate_spread"][data-comparator="="]').is(':checked')).toBe(false);
      PDP.query.params['rate_spread'] = { 'values': [null], 'comparator': '=' };
      PDP.form.setField('rate_spread');
      expect( $('input[name="rate_spread"][data-comparator="!="]').is(':checked')).toBe(false);
      expect( $('input[name="rate_spread"][data-comparator="="]').is(':checked')).toBe(true);
    });

    it('be able to get info about a field', function() {
      setUpParamFixture();
      var field = PDP.form.getField($($('.param')[0]));
      var expected = {
        name: 'as_of_year',
        tagName: 'select',
        type: undefined,
        values: ['2014'],
        comparator: '='
      };
      expect( JSON.stringify( field ) ).toBe( JSON.stringify( expected ) );
    });

    it('be able to get info about its fields', function() {
      setUpParamFixture();
      PDP.app.$el = $('#filters');
      var fields = PDP.form.getFields(),
          expected = [{
            name: 'as_of_year',
            tagName: 'select',
            type: undefined,
            values: ['2014'],
            comparator: '='
          }];
      expect( JSON.stringify( fields ) ).toBe( JSON.stringify( expected ) );
    });

    it('be able to set a field', function() {
      setUpParamFixture();
      PDP.query.params = {
        'as_of_year': {
          'values':[2007],
          'comparator':'='
        }
      };
      PDP.form.setField( 'as_of_year' );
      expect( $('#as_of_year').val() ).toEqual( ['2007'] );
    });

    it('be able to set all its fields', function() {
      setUpParamFixture();
      PDP.query.params = {
        'as_of_year': {
          'values':[2008],
          'comparator':'='
        }
      };
      PDP.form.setFields();
      expect( $('#as_of_year').val() ).toEqual( ['2008'] );
    });

    it('be able to set a field\'s options', function() {
      var options = [{value:'foo', label:'bar'}];
      setUpParamFixture();
      $('#as_of_year').html('');
      PDP.form.setFieldOptions( $('#filters'), options );
      expect( $($('#as_of_year option')[0]).attr('value') ).toBe( 'foo' );
      expect( $($('#as_of_year option')[0]).text() ).toBe( 'bar' );
    });

    it('be able to reset a field', function() {
      setUpParamFixture();
      var before = $('#filters option').length;
      expect( before ).toEqual( 8 );
      PDP.form.resetField($('#filters'));
      var after = $('#filters option').length;
      expect( after ).toEqual( 0 );
    });

    it('be able to reset all fields', function() {
      PDP.app.$el = $('.property');
      setUpPropertyFixture();
      PDP.form.resetFields();
      expect( PDP.app.$el.find('input').first().prop('checked') ).toBeFalsy();
    });

    it('be able to disable a field', function() {
      setUpPropertyFixture();
      PDP.form.disableField($('.property'));
      expect( $('.property input').first().attr('disabled') ).toBe('disabled');
    });

    it('be able to disable a select element', function() {
      setUpParamFixture();
      PDP.form.disableField($('#filters'));
      expect( $('#filters select').first().attr('data-placeholder') ).not.toBeFalsy();
    });

    it('be able to enable a field', function() {
      setUpPropertyFixture();
      PDP.form.enableField($('.property'));
      expect( $('.property input').first().attr('disabled') ).not.toBe('disabled');
    });

    it('be able to enable a select element', function() {
      setUpParamFixture();
      PDP.form.enableField($('#filters'));
      expect( $('#filters select').first().attr('data-placeholder') ).not.toBeFalsy();
    });

    it('be able to hide a field', function() {
      setUpPropertyFixture();
      PDP.form.hideField($('.property'));
      expect( $('.property').first().attr('class').indexOf('hidden') ).toBeGreaterThan( -1 );
    });

    it('be able to show a field', function() {
      setUpPropertyFixture();
      PDP.form.showField($('.property'));
      expect( $('.property').first().attr('class').indexOf('hidden') ).toBe( -1 );
    });

    it('be able to hide optional fields', function() {
      setUpPropertyFixture();
      PDP.form.toggleOptional( 'property', 'hide' );
      expect( $('.property').first().attr('class').indexOf('hidden') ).toBeGreaterThan( -1 );
    });

    it('be able to show optional fields', function() {
      setUpPropertyFixture();
      PDP.form.toggleOptional( 'property', 'show' );
      expect( $('.property').first().attr('class').indexOf('hidden') ).toBe( -1 );
    });
  });

  describe('2014 MSA Warning', function() {
    beforeEach(function() {
        PDP.form.warn2014Msa = null;
    });

    it('is true when the array is null since all years are searched', function () {
      PDP.form.checkYearRules(null);
      expect(PDP.form.warn2014Msa).toEqual(true);
    });

    it('is false when the array is empty - this condition should not occur', function () {
      PDP.form.checkYearRules([]);
      expect(PDP.form.warn2014Msa).toEqual(false);
    });

    it('is false when the array only contains 2013', function () {
      PDP.form.checkYearRules(['2013']);
      expect(PDP.form.warn2014Msa).toEqual(false);
    });

    it('is false when the array only contains 2014', function () {
      PDP.form.checkYearRules(['2014']);
      expect(PDP.form.warn2014Msa).toEqual(false);
    });

    it('is false when the array only contains 2015', function () {
      PDP.form.checkYearRules(['2015']);
      expect(PDP.form.warn2014Msa).toEqual(false);
    });

    it('is false when the array only contains 2016', function () {
      PDP.form.checkYearRules(['2016']);
      expect(PDP.form.warn2014Msa).toEqual(false);
    });

    it('is false when the array contains 2014-2015', function () {
      PDP.form.checkYearRules(['2014', '2015']);
      expect(PDP.form.warn2014Msa).toEqual(false);
    });

    it('is false when the array contains 2015-2016', function () {
      PDP.form.checkYearRules(['2015', '2016']);
      expect(PDP.form.warn2014Msa).toEqual(false);
    });

    it('is false when the array contains 2014, 2016', function () {
      PDP.form.checkYearRules(['2014', '2016']);
      expect(PDP.form.warn2014Msa).toEqual(false);
    });

    it('is false when the array contains 2014-2016', function () {
      PDP.form.checkYearRules(['2014', '2015', '2016']);
      expect(PDP.form.warn2014Msa).toEqual(false);
    });

    it('is true when the array contains 2013-2015', function () {
      PDP.form.checkYearRules(['2013', '2014', '2015']);
      expect(PDP.form.warn2014Msa).toEqual(true);
    });

    it('is true when the array contains 2013, 2016', function () {
      PDP.form.checkYearRules(['2013', '2016']);
      expect(PDP.form.warn2014Msa).toEqual(true);
    });

    it('is true when the array contains 2012, 2016', function () {
      PDP.form.checkYearRules(['2012', '2016']);
      expect(PDP.form.warn2014Msa).toEqual(true);
    });

    it('is false when the array contains 2010-2012', function () {
      PDP.form.checkYearRules(['2010', '2011', '2012']);
      expect(PDP.form.warn2014Msa).toEqual(false);
    });

    describe('when the rule is true', function() {
      beforeEach(function() {
          setUpLocationFixture();
          PDP.form.warn2014Msa = true;
          PDP.form.onUpdateWarnings();
      });

      it('disables the MSA controls', function() {
          expect( $('#location').find('.msamd-1') ).toHaveClass('disabled');
      });

      it('displays the warning message', function() {
          expect( $('#location').find('.msa-warning') ).not.toHaveClass('hidden');
      });
    });


    describe('when the rule is false', function() {
      beforeEach(function() {
          setUpLocationFixture();
          PDP.form.warn2014Msa = false;
          PDP.form.onUpdateWarnings();
      });

      it('enables the MSA controls', function() {
          expect( $('#location').find('.msamd-1') ).not.toHaveClass('disabled');
      });

      it('hides the warning message', function() {
          expect( $('#location').find('.msa-warning') ).toHaveClass('hidden');
      });
    });
  });


})();
