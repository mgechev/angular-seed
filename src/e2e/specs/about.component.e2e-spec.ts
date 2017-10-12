import { browser, by, element } from 'protractor';

describe('About', () => {

  beforeEach(async () => {
    return await browser.get('/about');
  });

  it('should have correct feature heading', async () => {
    const text = await element(by.css('sd-about h2')).getText();
    expect(text).toEqual('Features');
  });

});
