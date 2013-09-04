<!-- filter field -->
<li class="field popular">
  <label for="state_abbr-<%= num %>">State:</label>
  <div class="widget select">
    <select class="param" name="state_abbr-<%= num %>" id="state_abbr-<%= num %>" data-dependent="county_name-<%= num %> census_tract_number-<%= num %>" data-placeholder="Select a state">
      <option value="AL">Alabama</option>
      <option value="AK">Alaska</option>
      <option value="AZ">Arizona</option>
      <option value="AR">Arkansas</option>
      <option value="CA">California</option>
      <option value="CO">Colorado</option>
      <option value="CT">Connecticut</option>
      <option value="DE">Delaware</option>
      <option value="DC">District of Columbia</option>
      <option value="FL">Florida</option>
      <option value="GA">Georgia</option>
      <option value="HI">Hawaii</option>
      <option value="ID">Idaho</option>
      <option value="IL">Illinois</option>
      <option value="IN">Indiana</option>
      <option value="IA">Iowa</option>
      <option value="KS">Kansas</option>
      <option value="KY">Kentucky</option>
      <option value="LA">Louisiana</option>
      <option value="ME">Maine</option>
      <option value="MD">Maryland</option>
      <option value="MA">Massachusetts</option>
      <option value="MI">Michigan</option>
      <option value="MN">Minnesota</option>
      <option value="MS">Mississippi</option>
      <option value="MO">Missouri</option>
      <option value="MT">Montana</option>
      <option value="NE">Nebraska</option>
      <option value="NV">Nevada</option>
      <option value="NH">New Hampshire</option>
      <option value="NJ">New Jersey</option>
      <option value="NM">New Mexico</option>
      <option value="NY">New York</option>
      <option value="NC">North Carolina</option>
      <option value="ND">North Dakota</option>
      <option value="OH">Ohio</option>
      <option value="OK">Oklahoma</option>
      <option value="OR">Oregon</option>
      <option value="PA">Pennsylvania</option>
      <option value="RI">Rhode Island</option>
      <option value="SC">South Carolina</option>
      <option value="SD">South Dakota</option>
      <option value="TN">Tennessee</option>
      <option value="TX">Texas</option>
      <option value="UT">Utah</option>
      <option value="VT">Vermont</option>
      <option value="VA">Virginia</option>
      <option value="WA">Washington</option>
      <option value="WV">West Virginia</option>
      <option value="WI">Wisconsin</option>
      <option value="WY">Wyoming</option>
    </select>
  </div>
  <div class="help" title="Select one or more states you would like to see mortgage data from."><i class="icon-help-alt"></i></div>
</li>
<!-- /filter field -->

<!-- filter field -->
<li class="field disabled">
  <label for="msamd-<%= num %>">MSA:</label>
  <div class="widget select">
    <select class="param" name="msamd-<%= num %>" id="msamd-<%= num %>" multiple data-placeholder="Select a state above" data-pre-placeholder="Select a state above" data-post-placeholder="Select an MSA">
    </select>
  </div>
  <div class="help" title="Select an MSA if you please."><i class="icon-help-alt"></i></div>
</li>
<!-- /filter field -->

<!-- filter field -->
<li class="field">
  <label for="county_name-<%= num %>">County:</label>
  <div class="widget select">
    <select class="param" name="county_name-<%= num %>" id="county_name-<%= num %>" multiple data-concept="fips" data-placeholder="Select a state above" data-pre-placeholder="Select a state above" data-post-placeholder="Select a county">
    </select>
  </div>
  <div class="help" title="Select a county."><i class="icon-help-alt"></i></div>
</li>
<!-- /filter field -->

<!-- filter field -->
<li class="field disabled">
  <label for="census_tract_number-<%= num %>">Census tract:</label>
  <div class="widget select">
    <select class="param" name="census_tract_number-<%= num %>" id="census_tract_number-<%= num %>" multiple data-concept="census_tract_number" data-placeholder="Select a state above" data-pre-placeholder="Select a state above" data-post-placeholder="Select a census">
    </select>
  </div>
  <div class="help" title="A census tract, or census area, or census district is a geographic area defined for the purpose of taking a census. Usually these coincide with the limits of cities and towns, and several tracts often exist within a county."><i class="icon-help-alt"></i></div>
</li>
<!-- /filter field -->
