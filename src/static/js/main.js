// Scope
// ----------------

// To avoid global scope pollution, assign all properties and methods to a
// PDP object, first checking if the object already exists.

var PDP = PDP || (function(){

  // The Query Object
  // ----------------

  // The `query` object is used to store all our filter values. 
  // Whenever a filter is changed, `query` is updated.
  // We can also do the reverse: populate filters based on `query`'s values.

  var query = {
    as_of_year: [2012],
    state_abbr: [],
    msamd: [],
    county_name: [],
    census_tract_number: [],
    agency_code: []
  };

  // Mix in the EventEmitter

  $.extend( query, EventEmitter.prototype );

  var setQuery = function() {

  };

  return {
    query: query,
    setQuery: setQuery
  };

}());
