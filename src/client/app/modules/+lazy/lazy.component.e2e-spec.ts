describe('Lazy loaded module', () => {

  beforeEach( () => {
    browser.get('/');
    element.all(by.css('nav > a')).get(1).click();
  });

  it('should have correct heading', () => {
    expect(element(by.css('sd-lazy h2')).getText()).toEqual('How to configure a lazy module?');
  });

});
