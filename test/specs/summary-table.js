(function(){

  'use strict';

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
    

  });
})();
