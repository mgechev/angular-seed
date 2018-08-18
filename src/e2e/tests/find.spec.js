const findPage = require('../pageObjects/find.page.js');

describe('Find Page Tests - ', function() {
	it('should open and close social menu', function() {
		findPage.navigateTo();

		findPage.toggleSocialMenu()
			.then(() => {
				findPage.socialMenuIsOpen()
					.then(open => {
						expect(open).toEqual(true);
					});
			});
		
		browser.sleep(500);

		findPage.toggleSocialMenu()
			.then(() => {
				findPage.socialMenuIsClosed()
					.then(closed => {
						expect(closed).toEqual(true);
					});
			});
	});
});