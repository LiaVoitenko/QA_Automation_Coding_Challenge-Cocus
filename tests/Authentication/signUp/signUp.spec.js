const { test, expect } = require('@playwright/test');
const HeaderComponent = require('../../../pageObject/HeaderComponent');
const { handleCookiesPopup } = require("../../../utils/cookieHandler");
const LoginPage = require("../../../pageObject/LoginPage");
const SignupPage = require("../../../pageObject/SignupPage");
const { faker } = require('@faker-js/faker');
const { objectTry_out } = require("../../../utils/checkSelectors");
const { signUp, signUpSuccessful } = require("../../../selectors/signUp");

// Generate random user data
const generateUserData = () => ({
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
});

test.describe('User Signup', () => {
    let header, login, signupPage, userData;

    test.beforeEach(async ({ page }) => {
        header = new HeaderComponent(page);
        login = new LoginPage(page);
        signupPage = new SignupPage(page);
        userData = generateUserData();

        console.log('Navigating to the main page and handling cookies...');
        await page.goto('/');
        await handleCookiesPopup(page);

        console.log('Navigating to the Signup page...');
        await header.clickSignInButton();
        await login.verifyMovingToSignUp();
        console.log('Verifying visibility of signup form elements...');
        await objectTry_out(page, signUp);
    });

    test('Validate User Signup successfully', async ({ page }) => {
        console.log('Filling out the Signup form with user data...');
        await signupPage.fillPersonalDetails(userData);
        await signupPage.setContactPreferences({
            emailYes: true,
            postYes: false,
            phoneYes: true,
        });

        console.log('Submitting the Signup form...');
        await signupPage.submitSignup();

        console.log('Validating signup success by checking the URL...');
        await expect(page).toHaveURL('/successful-account-registration');

        console.log('Verifying visibility of success page elements...');
        await objectTry_out(page, signUpSuccessful);
    });
});
