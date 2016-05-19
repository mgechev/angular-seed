describe('Practices', () => {
  beforeEach(() => {
    browser.get('/Home');
    it('should login with valid UserName and Password', () => {
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        browser.sleep(4000);
    });
    element.all(by.css('.nav-item li')).then(function(items) {
        expect(items[7].getText()).toBe('Practice');
    });
  });
  it('should navigate to Practices', () => {
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain('/Admin/Practice');
  });
  it('should show list of practices', () => {
      element.all(by.repeater('practice in practiceList')).then(function(items) {
          expect(items[0].getText()).toBe('EBS');
      });
  });
  it('should click on edit', () => {
      element.all(by.linkText('Edit')).click();
      expect(browser.getCurrentUrl()).toContain('/Admin/Practice/Edit');
  });
  it('should delete when click on Delete', () => {
      element.all(by.linkText('Delete')).click();
      element.all(by.repeater('practice in practiceList')).count().then(function(count) {
          expect(count).toBe(count - 1);
      });
  });
  it('should click on Add New', () => {
      element.all(by.id('addNew')).click();
      expect(element.all(by.id('practice')).getText()).toBe('');
  });
});
