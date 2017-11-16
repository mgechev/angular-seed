const until = protractor.ExpectedConditions;

const toggleSocialWheel = 'div.c-5 span';
const bellIcon = 'div.c-1 span a.link';
const gearIcon = 'div.c-2 span a.link';
const facebookIcon = 'div.c-3 span a.link';
const twitterIcon = 'div.c-4 span a.link';

var findPage = {
    navigateTo: () => {
        browser.get('http://localhost:5555');
    },

    toggleSocialMenu: () => {
        var socialToggle = element(by.css(toggleSocialWheel));
        return browser.wait(until.visibilityOf(socialToggle), 5000, 'Social menu open/close button not visible')
            .then(() => {
                socialToggle.click();
            });
    },

    socialMenuIsOpen: () => {
        var bellP = browser.wait(until.visibilityOf($(bellIcon)), 5000, 'Bell icon link element did not display');
        var gearP = browser.wait(until.visibilityOf($(gearIcon)), 5000, 'Gear icon link element did not display');
        var facebookP = browser.wait(until.visibilityOf($(facebookIcon)), 5000, 'Facebook icon link element did not display');
        var twitterP = browser.wait(until.visibilityOf($(twitterIcon)), 5000, 'Twitter icon link element did not display');

        return Promise.all([bellP, gearP, facebookP, twitterP])
            .then(links => {
                var open = true;
                links.forEach(visible => {
                    if (!visible) {
                        open = false;
                    }
                });
                return open;
            }, rejectReason => {
                console.log(rejectReason);
                return false
            });
    },

    socialMenuIsClosed: () => {
        var bellP = browser.wait(until.invisibilityOf($(bellIcon)), 5000, 'Bell icon link element still displayed');
        var gearP = browser.wait(until.invisibilityOf($(gearIcon)), 5000, 'Gear icon link element still displayed');
        var facebookP = browser.wait(until.invisibilityOf($(facebookIcon)), 5000, 'Facebook icon link element still displayed');
        var twitterP = browser.wait(until.invisibilityOf($(twitterIcon)), 5000, 'Twitter icon link element still displayed');

        return Promise.all([bellP, gearP, facebookP, twitterP])
            .then(links => {
                var closed = true;
                links.forEach(invisible => {
                    if (!invisible) {
                        closed = false;
                    }
                });
                return closed;
            }, rejectReason => {
                console.log(rejectReason);
                return false
            });
    }
}

module.exports = findPage;