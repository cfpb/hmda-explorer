// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  var table = {};

  table._inputs = {};
  table._inputs.all = $('*[data-summary-table-input]');
  table._inputs.year = $('#year');
  table._inputs.varFields = [$('#variable1'), $('#variable2'), $('#variable3')];
  table._inputs.calculate = $('#calculate-by');

  table.years = ['2011', '2012'];
  table.fields = ['state_name', 'property_type_name', 'owner_occupancy_name'];
  table.calculateFields = ['records', 'sum', 'min', 'max'];

  table.optionTmpl = function(field, defaultOp) {
    var def = (defaultOp) ? 'selected' : '';

    return '<option value="' + field + '"' + def + '>' + field + '</option>';
  };

  // fetches field names and populates select options
  table._populateOptions = function() {
    table._populateVarFields();
    table._populateYearList();
    //table._populateCalculatedField();
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

  // table.years = desc list of years dataset is avail for
  table._populateYearList = function() {
    var yearsLen = table.years.length,
        firstYear = true;

    while (yearsLen--) {
      table._inputs.year.append(
        table.optionTmpl(table.years[yearsLen], firstYear)
      );

      firstYear = false;
    }
  };

  table._chosenInit = function() {
    $('.chzn-select').chosen({
      allow_single_deselect: true
    });
    $('.chzn-single').chosen();
  };
 
  table.init = function() {
    table._populateOptions();
    table._chosenInit();
  };

  pdp.summaryTable = table;

  return pdp;

}( PDP || {} ));
