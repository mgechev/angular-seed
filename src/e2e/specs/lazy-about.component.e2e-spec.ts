describe('Lazy-About', () => {

  beforeEach(async () => {
    return await browser.get('/lazy-about');
  });

  it('should have correct header title', () => {
    expect(element(by.css('sd-lazy-about h1')).getText()).toEqual('lazy');
  });

});
