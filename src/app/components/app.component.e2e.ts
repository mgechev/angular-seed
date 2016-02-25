describe('App', function() {

  beforeEach(function() {
      browser.get('');
  });

  it('should have a title', function() {
      expect(browser.getTitle()).toEqual('Angular 2 Seed');
  });

  it('should have <nav>', function() {
      expect(element(by.css('sd-app sd-navbar nav')).isPresent()).toEqual(true);
  });

  it('should have correct nav text for Home', function() {
      expect(element(by.css('sd-app sd-navbar nav a:first-child')).getText()).toEqual('HOME');
  });

  it('should have correct nav text for About', function() {
      expect(element(by.css('sd-app sd-navbar nav a:last-child')).getText()).toEqual('ABOUT');
  });

});
