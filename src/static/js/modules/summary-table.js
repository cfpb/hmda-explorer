// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  var table = {};

  // cache input fields
  table._inputs = {};
  table._inputs.all = $('*[data-summary-table-input]');
  table._inputs.year = $('#year');
  table._inputs.varFields = [$('#variable1'), $('#variable2'), $('#variable3')];
  table._inputs.calculate = $('#calculate-by');

  // stubs for field data until api endpoints are implemented
  table._years = ['2011', '2012'];
  table.fields = ['state_name', 'property_type_name', 'owner_occupancy_name'];
  table.calculateFields = ['sum', 'min', 'max', 'record count'];

  // returns a templated option tag
  table.optionTmpl = function(field, defaultOp) {
    var def = (defaultOp) ? 'selected' : '';

    return '<option value="' + field + '"' + def + '>' + field + '</option>';
  };

  // fetches field names and populates select options
  table._populateOptions = function() {
    table._populateVarFields();

    // populate year field
    table._populateSingleInput(table._inputs.year, table._years);

    // populate calculated by field
    table._populateSingleInput(table._inputs.calculate, table.calculateFields);
  };

  table._populateVarFields = function() {
    var inputsLen = table._inputs.varFields.length,
        fieldsLen = table.fields.length - 1,
        i,
        varDropDown;
    while (inputsLen--) {
      varDropDown = table._inputs.varFields[inputsLen];

      for (i=0; i<=fieldsLen; i++) {
        varDropDown.append(table.optionTmpl(table.fields[i]));
      }
    } 
  };

  // populates year and calculate fields
  // $input: jQobj of <select>
  // fields: array of strings, each with a name of API field
  // for the year field, ask for years in asc, will get flipped to desc
  table._populateSingleInput = function($input, fields) {
    var fieldsLen = fields.length,
        first = true;

    while (fieldsLen--) {
      $input.append(
        table.optionTmpl(fields[fieldsLen], first)
      );

      first = false;
    }

    return $input;
  };

  table._chosenInit = function() {
    $('select.chzn-select').chosen({
      allow_single_deselect: true,
      width: '100%'
    });

    $('select.chzn-single').chosen({
      disable_search_threshold: 50,
      width: '100%'
    });
  };

  table.init = function() {
    table._populateOptions();
    table._chosenInit();
  };

  pdp.summaryTable = table;

  return pdp;

}( PDP || {} ));
