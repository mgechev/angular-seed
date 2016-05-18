describe('New Practices', () => {
    browser.get('/Admin/Practice/Edit');
});


it('Should save the practice', () => {
    element(by.id('practice')).sendKeys('Angular JS');
    element(by.id('savePractice')).click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/Admin/Practice');
});


it('Should cancele', () => {
    element(by.id('cancelePractice')).click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/Admin/Practice');
});
