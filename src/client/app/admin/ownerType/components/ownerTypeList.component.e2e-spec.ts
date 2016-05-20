describe('OwnerType List', () => {
    beforeEach(() => {
        browser.get('/Login');
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        element(by.id('ownerTypeLink')).click();
    });
    it('should navigate to ownerType', () => {
        expect(browser.getCurrentUrl()).toContain('/App/Admin/OwnerType');
    });
    it('should navigate to ownerType', () => {
         var list = element.all(by.css('tr'));
         expect(list.count()).toBeGreaterThan(0);
    });
    it('should navigate to edit ownerType', () => {
        element.all(by.css('tr td a')).get(1).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/OwnerType/Edit');
    });
    it('should Delete ownerType', () => {
       var beforeDeletelist:any;
       var afterDeletelist:any;
       beforeDeletelist = element.all(by.css('tr')).count();
       afterDeletelist = element.all(by.css('tr')).count();
        expect(afterDeletelist).toEqual(beforeDeletelist - 1);
    });
      it('should click on Add New ownerType', () => {
      element.all(by.id('addNewOwnerType')).click();
      expect(browser.getCurrentUrl()).toContain('/App/Admin/OwnerType/Add');
  });
});
