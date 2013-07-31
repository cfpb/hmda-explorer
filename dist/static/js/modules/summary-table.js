// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  var table = {};

  table.$el = $('#summary-table');

  // cache input fields
  table._inputs = {};
  table._inputs.all = $('*[data-summary-table-input]');
  table._inputs.year = table.$el.find('#year');
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

  table.radioTmpl = function(field, checkedVal) {
    var checked = (checkedVal) ? 'checked="checked"' : '';
    return '<input type="radio" value="' + field + '"' + checked + '>' + field + '</input>';
  };

  // fetches field names and populates select options
  table._populateOptions = function() {
    table._populateFields(table._inputs.varFields, table.fields, table.optionTmpl);

    // populate year field
    table._populateSingleInput(table._inputs.year, table._years, table.optionTmpl);

    // populate calculated by field
    table._populateFields([table._inputs.calculate], table.calculateFields, table.radioTmpl);
  };

  // populates variable and calculate by fields
  // inputs param: array or jQObjs or single jQObj
  // fields param: array of field values
  // tmpl: function that returns string of html
  table._populateFields = function(inputs, fields, tmpl) {
    var inputsLen = inputs.length,
        fieldsLen = fields.length - 1,
        i,
        domField,
        first = true;

    while (inputsLen--) {
      domField = inputs[inputsLen];

      for (i=0; i<=fieldsLen; i++) {
        domField.append(tmpl(fields[i]), first);

        first = false;
      }
    } 
  };

  // populates year field
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
    this.$el.find('select').chosen({
      width: '100%',
      disable_search_threshold: 10,
      allow_single_deselect: true
    });
  };

  table.updateTable = function() {
    var queryObj = {};
    queryObj.clauses = [];

    queryObj.clauses.where = pdp.query.params;
    queryObj.clauses.select = ['applicant_sex_name', 'state_name'];
    queryObj.clauses.group = ['applicant_sex_name', 'state_name'];

    console.log( pdp.query.buildApiQuery( queryObj ) );
  };

  table.init = function() {
    table._populateOptions();
    table._chosenInit();

    // event listener for form changes
    this._inputs.all.on('change', function() {
      this.updateTable();
    }.bind(this));
  };

  pdp.summaryTable = table;

  return pdp;

}( PDP || {} ));
