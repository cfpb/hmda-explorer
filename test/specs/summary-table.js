(function(){

  'use strict';

  function setUpTableFixture() {
    jasmine.getFixtures().set('<div id="summary-table"><div class="app-section filters" id="foo"></div><div class="app-section summary" id="bar"></div><li class="field as_of_year"><label for="as_of_year">Select year(s) of data:</label><div class="widget select"><select class="param" name="as_of_year" id="as_of_year" multiple data-placeholder="Select one or more years"><option value="2012" selected>2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option></select></div></li></div>');
  }

  function setUpUIFixture() {
    jasmine.getFixtures().set('<div id="summary-table"><div id="variable1"></div><div id="variable2"></div><div id="variable3"></div><div id="reset-variable1" class="hidden"></div><div id="reset-variable2" class="hidden"></div></div>');
  }

  describe('Summary table', function() {

    it('should exist', function(){

      expect( PDP.summaryTable ).not.toBeUndefined();

    });

    describe('_.populateFields', function() {

      it('should populate multiple fields', function() {
        $('body')
          .append('<select id="veggies1"></select>')
          .append('<select id="veggies2"></select>');

        var fields = ['carrots', 'broccoli'],
          domobjs = [$('#veggies1'), $('#veggies2')];

        PDP.summaryTable._populateFields(domobjs, fields, PDP.summaryTable.optionTmpl);

        expect( $('#veggies1').children().length ).toEqual(2);
        expect( $('#veggies2').children().length ).toEqual(2);
      });

      it('should keep field values in the correct order', function() {
        expect( $('#veggies1').children().first().text() ).toEqual('Carrots');
        expect( $('#veggies2').children().first().text() ).toEqual('Carrots');

        $('#veggies1, #veggies2').remove();
      });
    });

    describe('optionTmpl', function() {

      it('should return a properly formed <option> string', function() {
        expect( PDP.summaryTable.optionTmpl('butternut') )
          .toEqual('<option value="butternut">Butternut</option>');
      });

      it('should respect the selected param', function() {
        expect( PDP.summaryTable.optionTmpl('butternut', true) )
          .toEqual('<option value="butternut"selected>Butternut</option>');
      });
    });

   describe('Number format tests (_mungeDollarAmts)', function() {
       var _err = 'Data format error. A negative number was found in original data: ';
       var _nan = 'Data not available';
       /**
        *
        * Data to drive a specific test case. Data should be in the format of [test_input, expected_output, description]
        * Common expected values are above; e.g., var _err = ...., etc.
        *
        * */
       var _data = [

         [9.876543210123456789, '$9,877', 'should format 18 decimals'],
         [98.76543210123456789, '$98,765', 'should format 17 decimals'],
         [987.6543210123456789, '$987,654', 'should format 16 decimals'],
         [9876.543210123456789, '$9,876,543', 'should format 15 decimals'],
         [98765.43210123456789, '$98,765,432', 'should format 14 decimals'],
         [987654.3210123456789, '$987,654,321', 'should format 13 decimals'],
         [9876543.210123456789, '$9,876,543,210', 'should format 12 decimals'],
         [98765432.10123456789, '$98,765,432,101', 'should format 11 decimals'],
         [987654321.0123456789, '$987,654,321,012', 'should format 10 decimals'],
         [9876543210.123456789, '$9,876,543,210,123', 'should format 9 decimals'],
         [98765432101.23456789, '$98,765,432,101,235', 'should format 8 decimals'],
         [987654321012.3456789, '$987,654,321,012,346', 'should format 7 decimals'],
         //Numbers getting a bit big for JavaScript
         [123.456789, '$123,457', 'should format 6 decimals'],
         [123.07861, '$123,079', 'should format 5 decimals'],
         [1234.98765, '$1,234,988', 'should format 4 decimals'],
         [12345.378, '$12,345,378', 'should format 3 decimals'],
         [123456.73, '$123,456,730', 'should format 2 decimals'],
         //Tesing weird numbers without leading or trailing numbers and decimal
         [Number('14579.'), '$14,579,000', 'should format 1 decimals'],
         [-0, '$0', 'should format 0 decimals'],
         [+0, '$0', 'should format 0 decimals'],
         [Number('.1'), '$100', 'should format o w/single decimal decimals'],
         [Number('1.'), '$1,000', 'should format 0 decimals'],
         [Number('.0'), '$0', 'should format .0 decimal'],
         [-1, _err.concat('-1'), 'should format negative numbers'],
         [0, '$0', 'should format 0'],
         [1, '$1,000' , 'should format 1'],
         [Number.MAX_VALUE, '$Infinity', 'should hanlde JS max'], //You would think it should be Number.POSITIVE_INFINITY vs. the string rep.
         [Number.MIN_VALUE, '$0', 'should handle JS min.'],  //Should return _err but node returns 0
         [Number.POSITIVE_INFINITY, '$Infinity', 'should handle positive infinity.'],
         [Number.NEGATIVE_INFINITY, _err.concat(Number.NEGATIVE_INFINITY), 'should handle negative inifinity.'],
         [null, _nan, 'should handle null'],
         ['', _nan, 'should handle empty string'],
         ['Somebody\'s boring me. I think it\'s me.', _nan, 'should handle arbitrary Dylan Thomas quotes.'],
         ['!@#$%^&*(()|}{:\\"?><,./`\'})', 'Data not available', 'should handle weird ascii'],
         ['!@#$%^&*(()|}{:\\"?><,./`\'})'.toString('utf-8'), 'Data not available', 'should handle weird utf-8'],
         ['!@#$%^&*(()|}{:\\"?><,./`\'})'.toString('utf-16'), 'Data not available', 'should handle weird utf-8'],
       ];

       using( _data, function(val) {
         it( '', function(){
           var data = { 'results': [{ 'min_loan_amount_000s': val[0], 'max_loan_amount_000s': val[0] }] };
           expect( PDP.summaryTable._mungeDollarAmts( data )).
           toEqual( { 'results': [{ 'min_loan_amount_000s': val[1] ,
                                    'max_loan_amount_000s': val[1] }] } );
         });
      });
    });


    describe('queryToVal', function() {
      it('should properly format calculate field values', function() {
        expect( PDP.summaryTable.queryToVal('AVG(applicant_income_000s)') )
          .toEqual('avg_applicant_income_000s');
      });
    });

    describe('populateTable', function() {
      it ('should build out table rows', function() {
        PDP.summaryTable.queryParams.clauses.select = ['veggie', 'fruit'];
        $('body').append('<table id="summary-table"></table>');

        var data = { results: [
          { 'veggie': 'broccoli', 'fruit': 'apple' },
          { 'veggie': 'carrot', 'fruit': 'pear'}
        ]};
        PDP.summaryTable.populateTable( data );

        expect( $('#summary-table tr').length )
          .toEqual(2);
      });

      it('should put values in the table cells', function() {
        expect( $('#summary-table td:first').html() )
          .toEqual('broccoli');
      });

      it('should create a table cell for every data', function() {
        expect( $('#summary-table td').length )
          .toEqual(4);
      });

    });

    describe('resetColumn', function() {
      it('should remove the variables value', function() {
        PDP.summaryTable.resetColumn( 'select', 0 );

        expect( PDP.summaryTable.fieldVals.variables[0] )
          .toBeNull();
      });

    });

    describe('updateTableHeaders', function() {
      it('should add the header table row', function() {
        $('tr.header').remove();
        PDP.summaryTable.queryParams.clauses.select = [];

        PDP.summaryTable.queryParams.clauses.select[0] = 'food_veggie_name_1';
        PDP.summaryTable.queryParams.clauses.select[1] = 'avg_loan_amount_000s';
        PDP.summaryTable.updateTableHeaders();

        expect( $('tr.header').length )
          .toEqual(1);
      });

      it('should have two cells', function() {
        expect( $('tr.header td').length )
          .toEqual(2);
      });

      it('should display the human name for metrics', function() {
        expect( $('tr.header td').last().html() )
          .toEqual('Loan Amount Average');
      });

      it('should cleanup value names', function() {
        expect( $('tr.header td:first').html() )
          .toEqual('Food veggie');

      });

      //this needs to be moved out
      it('should clear table', function () {
        PDP.summaryTable.resetTable();
        expect( $('#summary-table').html() )
          .toEqual('');
        $('#summary-table').remove();

      });


    });



    describe('_updateShareLink', function() {
      it('should add a select param to the share url', function() {

        var vals = {calculate: 'count', variables: ['agency_name']};

        $('body').append('<input type="text" class="share_url">');

        PDP.summaryTable._updateShareLink(vals);

        expect($('.share_url').val())
          .toContain('select=agency_name,count');

      });
    });

    describe('_extractValuesFromUrlParams', function() {

        var _data = [
          [['count', 'agency_name'], {calculate: 'count', variables: ['agency_name']}, 'should distinguish calculate by values from variables'],
          [['count', 'min_applicant_income_000s', 'agency_name'], {calculate: 'min_applicant_income_000s', variables: ['agency_name']}, 'should set calculate by to last eligible value in array'],
          [['apples', 'oranges', '', 'counts', 'agency_names'], {calculate: '', variables: []}, 'should ignore ineligible values'],
          [['count', 'agency_name', 'agency_name', 'agency_name'], {calculate: 'count', variables: ['agency_name']}, 'should ignore variable multiples'],
          [['count', 'min_applicant_income_000s', 'action_taken_name', 'agency_name', 'applicant_ethnicity_name', 'applicant_sex_name'], {calculate: 'min_applicant_income_000s', variables: ['action_taken_name', 'agency_name', 'applicant_ethnicity_name']}, 'should only extract first three variable values']
        ];

        using( _data, function(val) {
          it('', function(){
            PDP.summaryTable.fieldVals = {calculate: '', variables: []};
            PDP.summaryTable._extractValuesFromUrlParams(val[0]);
            expect(PDP.summaryTable.fieldVals)
              .toEqual(val[1]);
          });
       });

    });

    describe('_buildQueryArrays', function() {
      it('should build query arrays from fieldVals', function() {

        var vals = {calculate: 'count', variables: ['action_taken_name', 'agency_name']};

        PDP.query.params = {as_of_year: {comparator: '=', values: [2011]}};
        PDP.summaryTable.queryParams.clauses = {group: [], select: [], where: {}};

        PDP.summaryTable._buildQueryArrays(vals);

        expect(PDP.summaryTable.queryParams.clauses)
          .toEqual({
            group: ['action_taken_name', 'agency_name'],
            select: ['action_taken_name', 'agency_name', 'COUNT()'],
            where: PDP.query.params
          });

      });
    });

    describe('Table initializing', function() {

      it('should set itself up', function() {
        spyOn(PDP.summaryTable, 'resetTable');
        PDP.summaryTable.setupTable();
        expect( PDP.summaryTable.resetTable ).toHaveBeenCalled();
      });

      it('should be able to hide itself', function() {
        setUpTableFixture();
        PDP.summaryTable._disableTable();
        expect( $('#summary-table').is(':visible') ).toBe( false );
      });

      it('should be able to update its values', function() {
        setUpTableFixture();
        var e = jQuery.Event('keydown');
        spyOn(PDP.summaryTable, 'updateFieldVals');
        $('#summary-table').on( 'keydown', PDP.summaryTable.updateFieldVals );
        $('#summary-table').trigger(e);
        PDP.summaryTable.updateFieldVals(e);
        expect( PDP.summaryTable.updateFieldVals ).toHaveBeenCalled();
      });

      it('should reset after receiving a response', function() {
        var response = {'total':6,'slice':'hmda_lar','dataset':'hmda','computing':false,'page':1,'errors':{},'size':6,'_links':[{'rel':'self','href':'/data/hmda/slice/hmda_lar.jsonp?$callback=jQuery110208900953254196793_1385358055943&$group=agency_name,action_taken_name&$orderBy=action_taken_name,agency_name&$select=COUNT(),agency_name,action_taken_name&$where=as_of_year=2012+AND+state_code=2+AND+applicant_sex=3+AND+action_taken=1&$limit=0&_=1385358055945'},{'href':'/data/hmda','rel':'up'},{'href':'/data/hmda/slice/hmda_lar.jsonp?$select={?select}&$group={?group}&$where={?where}&$orderBy={?orderBy}&$limit={?limit}&$offset={?offset}&$callback={?callback}','templated':true,'rel':'query'}],results:[{'action_taken_name':'Loan originated','agency_name':'Consumer Financial Protection Bureau','count':453},{'action_taken_name':'Loan originated','agency_name':'Department of Housing and Urban Development','count':211},{'action_taken_name':'Loan originated','agency_name':'Federal Deposit Insurance Corporation','count':40},{'action_taken_name':'Loan originated','agency_name':'Federal Reserve System','count':3},{'action_taken_name':'Loan originated','agency_name':'National Credit Union Administration','count':1201},{'action_taken_name':'Loan originated','agency_name':'Office of the Comptroller of the Currency','count':166}],'dimensions':{},'query':{'callback':'jQuery110208900953254196793_1385358055943','offset':0,'limit':0,'orderBy':'action_taken_name,agency_name','where':'as_of_year=2012 AND state_code=2 AND applicant_sex=3 AND action_taken=1','group':'agency_name,action_taken_name','select':'COUNT(),agency_name,action_taken_name'}};
        spyOn(PDP.summaryTable, 'resetTable');
        PDP.summaryTable._handleApiResponse(response);
        expect( PDP.summaryTable.resetTable ).toHaveBeenCalled();
      });

      it('should prep itself after receiving a response', function() {
        var resp = {'errors':{},'page':1,'dimensions':null,'size':11,'total':11,'computing':null,'slice':'hmda_lar','query':{'offset':0,'limit':0,'orderBy':'as_of_year','group':'as_of_year','where':'as_of_year IN (2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007) AND property_type IN (1,2) AND owner_occupancy=1 AND action_taken=1 AND lien_status=1','select':'COUNT(),as_of_year'},'_links':[{'rel':'self','href':'/data/hmda/slice/hmda_lar.jsonp?$callback=_jqjsp&$group=as_of_year&$orderBy=as_of_year&$select=COUNT(),as_of_year&$where=as_of_year+IN+(2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007)+AND+property_type+IN+(1,2)+AND+owner_occupancy=1+AND+action_taken=1+AND+lien_status=1&$limit=0&_1532712276287='},{'rel':'up','href':'/data/hmda'},{'rel':'query','templated':true,'href':'/data/hmda/slice/hmda_lar.jsonp?$select={?select}&$where={?where}&$group={?group}&$orderBy={?orderBy}&$limit={?limit}&$offset={?offset}'}],'dataset':'hmda','results':[{'count':'7,406,622','as_of_year':2007},{'count':'5,694,349','as_of_year':2008},{'count':'7,909,818','as_of_year':2009},{'count':'6,865,298','as_of_year':2010},{'count':'6,037,819','as_of_year':2011},{'count':'8,401,970','as_of_year':2012},{'count':'7,239,056','as_of_year':2013},{'count':'4,932,849','as_of_year':2014},{'count':'6,223,787','as_of_year':2015},{'count':'7,154,989','as_of_year':2016},{'count':'6,114,421','as_of_year':2017}]};
        spyOn( PDP.summaryTable, '_mungeDollarAmts' );
        spyOn( PDP.summaryTable, 'populateTable');
        spyOn( PDP.summaryTable, '_handleApiResponse');
        PDP.summaryTable._prepData(resp);
        expect( PDP.summaryTable._mungeDollarAmts ).toHaveBeenCalled();
      });

      it('should update its fields', function() {
        spyOn( PDP.summaryTable, '_updateFields' );
        PDP.summaryTable._updateSummaryFields();
        expect( PDP.summaryTable._updateFields ).toHaveBeenCalled();
      });

      it('should update its UI', function() {
        setUpUIFixture();
        PDP.summaryTable.fieldVals.variables = [1,2,3];
        PDP.summaryTable._updateSummaryFieldsUI();
        expect( $('#reset-variable1').attr('class').indexOf('hidden') ).toEqual( -1 );
        PDP.summaryTable.fieldVals.variables = [1];
        PDP.summaryTable._updateSummaryFieldsUI();
        expect( $('#variable2').attr('disabled') ).toBe( 'disabled' );
      });

      it('should pull down URL params', function() {
        spyOn( PDP.summaryTable, '_extractValuesFromUrlParams' );
        PDP.summaryTable.showTableFromUrlParams();
        expect( PDP.summaryTable._extractValuesFromUrlParams ).toHaveBeenCalled();
      });

      it('should initalize', function() {
        spyOn( PDP.summaryTable, '_chosenInit' );
        spyOn( PDP.summaryTable, 'createTable' );
        spyOn( PDP.summaryTable, '_populateOptions' );
        PDP.summaryTable.init();
        expect( PDP.summaryTable._chosenInit ).toHaveBeenCalled();
        expect( PDP.summaryTable.createTable ).toHaveBeenCalled();
        expect( PDP.summaryTable._populateOptions ).toHaveBeenCalled();
      });

    });

  });
})();
