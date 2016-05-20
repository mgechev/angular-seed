describe('Technology List', () => {
    beforeEach(() => {
        browser.get('/Login');
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        element(by.id('technologyLink')).click();
    });
    it('should navigate to Technologies', () => {
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Technology');
    });
    it('should navigate to Technology', () => {
         var list = element.all(by.css('tr'));
         expect(list.count()).toBeGreaterThan(0);
    });
    it('should navigate to edit', () => {
        element.all(by.css('tr td a')).get(1).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Technology/Edit');
    });
    it('should Delete', () => {
       var beforeDeletelist:any;
       var afterDeletelist:any;
       beforeDeletelist = element.all(by.css('tr')).count();
       afterDeletelist = element.all(by.css('tr')).count();
        expect(afterDeletelist).toEqual(beforeDeletelist - 1);
    });
      it('should click on Add New', () => {
      element.all(by.id('addNewTech')).click();
      expect(browser.getCurrentUrl()).toContain('/App/Admin/Technology/Add');
  });
});
