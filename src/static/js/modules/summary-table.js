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
  table._inputs.varFields = [$('#variable0'), $('#variable1'), $('#variable2')];
  table._inputs.calculate = $('#calculate-by');

  // stubs for field data until api endpoints are implemented
  table._years = ['2011', '2012'];
  table.fields = ['state_name', 'property_type_name', 'owner_occupancy_name'];

  // map for select clause statements and calculate by field values
  table.metrics = {
    'income-min': 'MIN(applicant_income_000s)',
    'income-max': 'MAX(applicant_income_000s)',
    'income-avg': 'AVG(applicant_income_000s)',
    'loan-min': 'MIN(loan_amount_000s)',
    'loan-max': 'MAX(loan_amount_000s)',
    'loan-avg': 'AVG(loan_amount_000s)',
    'loan-sum': 'SUM(loan_amount_000s)'
  };

  table.queryParams = {};
  table.queryParams.clauses = {};

  // returns a templated option tag
  table.optionTmpl = function(field, defaultOp) {
    var def = (defaultOp) ? 'selected' : '';

    return '<option value="' + field + '"' + def + '>' + field + '</option>';
  };

  // fetches field names and populates select options
  table._populateOptions = function() {
    table._populateFields(table._inputs.varFields, table.fields, table.optionTmpl);
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

  table._chosenInit = function() {
    this.$el.find('select').chosen({
      width: '100%',
      disable_search_threshold: 10,
      allow_single_deselect: true
    });
  };

  // event handler, called when a form field changes
  table.updateTable = function(e) {
    var value = e.target.selectedOptions[0].value,
        position = e.target.id.substr( -1, 1 );

    if ( e.target.id === 'calculate-by' ) {
      value = this.metrics[e.target.selectedOptions[0].value];
      position = 3;
    }
  
    this.updateQuery( 
      e.target.dataset.summaryTableInput,
      value,
      position
    );

    console.log( pdp.query._buildApiQuery( this.queryParams ) );

  };

  // updates object that reflects selected form options
  table.updateQuery = function( clause, value, position ) {

    if ( clause === 'both') {
      this.updateQuery( 'select', value, position );
      this.updateQuery( 'group', value, position );
      return;
    }

    if ( typeof this.queryParams.clauses[clause] === 'undefined' ) {
      this.queryParams.clauses[clause] = [];
    }

    this.queryParams.clauses[clause][position] = value;
    this.queryParams.clauses.where = pdp.query.params;

  };

  table.init = function() {
    table._populateOptions();
    table._chosenInit();

    // event listener for form changes
    this._inputs.all.on('change', function(e) {
      this.updateTable(e);
    }.bind(this));
  };

  pdp.summaryTable = table;

  return pdp;

}( PDP || {} ));
