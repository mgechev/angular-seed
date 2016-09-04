describe('People', () => {

  beforeEach( () => {
    browser.get('/people');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('sd-people h2')).getText()).toEqual('LMAO');
  });

});
