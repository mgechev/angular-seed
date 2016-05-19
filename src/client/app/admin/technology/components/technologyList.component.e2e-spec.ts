describe('Technologies', () => {
  beforeEach(() => {
    browser.get('/Home');
    element.all(by.css('.nav-item li')).then(function(items) {
        expect(items[9].getText()).toBe('Technology');
    });
  });
  it('should navigate to Technologies', () => {
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain('/Admin/Technology');
  });
  it('should show list of Technologies', () => {
      element.all(by.repeater('technology in technologyList')).then(function(items) {
          expect(items[0].getText()).toBe('Microsoft');
      });
  });
  it('should click on edit', () => {
      element.all(by.linkText('Edit')).click();
      expect(browser.getCurrentUrl()).toContain('/Admin/Technology/Edit');
  });
  it('should delete when click on Delete', () => {
      element.all(by.linkText('Delete')).click();
      element.all(by.repeater('technology in technologyList')).count().then(function(count) {
          expect(count).toBe(count - 1);
      });
  });
  it('should click on Add New', () => {
      element.all(by.id('addNewTech')).click();
      browser.sleep(500);
      expect(browser.getCurrentUrl()).toContain('/Admin/Technology/Edit');
  });
});
