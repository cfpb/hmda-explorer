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

  // temp arrays. stubs for api endpoints to come.
  table.years = ['2012', '2011'];
  table.fields = ['state_name', 'property_type_name', 'owner_occupancy_name'];
  table.calculateFields = ['records', 'sum', 'min', 'max'];

  table.optionTmpl = function(field) {
    return '<option id="' + field + '">' + field + '</option>';
  };

  // fetches field names and populates select options
  table._populateOptions = function() {
    table._populateVarFields();
    //table._populateCalculatedField();
  };

  table._populateVarFields = function() {
    var inputsLen = table._inputs.varFields.length,
        fieldsLen = table.fields.length,
        i,
        varDropDown;
    while (inputsLen--) {
      varDropDown = table._inputs.varFields[inputsLen];
      for (i=0; i<fieldsLen; i++) {
        varDropDown.append(table.optionTmpl(table.fields[fieldsLen]));
      }
    } 
  };

  table.init = function() {
    table._populateOptions();
  };

  pdp.summaryTable = table;

}( PDP || {} ));
