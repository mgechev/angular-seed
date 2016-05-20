describe('Interview Round Add', () => {
    beforeEach(() => {
        browser.get('/Login');
        element(by.id('userName')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin');
        element(by.id('loginBtn')).click();
        element(by.id('interviewRoundLink')).click();
    });
    it('Should save the Interview Round', () => {
        var beforeAdd: any;
        var afterAdd: any;
        beforeAdd = element.all(by.css('tr')).count();
        element.all(by.id('addNewRound')).click();
        element(by.id('interviewRound')).sendKeys('TestRound');
        element(by.id('saveRound')).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/InterviewRounds');
        afterAdd = element.all(by.css('tr')).count();
        expect(afterAdd).toEqual(beforeAdd + 1);
    });
    it('Should cancel', () => {
        element.all(by.id('addNewRound')).click();
        element(by.id('canceleRound')).click();
        expect(browser.getCurrentUrl()).toContain('/App/Admin/InterviewRounds');
    });

    it('should navigate to edit', () => {
        var row = element.all(by.css('tr td a')).get(1);
        element.all(by.css('tr td a')).get(1).click();
        element(by.id('interviewRound')).clear();
        element(by.id('interviewRound')).sendKeys('TestEdit');
        element(by.id('saveRound')).click();
        expect(row.getText()).toBe('TestEdit');
    });
});
