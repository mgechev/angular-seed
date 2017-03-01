import { OkabrionzPage } from './app.po';

describe('okabrionz App', () => {
  let page: OkabrionzPage;

  beforeEach(() => {
    page = new OkabrionzPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
