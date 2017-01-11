describe('Lazy', () => {

  beforeEach(async () => {
    return await browser.get('/lazy');
  });

  it('should have correct header title', () => {
    expect(element(by.css('sd-lazy h1')).getText()).toEqual('lazy2');
  });

});
