describe('designation List', () => {
    beforeEach(() => {
        browser.get('/Login');
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        element(by.id('designationLink')).click();
    });
    it('should navigate to designation', () => {
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Designation');
    });
    it('should navigate to designation', () => {
         var list = element.all(by.css('tr'));
         expect(list.count()).toBeGreaterThan(0);
    });
    it('should navigate to edit designation', () => {
        element.all(by.css('tr td a')).get(1).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Designation/Edit');
    });
    it('should Delete designation', () => {
       var beforeDeletelist:any;
       var afterDeletelist:any;
       beforeDeletelist = element.all(by.css('tr')).count();
       afterDeletelist = element.all(by.css('tr')).count();
        expect(afterDeletelist).toEqual(beforeDeletelist - 1);
    });
      it('should click on Add New designation', () => {
      element.all(by.id('addNewDestination')).click();
      expect(browser.getCurrentUrl()).toContain('/App/Admin/Designation/Add');
  });
});
