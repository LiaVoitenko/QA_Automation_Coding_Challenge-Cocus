const { expect } = require('@playwright/test');
const { signIn, errorMessage, confirmEmail } = require("../selectors/signIn");
const { objectTry_out } = require("../utils/checkSelectors");

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator(signIn.emailOrAccNumberInput);
        this.passwordInput = page.locator(signIn.passwordInput);
        this.loginButton = page.locator(signIn.signInButton);
        this.rememberMeCheckbox = page.locator(signIn.rememberMeCheckbox);
        this.newCustomerButton = page.locator(signIn.newCustomerButton);
        this.errorMessageOnLoginPage = page.locator(errorMessage.errorMessage);
        this.errorEmailMessage = page.locator(errorMessage.errorEmailMessage);
        this.errorPasswordMessage = page.locator(errorMessage.errorPasswordMessage);
    }

    async login(username, password, rememberMe = false) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        if (rememberMe) {
            await this.rememberMeCheckbox.check();
        }
        await this.loginButton.click();
    }

    async verifyMovingToSignUp() {
        await this.newCustomerButton.click();
        await this.page.waitForURL('/auth/realms/user/login-actions/registration**');
    }

    async verifyErrorIncorrectMessage() {
        await this.errorMessageOnLoginPage.waitFor({ state: 'visible' });
        await expect(this.errorMessageOnLoginPage).toContainText('It seems your username or password were incorrect, please try again.');
    }

    async verifyErrorIncorrectEmailMessage() {
        await this.errorMessageOnLoginPage.waitFor({ state: 'visible' });
        await expect(this.errorMessageOnLoginPage).toContainText('Enter a valid email address or account number');
        await this.errorEmailMessage.waitFor({ state: 'visible' });
        await expect(this.errorEmailMessage).toContainText('Enter a valid email address or account number');
    }

    async verifyErrorEmailPassValidMessage() {
        await this.errorMessageOnLoginPage.waitFor({ state: 'visible' });
        await expect(this.errorMessageOnLoginPage).toContainText('Enter a valid email address or account number');
        await expect(this.errorMessageOnLoginPage).toContainText('Enter a valid password');
        await this.errorEmailMessage.waitFor({ state: 'visible' });
        await this.errorPasswordMessage.waitFor({ state: 'visible' });
        await expect(this.errorEmailMessage).toContainText('Enter a valid email address or account number');
        await expect(this.errorPasswordMessage).toContainText('Enter a valid password');
    }

    async moveToConfirmEmailPage() {
        await this.page.waitForURL('/auth/realms/user/login-actions/authenticate?execution**');
        await objectTry_out(this.page, confirmEmail);
    }
}

module.exports = LoginPage;
