(function() {
  'use strict';

  describe('Summary table', function() {

    it('should exist', function(){

      expect( PDP.summaryTable ).not.toBeUndefined();

    });

    describe('_.populateFields', function() {
    
      it("should populate multiple fields", function() {
        $('body')
          .append('<select id="veggies1"></select>')
          .append('<select id="veggies2"></select>');

        var fields = ['carrots', 'broccoli'],
          domobjs = [$('#veggies1'), $('#veggies2')];

        PDP.summaryTable._populateFields(domobjs, fields, PDP.summaryTable.optionTmpl);

        expect( $('#veggies1').children().length ).toEqual(2);
        expect( $('#veggies2').children().length ).toEqual(2);
      });

      it("should keep field values in the correct order", function() {
        expect( $('#veggies1').children().first().text() ).toEqual('Carrots');
        expect( $('#veggies2').children().first().text() ).toEqual('Carrots');

        $('#veggies1, #veggies2').remove();
      });
    });

    describe('optionTmpl', function() {

      it("should return a properly formed <option> string", function() {
        expect( PDP.summaryTable.optionTmpl('butternut') )
          .toEqual('<option value="butternut">Butternut</option>');
      });

      it("should respect the selected param", function() {
        expect( PDP.summaryTable.optionTmpl('butternut', true) )
          .toEqual('<option value="butternut"selected>Butternut</option>');
      });
    });
  
  });
})();
