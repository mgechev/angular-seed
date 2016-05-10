describe('Home', () => {

  beforeEach( () => {
    browser.get('/');
  });

  it('should have an input', () => {
    expect(element(by.css('sd-app sd-home form input')).isPresent()).toEqual(true);
  });

  it('should have a list of computer scientists', () => {
    expect(element(by.css('sd-app sd-home ul')).getText())
      .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper');
  });

  it('should add a name to the list using the form', () => {
    element(by.css('sd-app sd-home form input')).sendKeys('Tim Berners-Lee');
    element(by.css('sd-app sd-home form button')).click();
    let el = element.all(by.repeater('name of nameListService.get()')).get(0);
    expect(el.getText()).toEqual('Edsger Dijkstra');
    /*
    expect(element(by.css('sd-app sd-home ul')).getText())
      .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper\nTim Berners-Lee');
    */
  });
});
