describe('About', () => {

  beforeEach( () => {
    browser.get('/');
    element.all(by.css('nav > a')).get(2).click();
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('sd-about h2')).getText()).toEqual('Features');
  });

});
