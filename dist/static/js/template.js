this["PDP"] = this["PDP"] || {};
this["PDP"]["templates"] = this["PDP"]["templates"] || {};

this["PDP"]["templates"]["location"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul class="fields location-set">\n\n  <!-- filter field -->\n  <li class="field popular">\n    <label for="state_abbr-' +
((__t = ( num )) == null ? '' : __t) +
'">State:</label>\n    <div class="widget select">\n      <select class="param" name="state_abbr-' +
((__t = ( num )) == null ? '' : __t) +
'" id="state_abbr-' +
((__t = ( num )) == null ? '' : __t) +
'" data-dependent="county_name-' +
((__t = ( num )) == null ? '' : __t) +
' census_tract_number-' +
((__t = ( num )) == null ? '' : __t) +
'" data-placeholder="Select a state">\n        <option value="AL">Alabama</option>\n        <option value="AK">Alaska</option>\n        <option value="AZ">Arizona</option>\n        <option value="AR">Arkansas</option>\n        <option value="CA">California</option>\n        <option value="CO">Colorado</option>\n        <option value="CT">Connecticut</option>\n        <option value="DE">Delaware</option>\n        <option value="DC">District of Columbia</option>\n        <option value="FL">Florida</option>\n        <option value="GA">Georgia</option>\n        <option value="HI">Hawaii</option>\n        <option value="ID">Idaho</option>\n        <option value="IL">Illinois</option>\n        <option value="IN">Indiana</option>\n        <option value="IA">Iowa</option>\n        <option value="KS">Kansas</option>\n        <option value="KY">Kentucky</option>\n        <option value="LA">Louisiana</option>\n        <option value="ME">Maine</option>\n        <option value="MD">Maryland</option>\n        <option value="MA">Massachusetts</option>\n        <option value="MI">Michigan</option>\n        <option value="MN">Minnesota</option>\n        <option value="MS">Mississippi</option>\n        <option value="MO">Missouri</option>\n        <option value="MT">Montana</option>\n        <option value="NE">Nebraska</option>\n        <option value="NV">Nevada</option>\n        <option value="NH">New Hampshire</option>\n        <option value="NJ">New Jersey</option>\n        <option value="NM">New Mexico</option>\n        <option value="NY">New York</option>\n        <option value="NC">North Carolina</option>\n        <option value="ND">North Dakota</option>\n        <option value="OH">Ohio</option>\n        <option value="OK">Oklahoma</option>\n        <option value="OR">Oregon</option>\n        <option value="PA">Pennsylvania</option>\n        <option value="RI">Rhode Island</option>\n        <option value="SC">South Carolina</option>\n        <option value="SD">South Dakota</option>\n        <option value="TN">Tennessee</option>\n        <option value="TX">Texas</option>\n        <option value="UT">Utah</option>\n        <option value="VT">Vermont</option>\n        <option value="VA">Virginia</option>\n        <option value="WA">Washington</option>\n        <option value="WV">West Virginia</option>\n        <option value="WI">Wisconsin</option>\n        <option value="WY">Wyoming</option>\n      </select>\n    </div>\n    <div class="help" title="Select one or more states you would like to see mortgage data from."><i class="icon-help-alt"></i></div>\n  </li>\n  <!-- /filter field -->\n\n  <!-- filter field -->\n  <li class="field disabled">\n    <label for="msamd-' +
((__t = ( num )) == null ? '' : __t) +
'">MSA:</label>\n    <div class="widget select">\n      <select class="param" name="msamd-' +
((__t = ( num )) == null ? '' : __t) +
'" id="msamd-' +
((__t = ( num )) == null ? '' : __t) +
'" multiple data-placeholder="Select a state above" data-pre-placeholder="Select a state above" data-post-placeholder="Select an MSA">\n      </select>\n    </div>\n    <div class="help" title="Select an MSA if you please."><i class="icon-help-alt"></i></div>\n  </li>\n  <!-- /filter field -->\n\n  <!-- filter field -->\n  <li class="field">\n    <label for="county_name-' +
((__t = ( num )) == null ? '' : __t) +
'">County:</label>\n    <div class="widget select">\n      <select class="param" name="county_name-' +
((__t = ( num )) == null ? '' : __t) +
'" id="county_name-' +
((__t = ( num )) == null ? '' : __t) +
'" multiple data-concept="fips" data-placeholder="Select a state above" data-pre-placeholder="Select a state above" data-post-placeholder="Select a county">\n      </select>\n    </div>\n    <div class="help" title="Select a county."><i class="icon-help-alt"></i></div>\n  </li>\n  <!-- /filter field -->\n\n  <!-- filter field -->\n  <li class="field disabled">\n    <label for="census_tract_number-' +
((__t = ( num )) == null ? '' : __t) +
'">Census tract:</label>\n    <div class="widget select">\n      <select class="param" name="census_tract_number-' +
((__t = ( num )) == null ? '' : __t) +
'" id="census_tract_number-' +
((__t = ( num )) == null ? '' : __t) +
'" multiple data-concept="census_tract_number" data-placeholder="Select a state above" data-pre-placeholder="Select a state above" data-post-placeholder="Select a census">\n      </select>\n    </div>\n    <div class="help" title="A census tract, or census area, or census district is a geographic area defined for the purpose of taking a census. Usually these coincide with the limits of cities and towns, and several tracts often exist within a county."><i class="icon-help-alt"></i></div>\n  </li>\n  <!-- /filter field -->\n\n<ul>';

}
return __p
};

this["PDP"]["templates"]["option"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<option value="' +
((__t = ( value )) == null ? '' : __t) +
'">' +
((__t = ( label )) == null ? '' : __t) +
'</option>';

}
return __p
};
