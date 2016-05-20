describe('Skill List', () => {
    beforeEach(() => {
        browser.get('/Login');
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        element(by.id('skillLink')).click();
    });
    it('should navigate to skill', () => {
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Skill');
    });
    it('should navigate to skill', () => {
         var list = element.all(by.css('tr'));
         expect(list.count()).toBeGreaterThan(0);
    });
    it('should navigate to edit skill', () => {
        element.all(by.css('tr td a')).get(1).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/Skill/Edit');
    });
    it('should Delete skill', () => {
       var beforeDeletelist:any;
       var afterDeletelist:any;
       beforeDeletelist = element.all(by.css('tr')).count();
       afterDeletelist = element.all(by.css('tr')).count();
        expect(afterDeletelist).toEqual(beforeDeletelist - 1);
    });
      it('should click on Add New skill', () => {
      element.all(by.id('addNewSkill')).click();
      expect(browser.getCurrentUrl()).toContain('/App/Admin/Skill/Add');
  });
});
