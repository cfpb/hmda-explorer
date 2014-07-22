/**
 *
 *  Could do a lot more, but it's good enough for now.
 *
 *  Inspired by https://github.com/jphpsf/jasmine-data-provider
 *
 *
 *
 * */
using = function (values, func) {
    for (var item in values) {
      func.call( this, values[item] );
      //Description should be positional; i.e., 3rd argument
      var _description = ( values[item][2] ? values[item][2] : '' );
      jasmine.getEnv().currentSpec += ' ' + _description + ' (Input: ' + values[item][0] + '. Expected: ' + values[item][1] + ')';
     }
};