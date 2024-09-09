const { test, expect } = require('@playwright/test');
const HeaderComponent = require('../../../pageObject/HeaderComponent');
const { handleCookiesPopup } = require("../../../utils/cookieHandler");
const LoginPage = require("../../../pageObject/LoginPage");
const { jacamoCredentials } = require("../../../data/credentials/jacamoCredentials");
const { objectTry_out } = require("../../../utils/checkSelectors");
const { signIn } = require("../../../selectors/signIn");

test.describe('User Login Positive Cases', () => {
    let header, login;

    test.beforeEach(async ({ page }) => {
        header = new HeaderComponent(page);
        login = new LoginPage(page);

        console.log('Navigating to the homepage...');
        await page.goto('/'); // This will use the baseURL from Playwright config

        console.log('Handling the cookies popup...');
        await handleCookiesPopup(page);

        console.log('Navigating to the sign-in page...');
        await header.clickSignInButton();

        console.log('Verify visibility of sign-in form elements...');
        await objectTry_out(page, signIn);
    });

    // Test case for successful login with email and password
    test('Validate User Login successfully with email', async ({ page }) => {
        console.log('Logging in with email and password...');
        await login.login(jacamoCredentials.user2.email, jacamoCredentials.user2.password);

        console.log('Verify that the user is logged in...');
        await header.checkIsCustomerLoggedIn();
    });

    // Test case for successful login with account number and password
    test('Validate User Login successfully with account number', async ({ page }) => {
        console.log('Logging in with account number and password...');
        await login.login(jacamoCredentials.user2.accountNumber, jacamoCredentials.user2.password);

        console.log('Verify that the user is logged in...');
        await header.checkIsCustomerLoggedIn();
    });

    // Test case for login with a request to confirm email
    test('Validate User Login successfully with request for Confirm Email', async ({ page }) => {
        console.log('Logging in with account number and password...');
        await login.login(jacamoCredentials.user1.accountNumber, jacamoCredentials.user1.password);

        console.log('Verify visibility of confirm email page...');
        await login.moveToConfirmEmailPage();
    });
});
