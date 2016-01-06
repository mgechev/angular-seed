describe('App', function() {

  beforeEach(function() {
      browser.get('/dist/dev');
  });

  it('should have a title', function() {
      expect(browser.getTitle()).toEqual('My Angular2 App');
  });

  it('should have <section>', function() {
      expect(element(by.css('app section')).isPresent()).toEqual(true);
  });

  it('should have <nav>', function() {
      expect(element(by.css('app section nav')).isPresent()).toEqual(true);
  });

  it('should have correct nav text for Home', function() {
      expect(element(by.css('app section nav a:first-child')).getText()).toEqual('Home');
  });

  it('should have correct nav text for About', function() {
      expect(element(by.css('app section nav a:last-child')).getText()).toEqual('About');
  });

});
