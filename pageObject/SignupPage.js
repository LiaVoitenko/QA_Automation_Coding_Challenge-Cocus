const {signUp, addressDropdown, errorMessage} = require("../selectors/signUp");
const {expect} = require("@playwright/test");

class SignupPage {
    constructor(page) {
        this.page = page;
        this.titleDropdown = page.locator(signUp.titleDropdown);
        this.firstNameInput = page.locator(signUp.firstNameInput);
        this.lastNameInput = page.locator(signUp.lastNameInput);
        this.dayInput = page.locator(signUp.dayInput);
        this.monthInput = page.locator(signUp.monthInput);
        this.yearInput = page.locator(signUp.yearInput);
        this.phoneNumberInput = page.locator(signUp.phoneNumberInput);
        this.homeAddressInput = page.locator(signUp.addressInput);
        this.emailInput = page.locator(signUp.emailInput);
        this.passwordInput = page.locator(signUp.passwordInput);
        this.emailContactYesButton = page.locator(signUp.emailContactYesButton);
        this.emailContactNoButton = page.locator(signUp.emailContactNoButton);
        this.postContactYesButton = page.locator(signUp.postContactYesButton);
        this.postContactNoButton = page.locator(signUp.postContactNoButton);
        this.phoneContactYesButton = page.locator(signUp.phoneContactYesButton);
        this.phoneContactNoButton = page.locator(signUp.phoneContactNoButton);
        this.continueButton = page.locator(signUp.continueButton);
        this.addressDropdownResult = page.locator(addressDropdown.addressDropdownResult);
        this.registrationErrorSummary = page.locator(errorMessage.registrationErrorSummary);
        this.errorEmailMessage = page.locator(errorMessage.errorEmailMessage);
    }

    async fillPersonalDetails({ title, firstName, lastName, day, month, year, phone, address, email, password }) {
        await this.titleDropdown.selectOption({ label: title });
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.dayInput.fill(day);
        await this.monthInput.fill(month);
        await this.yearInput.fill(year);
        await this.phoneNumberInput.fill(phone);
        // Type the address
        await this.homeAddressInput.fill(address);
        // Wait for the dropdown with address suggestions to appear
        await this.page.waitForSelector(addressDropdown.addressDropdownResult, { state: 'visible' });
        // Click on the first result in the dropdown
        await this.addressDropdownResult.first().click();
        // Fill the remaining fields
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async setContactPreferences({ emailYes, postYes, phoneYes }) {
        if (emailYes) {
            await this.emailContactYesButton.click();
        } else {
            await this.emailContactNoButton.click();
        }

        if (postYes) {
            await this.postContactYesButton.click();
        } else {
            await this.postContactNoButton.click();
        }

        if (phoneYes) {
            await this.phoneContactYesButton.click();
        } else {
            await this.phoneContactNoButton.click();
        }
    }

    async submitSignup() {
        await this.continueButton.click();
    }

    async verifyErrorMessage(expectedMessage) {
        await this.registrationErrorSummary.waitFor({ state: 'visible' });
        await expect(await this.registrationErrorSummary).toContainText(expectedMessage);
        await this.errorEmailMessage.waitFor({ state: 'visible' });
        await expect(await this.errorEmailMessage).toContainText(expectedMessage);
    }

    async isErrorValidMessageVisible() {
        await this.registrationErrorSummary.waitFor({state: 'visible'});
        await expect(await this.registrationErrorSummary).toContainText('Sorry, an account already exists with this email address. Sign in or reset the password.');
        await this.errorEmailMessage.waitFor({state: 'visible'});
        await expect(await this.errorEmailMessage).toContainText('Sorry, an account already exists with this email address. Sign in or reset the password.');
    }
    async isErrorPasswordMessageVisible() {
        await this.registrationErrorSummary.waitFor({state: 'visible'});
        await expect(await this.registrationErrorSummary).toContainText('We have encountered an unexpected problem, please try again later.');
        await this.errorEmailMessage.waitFor({state: 'visible'});
        await expect(await this.errorEmailMessage).toContainText('We have encountered an unexpected problem, please try again later.');
    }

    async isErrorEmailMessageVisible() {
        await this.registrationErrorSummary.waitFor({state: 'visible'});
        await expect(await this.registrationErrorSummary).toContainText('We have encountered an unexpected problem, please try again later.');
        await this.errorEmailMessage.waitFor({state: 'visible'});
        await expect(await this.errorEmailMessage).toContainText('We have encountered an unexpected problem, please try again later.');
    }

    async isErrorNoEmailMessageVisible() {
        await this.registrationErrorSummary.waitFor({state: 'visible'});
        await expect(await this.registrationErrorSummary).toContainText('Enter your email address');
        await this.errorEmailMessage.waitFor({state: 'visible'});
        await expect(await this.errorEmailMessage).toContainText('Enter your email address');
    }

    async isErrorNoPhoneMessageVisible() {
        await this.registrationErrorSummary.waitFor({state: 'visible'});
        await expect(await this.registrationErrorSummary).toContainText('Enter a UK phone number');
        await this.errorEmailMessage.waitFor({state: 'visible'});
        await expect(await this.errorEmailMessage).toContainText('Enter a UK phone number');
    }

    async isErrorNoCorrectPassMessageVisible() {
        await this.registrationErrorSummary.waitFor({state: 'visible'});
        await expect(await this.registrationErrorSummary).toContainText('Your password must be between 8 and 128 characters long')
        await this.errorEmailMessage.waitFor({state: 'visible'});
        await expect(await this.errorEmailMessage).toContainText('Your password must be between 8 and 128 characters long');
    }
}

module.exports = SignupPage;
