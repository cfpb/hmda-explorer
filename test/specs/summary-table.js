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



    describe('Dollar format function _mungeDollarAmts (min and max) tests', function() {

      it(' should properly handle negative numerical values', function(){
        var data = { 'results': [{ 'min_loan_amount_000s': -1, 'max_loan_amount_000s': -1 }] };
        expect( PDP.summaryTable._mungeDollarAmts( data )).
          toEqual( { 'results': [{ 'min_loan_amount_000s': 'Data format error! A non-positive numerical value found in original data: -1' ,
                                   'max_loan_amount_000s': 'Data format error! A non-positive numerical value found in original data: -1' }] } );
      });

      it(' should properly handle empty string values', function(){
        var data = { 'results': [{ 'min_loan_amount_000s': '', 'max_loan_amount_000s':'' }] };
        expect( PDP.summaryTable._mungeDollarAmts( data )).
          toEqual( { 'results': [{ 'min_loan_amount_000s': 'Data not available' ,
                                   'max_loan_amount_000s': 'Data not available' }] } );
      });

      it(' should properly handle text values', function(){
        var data = { 'results': [{ 'min_loan_amount_000s': 'foo' , 'max_loan_amount_000s': 'bar' }] };
        expect( PDP.summaryTable._mungeDollarAmts( data )).
          toEqual( { 'results': [{ 'min_loan_amount_000s': 'Data not available',
                                   'max_loan_amount_000s': 'Data not available' }] } );
      });

      it(' should properly handle null values', function(){
        var data = { 'results': [{ 'min_loan_amount_000s': null , 'max_loan_amount_000s': null }] };
        expect( PDP.summaryTable._mungeDollarAmts( data )).
          toEqual( { 'results': [{ 'min_loan_amount_000s': 'Data not available' ,
                                   'max_loan_amount_000s': 'Data not available' }] } );
      });

      it('should properly format single digit amounts', function() {
        var data = { 'results':  [{ 'min_loan_amount_000s': 1, 'max_loan_amount_000s': 1 }] };
        expect( PDP.summaryTable._mungeDollarAmts( data )).
          toEqual( { 'results': [{ 'min_loan_amount_000s': '$1,000' ,
                                   'max_loan_amount_000s': '$1,000' }] } );
      });


      it('should properly format two digit amounts', function() {
        var data = { 'results':  [{ 'min_loan_amount_000s': 23.45643210000000,
                                    'max_loan_amount_000s': 45.2321443434323 }] };
        expect( PDP.summaryTable._mungeDollarAmts( data )).
          toEqual( { 'results': [{ 'min_loan_amount_000s': '$23,456',
                                   'max_loan_amount_000s': '$45,232' }] } );
      });
      
      it('should properly format five digit amounts', function() {
        var data = { 'results':  [{ 'min_loan_amount_000s': 23456 }]  };
        expect( PDP.summaryTable._mungeDollarAmts( data ) )
          .toEqual( { 'results': [ { 'min_loan_amount_000s': '$23,456,000' } ] });
      });
 
      it('should properly format three digit amounts', function() {
        var data = { 'results':  [{ 'min_loan_amount_000s': 234 }]  };
        expect( PDP.summaryTable._mungeDollarAmts( data ) )
          .toEqual( { 'results': [ { 'min_loan_amount_000s': '$234,000' } ] });
      });

      it('should properly format nine digit amounts', function() {
        var data = { 'results':  [{ 'min_loan_amount_000s': 345678901 }]  };
        expect( PDP.summaryTable._mungeDollarAmts( data ) )
          .toEqual( { 'results': [ { 'min_loan_amount_000s': '$345,678,901,000' } ] });
      });

      it('should properly format crazy dot-separated amounts', function() {
        var data = { 'results':  [{ 'min_loan_amount_000s': 234.234242342345 }]  };
        expect( PDP.summaryTable._mungeDollarAmts( data ) )
          .toEqual( { 'results': [ { 'min_loan_amount_000s': '$234,234' } ] });
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

    describe('updateQuery', function() {
      it('should create the group clause array', function() {
        PDP.summaryTable.updateQuery( 'both', 'starch', 2 );

        expect( PDP.summaryTable.queryParams.clauses.group )
          .not.toBeUndefined();
      });

      it('should add the value to the correct position in select', function() {
        expect( PDP.summaryTable.queryParams.clauses.select[2] )
          .toEqual('starch');
      });

      it('should add the value to the correct position in group', function() {
        expect( PDP.summaryTable.queryParams.clauses.group[2] )
          .toEqual('starch');
      });
    });

    describe('updateTableHeaders', function() {
      it('should add the header table row', function() {
        $('tr.header').remove();
        PDP.summaryTable.queryParams.clauses.select[0] = 'food_veggie_name_1';
        PDP.summaryTable.queryParams.clauses.select[3] = 'avg_loan_amount_000s';
        PDP.summaryTable.updateTableHeaders();

        expect( $('tr.header').length )
          .toEqual(1);
      });

      it('should have three cells', function() {
        expect( $('tr.header td').length )
          .toEqual(4);
      });

      it('should display the human name for metrics', function() {
        expect( $('tr.header td').last().html() )
          .toEqual('Loan Amount Average');
      });

      it('should cleanup value names', function() {
        expect( $('tr.header td:first').html() )
          .toEqual('Food veggie');

        $('#summary-table').remove();
      });
    });

  });
})();
