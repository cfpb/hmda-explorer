/**
 *
 *   Could be similar to a Python generator.
 *  Inspired by https://github.com/jphpsf/jasmine-data-provider
 *
 * */
using = function (values, func) {
    for (var item in values) {
      func.call( this, values[item] );
      //Description should be positional; i.e., 3rd argument
      var _description = ( values[item][2] ? values[item][2] : '' );
      jasmine.currentEnv_.currentSpec.description += ' ' + _description + ' (Input: ' + values[item][0] + '. Expected: ' + values[item][1] + ')';
     }
}

