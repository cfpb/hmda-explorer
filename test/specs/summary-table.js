(function() {
  'use strict';

  describe('Summary table', function() {

    it('should exist', function(){

      expect( PDP.summaryTable ).not.toBeUndefined();

    });

    describe('_.populateSingleInput', function() {

      it("should populate a single field", function() {
        $('body').append('<select id="magic"></select>');

        var fields = ['magic', 'rainbows'],
            $input =  $('#magic'); 

        PDP.summaryTable._populateSingleInput( $input, fields );

        expect( $input.children().length ).toEqual(2);
      }); 

      it("should keep the options in the correct order", function() {
        expect( $('#magic').children().first().text() ).toEqual('rainbows');
      });

      it("should only generate one selected <option>", function() {
        expect( $('#magic option[selected]').length ).toEqual(1);

        // tear down
        $('#magic').remove();
      });

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
        expect( $('#veggies1').children().first().text() ).toEqual('carrots');
        expect( $('#veggies2').children().first().text() ).toEqual('carrots');

        $('#veggies1, #veggies2').remove();
      });
    });

    describe('optionTmpl', function() {

      it("should return a properly formed <option> string", function() {
        expect( PDP.summaryTable.optionTmpl('butternut') )
          .toEqual('<option value="butternut">butternut</option>');
      });

      it("should respect the selected param", function() {
        expect( PDP.summaryTable.optionTmpl('butternut', true) )
          .toEqual('<option value="butternut"selected>butternut</option>');
      });
    });
  
  });
})();
