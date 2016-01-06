describe('Home', function() {

  beforeEach(function() {
    browser.get('/dist/dev');
  });

  it('should have correct h1', function() {
      expect(element(by.css('app section home h1')).getText())
      .toEqual('Howdy!');
  });

  it('should have correct h2', function() {
      expect(element(by.css('app section home h2')).getText())
      .toEqual('Gratz!');
  });

  it('should have correct success msg', function() {
      expect(element(by.css('app section home p')).getText())
      .toEqual('Your deployment of Angular 2 Seed worked perfectly! Click about (above) to get your reward!');
  });
});
