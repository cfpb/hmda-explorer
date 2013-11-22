(function(){

  'use strict';

  function setUpHTMLFixture() {
    jasmine.getFixtures().set('<div class="filter property closed" id="property"><div class="title"><a href="#property"><h3><i class="icon-minus-alt"></i> Property</h3></a><div class="desc">Property type and occupancy</div></div><ul class="fields"><li class="field popular"><label for="property_type">Property Type:</label><div class="widget checkbox"><label><input type="checkbox" class="param" name="property_type[]" value="1" id="foo"/>One-to-four family dwelling<br><label class="helper-text"> (other than manufactured housing)</label></label><label><input type="checkbox" class="param" name="property_type[]" value="2" />Manufactured housing</label><label><input type="checkbox" class="param" name="property_type[]" value="3" />Multifamily dwelling</label></div><div class="help" role="tooltip"><i class="icon-help-alt"></i></div><span class="help-text"><%= explore_tooltips_property_type %></span></li><li class="field popular"><label for="owner_occupancy">Will the owner use the property<br> as their primary residence?</label><div class="widget checkbox"><label><input type="checkbox" class="param" name="owner_occupancy[]" value="1" />Owner-occupied as a principal dwelling</label><label><input type="checkbox" class="param" name="owner_occupancy[]" value="2" />Not owner-occupied as a principal dwelling</label><label><input type="checkbox" class="param" name="owner_occupancy[]" value="3" />Not applicable</label></div><div class="help" role="tooltip"><i class="icon-help-alt"></i></div><span class="help-text">help text</span></li></ul></div>');
  }

  describe('The form on the explore page', function(){

    beforeEach(function() {
      setUpHTMLFixture();
    });

    it('should properly initialize', function() {
        PDP.form.init();
        expect(PDP.form.$fields.selector).toBe($('form .field:not(.ignore)').selector);
    });

    it('should all filter categories on load', function() {
      PDP.form.showSections();
      expect( $('.filter:not(.year), .no-summary #share') ).not.toHaveClass( 'hidden' );
    });

    it('should show a tooltip after the user saves the share url', function() {
      PDP.form.showSections();
      expect( $('.filter:not(.year), .no-summary #share') ).not.toHaveClass( 'hidden' );
    });

    it('be able to hide filters', function() {
      var $el = $('#property');
      PDP.form.hideFilter($el);
      expect( $el.attr('class') ).toBe( 'filter property closed' );
    });

    it('be able to un-hide filters', function() {
      var $el = $('#property'),
          $fields = $el.find('.fields');
      PDP.form.showFilter($el);
      expect( $el ).not.toHaveClass( 'closed' );
    });

  });

})();
