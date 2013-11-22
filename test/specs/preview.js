(function(){

  'use strict';

  function setUpHTMLFixture() {
    jasmine.getFixtures().set('<h2>Preview the results</h2><div class="msg preview-table"></div><div class="preview closed"><p class="nlw">There are <em class="calculating"><img src="static/img/icon_spinner_2x.gif" alt="Loading icon" height="30" width="30" class="spinnergif"></em><strong class="count">many</strong> HMDA records from <strong class="years">2007 - 2012</strong> with the above selected filters.</p><div class="title"><a href="#preview"><h3><i class="icon-minus-alt"></i>Preview the first 100 rows</h3></a></div><div id="preview"><div class="spinning"></div></div></div>');
  }

  describe('The preview panel on the filter page', function(){

    beforeEach(function() {
      setUpHTMLFixture();
    });

    it('should have stopped loading', function() {
        PDP.preview.startLoading();
        PDP.preview.stopLoading();
        expect(PDP.preview.nlw.$el.hasClass('loading')).toBeFalsy();
    });

    it('should be able to show its preview table', function() {
        PDP.preview.showTable();
        expect($('.preview')).not.toHaveClass('closed');
    });

    it('should be able to hide its preview table', function() {
        PDP.preview.hideTable();
        expect($('.preview').attr('class')).toBe('preview closed');
    });

    it('should be able to disable its preview table', function() {
        PDP.preview.disableTable();
        expect($('.preview .title').attr('class')).toBe('title disabled');
        expect($('.msg.preview-table').length).toBeTruthy();
    });

    it('should properly request JSON from the API', function(){
      var time = new Date().getTime();
      expect( PDP.preview._fetchPreviewJSON()._timestamp ).toBeGreaterThan( time );
    });

    it('should be update to update itself', function(){
      PDP.preview.update();
      expect(PDP.preview.$el).toBeTruthy();
    });

    it('should show the download size to the user', function(){
      PDP.preview.updateDownloadSize();
      expect(PDP.preview.$downloadSize).not.toHaveClass('hidden');
    });

    it('should show the download size to the user', function(){
      PDP.preview.updateTable();
      expect(PDP.preview.$el.find('tr')).toBeTruthy();
      expect(PDP.preview.$el.find('td')).toBeTruthy();
    });

  });

})();
