const { test, expect } = require('@playwright/test');
const HeaderComponent = require('../../../pageObject/HeaderComponent');
const { handleCookiesPopup } = require("../../../utils/cookieHandler");
const LoginPage = require("../../../pageObject/LoginPage");
const { jacamoCredentials } = require("../../../data/credentials/jacamoCredentials");
const { objectTry_out } = require("../../../utils/checkSelectors");
const { signIn } = require("../../../selectors/signIn");

test.describe('User Login Negative Cases', () => {
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

    // Test case for login with incorrect email
    test('Validate User Login with incorrect email', async ({ page }) => {
        console.log('Attempting to log in with an incorrect email...');
        await login.login('sefsfsefd@fd.dvffd', jacamoCredentials.user2.password);

        console.log('Verify that the appropriate error message is displayed...');
        await login.verifyErrorIncorrectMessage();
    });

    // Test case for login with incorrect password
    test('Validate User Login with incorrect password', async ({ page }) => {
        console.log('Attempting to log in with an incorrect password...');
        await login.login(jacamoCredentials.user2.email, 'sdaedw');

        console.log('Verify that the appropriate error message is displayed...');
        await login.verifyErrorIncorrectMessage();
    });

    // Test case for login with no data (empty fields)
    test('Validate User Login with empty credentials', async ({ page }) => {
        // Attempt to log in with empty fields
        console.log('Attempting to log in with empty credentials...');
        await login.login('', '');

        console.log('Verify that the appropriate error messages for empty fields are displayed...');
        await login.verifyErrorEmailPassValidMessage();
    });

    // Test case for login with an invalid email format
    test('Validate User Login with invalid email format', async ({ page }) => {
        console.log('Attempting to log in with an invalid email format...');
        await login.login('sefsfsefd@fd', jacamoCredentials.user2.password);

        console.log('Verify that the appropriate error message for invalid email format is displayed...');
        await login.verifyErrorIncorrectEmailMessage();
    });
});
