describe('Qualification List', () => {
    beforeEach(() => {
        browser.get('/Login');
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        element(by.id('qualificationLink')).click();
    });
    it('should navigate to qualification', () => {
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Qualification');
    });
    it('should navigate to qualification', () => {
         var list = element.all(by.css('tr'));
         expect(list.count()).toBeGreaterThan(0);
    });
    it('should navigate to edit qualification', () => {
        element.all(by.css('tr td a')).get(1).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Qualification/Edit');
    });
    it('should Delete qualification', () => {
       var beforeDeletelist:any;
       var afterDeletelist:any;
       beforeDeletelist = element.all(by.css('tr')).count();
       afterDeletelist = element.all(by.css('tr')).count();
        expect(afterDeletelist).toEqual(beforeDeletelist - 1);
    });
      it('should click on Add New', () => {
      element.all(by.id('addNewQualification')).click();
      expect(browser.getCurrentUrl()).toContain('/App/Admin/Qualification/Add');
  });
});
