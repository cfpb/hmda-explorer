// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  var table = {};

  table.$el = $('#summary-table-form');

  // cache input fields
  table._inputs = {};
  table._inputs.all = $('*[data-summary-table-input]');
  table._inputs.varFields = [$('#variable0'), $('#variable1'), $('#variable2')];
  table._inputs.calculate = $('#calculate-by');

  table.genericError = 'Sorry, something went awry when we tried to load your data. Please try again?';

  // avert your eyes
  // we could call the api every time
  // or we can just do this
  // this is a subset of all available dimensions anyway
  table.fields = ['action_taken_name','agency_name', 'applicant_ethnicity_name','applicant_race_name_1','census_tract_number','co_applicant_ethnicity_name','co_applicant_race_name_1','co_applicant_sex_name','county_name','denial_reason_name_1','hoepa_status_name','lien_status_name','loan_purpose_name','loan_type_name','msamd_name','owner_occupancy_name','preapproval_name','property_type_name','purchaser_type_name', 'respondent_id', 'state_name'];

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

  // holds onto user-selected options. consists of clauses object + pdp.query.params
  table.queryParams = {};

  // clauses = { select|group: ['var_name_0', 'var_name_1', 'var_name_2', 'calculate-by'] }
  table.queryParams.clauses = {};

  // returns a templated option tag
  table.optionTmpl = function(field, defaultOp) {
    var def = (defaultOp) ? 'selected' : '';

    return '<option value="' + field + '"' + def + '>' + pdp.utils.varToTitle( field ) + '</option>';
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

  // inits chosen library to make pretty form fields
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
        position = e.target.id.substr( -1, 1 ),
        clause = e.target.dataset.summaryTableInput,
        responseJSON;

    // if they've selected a placeholder, reset the column
    // a placeholder has no value
    if ( e.target.selectedOptions[0].hasAttribute('placeholder') ) {
      this.resetColumn( clause, position );
      return;
    }

    // if the event occurred on the calculate by field, 
    // get the query string from the metrics map and
    // make sure it gets set to the third queryParams.clauses array 
    if ( e.target.id === 'calculate-by' ) {
      value = this.metrics[value];
      position = 3;
    }

    this.updateQuery( 
      clause,
      value,
      position
    );

    // reset it before the data comes back and builds
    this.resetTable();

    // console.log( pdp.query._buildApiQuery( this.queryParams ) );
    responseJSON = pdp.utils.getJSON( pdp.query.generateApiUrl( 'jsonp?$callback=', this.queryParams ) );

    responseJSON.fail( this._throwFetchError );

    responseJSON.done( this.populateTable.bind(this) );

    // in the meantime, spin!
    this._showSpinner();

  };

  table._showSpinner = function() {
    $('<div class="spinning"></div>').insertAfter('table#summary-table');
  };

  table._removeSpinner = function() {
    $('.spinning').remove();
  };

  // removes table contents
  // resets table headers to current choices
  table.resetTable = function() {
    var $table = $('table#summary-table');
    $table.empty();
    this.updateTableHeaders();
  };

  // builds out table body from API JSON response data
  table.populateTable = function( responseData ) {
    var total, result, column, i, $tr,
        $table = $('table#summary-table'),
        len = responseData.results.length;

    this._removeSpinner();

    if ( !_.isEmpty(responseData.errors) ) {
      this._throwFetchError();
      return;
    }

    for (i=0; i<=len; i++) {
      $tr = $('<tr></tr>');
      for (column in responseData.results[i]) {
        if (responseData.results[i].hasOwnProperty(column)) {
          $tr.append('<td>' + responseData.results[i][column] + '</td>');
        }
      }

      $table.append($tr);
    }
  
  };

  table._throwFetchError = function() {
      pdp.utils.showError( this.genericError );
  };

  // remove the var name from the queryParams.clauses arrays
  // recursive if the data attribute data-summary-table-input
  // is set to "both" to update both select and group arrays
  table.resetColumn = function( clause, position ) {
    if ( clause === 'both' ) {
      this.queryParams.clauses['select'].splice( position, 1 );
      this.resetColumn( 'group', position );
      return;
    }

    this.queryParams.clauses[clause].splice( position, 1 );

    this.resetTable();
  };

  // updates object that reflects selected form options
  // recursive if the data attribute data-summary-table-input
  // is set to "both" to update both select and group arrays
  table.updateQuery = function( clause, value, position ) {

    if ( clause === 'both') {
      this.updateQuery( 'select', value, position );
      this.updateQuery( 'group', value, position );
      return;
    }

    // if its the first time this clause is being used, create new array
    if ( typeof this.queryParams.clauses[clause] === 'undefined' ) {
      this.queryParams.clauses[clause] = [];
    }

    this.queryParams.clauses[clause][position] = value;

    // re-copies the filters
    this.queryParams.clauses.where = pdp.query.params;

  };

  // create structure of table
  table.createTable = function() {
    $('#summary-table-container').append('<table id="summary-table"></table>');
    this.$table = $('table#summary-table');

    return this.$table;
  };  

  table.updateTableHeaders = function() {
    var $table = $('table#summary-table'),
        $headerRow = $('<tr class="header"></tr>'),
        columns = this.queryParams.clauses.select,
        i,
        len = columns.length - 1;

    for (i=0; i<=len; i++) {
      if (typeof columns[i] !== 'undefined') {
        $headerRow.append('<td id="' + columns[i] + '">' + pdp.utils.varToTitle( columns[i] ) + '</td>');
      }
    }

    $table.prepend($headerRow);
  };

  table.init = function() {
    table._populateOptions();
    table._chosenInit();
    table.createTable();

    // fields should be disabled until a first variable is selected
    // we don't want users selecting subsequent vars when earlier
    // ones are undefined
    $('#variable1, #variable2').attr('disabled', 'disabled').trigger('liszt:updated');

    // event listener for form changes
    this._inputs.all.on('change', function(e) {
      this.updateTable(e);

      if (e.target.id !== 'calculate-by') {
        var position = e.target.id.substr( -1, 1 );

        $('#variable'.concat(++position)).removeAttr('disabled').trigger('liszt:updated');

        if (position > 0) {
          $('#reset-' + e.target.id).removeClass('hidden');
        }
      }

    }.bind(this));

    $('.reset-field').on('click', function(e) {
      e.preventDefault();
      var position = e.target.id.substr( -1, 1 ),
          clause = e.target.dataset.summaryTableInput;

      this.resetColumn( clause, position );
      $(e.target).addClass('hidden');
      $('#variable' + position)
        .find('option:first-child')
        .prop('selected', true)
        .end()
        .trigger('liszt:updated');

      $('#variable'.concat(++position)).attr('disabled', 'disabled').trigger('liszt:updated');

    }.bind( this ));
  };

  pdp.summaryTable = table;

  return pdp;

}( PDP || {} ));
