describe('Login', () => {

  beforeEach( () => {
    browser.get('/');
  });
  
  
  it('should login with valid UserName and Password', () => {
        element( by.id('userName') ).sendKeys('admin');
		element( by.id('password') ).sendKeys('admin');
        element( by.id('loginBtn') ).click();
        browser.sleep(4000);
        expect(browser.getCurrentUrl()).toContain('/Home');
  });
});
