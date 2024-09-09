const {headerMain, headerLoggedIn} = require("../selectors/header");
const {expect} = require("@playwright/test");
const {addressDropdown} = require("../selectors/signUp");

class HeaderComponent {
    constructor(page) {
        this.page = page;
        this.menuButton = page.locator(headerMain.menuButton);
        this.signInButton = page.locator(headerMain.signInButton);
        this.searchButton = page.locator(headerMain.searchButton);
        this.bagButton = page.locator(headerMain.bagButton);
        this.profileButton = page.locator(headerLoggedIn.profileButton);
    }

    // Method to click on the Menu button
    async clickMenuButton() {
        console.log('Clicking on the Menu button...');
        await this.menuButton.click();
    }

    // Method to click on the Sign In button
    async clickSignInButton() {
        console.log('Clicking on the Sign In button...');
        await this.signInButton.click();
        console.log('Navigating to the Sign In page...');
        await this.page.waitForURL('https://www.jacamo.co.uk/auth/**')
    }

    // Method to click on the Bag button
    async clickBagButton() {
        console.log('Clicking on the Bag button...');
        await this.bagButton.click();
        await this.page.waitForURL('/shop/bag**');
    }

    // Method to check if the customer is logged in
    async checkIsCustomerLoggedIn() {
        console.log('Checking if the customer is logged in...');
        await expect(this.page).toHaveURL('/');
        await this.page.waitForSelector(headerLoggedIn.profileButton, { state: 'visible' });
        await expect(this.profileButton).toBeVisible();
    }

}

module.exports = HeaderComponent;
