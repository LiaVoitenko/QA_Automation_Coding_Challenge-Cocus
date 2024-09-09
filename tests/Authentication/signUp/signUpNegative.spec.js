const { test, expect } = require('@playwright/test');
const HeaderComponent = require('../../../pageObject/HeaderComponent');
const { handleCookiesPopup } = require("../../../utils/cookieHandler");
const LoginPage = require("../../../pageObject/LoginPage");
const SignupPage = require("../../../pageObject/SignupPage");
const { faker } = require('@faker-js/faker');
const { objectTry_out } = require("../../../utils/checkSelectors");
const { signUp } = require("../../../selectors/signUp");
const { jacamoCredentials } = require("../../../data/credentials/jacamoCredentials");

// Generate random user data
const generateUserData = (overrides = {}) => ({
    title: 'Mr',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    day: '01',
    month: '01',
    year: '1990',
    phone: '016'.concat(faker.string.numeric(8)),
    address: '4, Briar Court, 7 Morville Street, London, E3 2GF',
    email: faker.internet.email(),
    password: 'SuperSecretPassword123',
    ...overrides,
});

test.describe('User Signup Negative cases', () => {
    let page, header, login, signupPage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        header = new HeaderComponent(page);
        login = new LoginPage(page);
        signupPage = new SignupPage(page);

        console.log('Navigating to the homepage...');
        await page.goto('/'); // This will use the baseURL from Playwright config

        console.log('Handling the cookies popup...');
        await handleCookiesPopup(page);

        console.log('Navigate to Signup Page...');
        await header.clickSignInButton();
        await login.verifyMovingToSignUp();

        console.log('Verify visibility of signup form elements...');
        await objectTry_out(page, signUp);
    });

    test('Validate User Signup with used email', async () => {
        console.log('Generating user data with used email...');
        const userData = generateUserData({
            email: jacamoCredentials.user2.email,
        });

        console.log('Filling out the Signup form with user data...');
        await signupPage.fillPersonalDetails(userData);
        await signupPage.setContactPreferences({
            emailYes: true,
            postYes: false,
            phoneYes: true,
        });

        console.log('Submitting the Signup form...');
        await signupPage.submit();

        console.log('Validating error message for used email...');
        await signupPage.verifyErrorMessage('Sorry, an account already exists with this email address. Sign in or reset the password.');
    });

    test('Validate User Signup with invalid password', async () => {
        console.log('Generating user data with an invalid password...');
        const userData = generateUserData({
            password: '',
        });

        console.log('Filling out the Signup form with user data...');
        await signupPage.fillPersonalDetails(userData);
        await signupPage.setContactPreferences({
            emailYes: false,
            postYes: false,
            phoneYes: false,
        });

        console.log('Submitting the Signup form...');
        await signupPage.submit();

        console.log('Validating error message for invalid password...');
        await signupPage.verifyErrorMessage('Your password must be between 8 and 128 characters long');
    });

    test('Validate User Signup with invalid email', async () => {
        console.log('Generating user data with an invalid email...');
        const userData = generateUserData({
            email: 'invalid_email_format',
        });

        console.log('Filling out the Signup form with user data...');
        await signupPage.fillPersonalDetails(userData);
        await signupPage.setContactPreferences({
            emailYes: false,
            postYes: false,
            phoneYes: false,
        });

        console.log('Submitting the Signup form...');
        await signupPage.submit();

        console.log('Validating error message for invalid email...');
        await signupPage.verifyErrorMessage('That doesn’t look like a valid email address – try again?');
    });

    test('Validate User Signup without email', async () => {
        console.log('Generating user data without email...');
        const userData = generateUserData({
            email: '',
        });

        console.log('Filling out the Signup form with user data...');
        await signupPage.fillPersonalDetails(userData);
        await signupPage.setContactPreferences({
            emailYes: false,
            postYes: false,
            phoneYes: false,
        });

        console.log('Submitting the Signup form...');
        await signupPage.submit();

        console.log('Validating error message for missing email...');
        await signupPage.verifyErrorMessage('Enter your email address');
    });

    test('Validate User Signup without phone', async () => {
        console.log('Generating user data without phone...');
        const userData = generateUserData({
            phone: '',
        });

        console.log('Filling out the Signup form with user data...');
        await signupPage.fillPersonalDetails(userData);
        await signupPage.setContactPreferences({
            emailYes: false,
            postYes: false,
            phoneYes: false,
        });

        console.log('Submitting the Signup form...');
        await signupPage.submit();

        console.log('Validating error message for missing phone number...');
        await signupPage.verifyErrorMessage('Enter a UK phone number');
    });
});
