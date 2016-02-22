describe('About', function() {

  beforeEach(function() {
    browser.get('about');
  });

  it('should have correct feature heading', function() {
      expect(element(by.css('sd-app sd-about h2')).getText())
      .toEqual('Features');
  });
});
