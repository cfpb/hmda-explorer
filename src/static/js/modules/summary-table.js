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
  table.fields = ['action_taken_name','agency_name', 'applicant_ethnicity_name', 'applicant_sex_name', 'applicant_race_name_1','census_tract_number','co_applicant_ethnicity_name','co_applicant_race_name_1','co_applicant_sex_name','county_name','denial_reason_name_1','hoepa_status_name','lien_status_name','loan_purpose_name','loan_type_name','msamd_name','owner_occupancy_name','preapproval_name','property_type_name','purchaser_type_name', 'respondent_id', 'state_name'];

  // map for select clause statements and calculate by field values
  table.metrics = {
    'income-min': {
      'api': 'MIN(applicant_income_000s)',
      'human': 'Applicant Income Minimum'
    },
    'income-max': {
      'api': 'MAX(applicant_income_000s)',
      'human': 'Applicant Income Maximum'
    },
    'income-avg': {
      'api': 'AVG(applicant_income_000s)',
      'human': 'Applicant Income Average'
    },
    'loan-min': {
      'api': 'MIN(loan_amount_000s)',
      'human': 'Loan Amount Minimum'
    },
    'loan-max': {
      'api': 'MAX(loan_amount_000s)',
      'human': 'Loan Amount Maximum'
    },
    'loan-avg': {
      'api': 'AVG(loan_amount_000s)',
      'human': 'Loan Amount Average'
    },
    'loan-sum': {
      'api': 'SUM(loan_amount_000s)',
      'human': 'Loan Amount Sum'
    }
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
        clause = e.target.dataset.summaryTableInput;

    // if they've selected a placeholder, ignore it
    // a placeholder has no value
    if ( e.target.selectedOptions[0].hasAttribute('placeholder') ) {
      return;
    }

    // if the event occurred on the calculate by field, 
    // get the query string from the metrics map and
    // make sure it gets set to the third queryParams.clauses array 
    if ( e.target.id === 'calculate-by' ) {
      value = this.metrics[value].api;
      position = 3;
    }

    this.updateQuery( 
      clause,
      value,
      position
    );

    // reset it before the data comes back and builds
    this.resetTable();

    this._requestData();

    this._updateFields( value, position );
  };

  // hide variables already selected from subsequent drop downs
  // or
  // show variables that are unselected due to column reset
  table._updateFields = function(value, position) {
    if ( position < 2 ) {
      for (position; position<=2; position++) {
        $('#variable' + position)
          .find('option[value=' + value + ']')
          .toggleClass('hidden')
          .trigger('liszt:updated');
      }
    }
  };

  table._requestData = function() {
    var responseJSON;
    // console.log( pdp.query._buildApiQuery( this.queryParams ) );
    responseJSON = pdp.utils.getJSON( pdp.query.generateApiUrl( 'jsonp?$callback=', this.queryParams ) );

    responseJSON.fail( this._throwFetchError );

    responseJSON.done( this.populateTable.bind(this) );

    // in the meantime, spin!
    this._showSpinner();
  };

  table._showSpinner = function() {
    $('body').append('<div class="spinning"></div>');
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

  // takes query for calculate by field and
  // returns the value representation
  // ex. AVG(applicant_income_000s) to avg_applicant_income_000s
  table.queryToVal = function( qstr ) {
    var val, i;

    // split on parenthesis
    val = qstr.split(/\(|\)/);

    i = val.length;
    while (i--) {
      if ( val[i] === '' ) {
        val.splice(i, 1);
      }
    }

    val = val.join('_').toLowerCase();

    return val;
  };

  // builds out table body from API JSON response data
  table.populateTable = function( responseData ) {
    var total, result, column, i, $tr, cellValue,
        $table = $('table#summary-table'),
        len = responseData.results.length - 1,
        clauses, clauseLen = this.queryParams.clauses.select.length;

    this._removeSpinner();

    if ( !_.isEmpty(responseData.errors) ) {
      this._throwFetchError();
      return;
    }

    for (i=0; i<=len; i++) {
      $tr = $('<tr></tr>');

      for ( column=0; column<clauseLen; column++ ) {
        if ( typeof this.queryParams.clauses.select[column] !== 'undefined' ) {
          cellValue = responseData.results[i][this.queryParams.clauses.select[column]];

          if ( typeof cellValue === 'undefined' ) {
            cellValue = responseData.results[i][this.queryToVal( this.queryParams.clauses.select[column] )];
          }
          $tr.append('<td>' + cellValue + '</td>'); 
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
    var removedValue;
    if ( clause === 'both' ) {
      delete( this.queryParams.clauses['select'][position] );
      this.resetColumn( 'group', position );
      return;
    }

    removedValue = this.queryParams.clauses[clause][position];

    delete( this.queryParams.clauses[clause][position] );

    this.resetTable();
    this._updateFields( removedValue, position );
    this._requestData( clause, position );
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

  // generates <tr> of column headers
  table.updateTableHeaders = function() {
    var $table = $('table#summary-table'),
        $headerRow = $('<tr class="header"></tr>'),
        columns = this.queryParams.clauses.select.slice(0),
        i, val,
        len = columns.length;

    for (i=0; i<=len; i++) {
      if (typeof columns[i] !== 'undefined') {
        // 3 = array index of calculate by
        // calculate by = 3d vs. 2d since it has value id, 
        // query representation and human representation
        if ( i === 3 ) {
          // walk the calculate by or metrics map for the correct title
          for (val in this.metrics) {
            if (this.metrics[val].api === columns[i]) {
              columns[i] = this.metrics[val].human;
            }
          }
        }
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
    $('#variable1, #variable2, #calculate-by').attr('disabled', 'disabled').trigger('liszt:updated');

    // event listener for form changes
    this._inputs.all.on('change', function(e) {
      this.updateTable(e);

      if (e.target.id !== 'calculate-by') {
        var position = e.target.id.substr( -1, 1 );

        // enable subsequent variable field and calculate-by field
        $('#calculate-by, #variable'.concat(++position)).removeAttr('disabled').trigger('liszt:updated');

        // if this is variable 1 or 2, they're eligible to be removed, show link
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
