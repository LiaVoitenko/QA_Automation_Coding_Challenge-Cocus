export const signIn = {
    newCustomerText: '.createAccountLabel',
    newCustomerButton: '[data-ga-tracking-id="login_newCustomerButton"]',
    emailOrAccNumberInput: '#username',
    passwordInput: '#password',
    passwordShowHideButton: '.inputOption.passwordOption',
    rememberMeCheckbox: '#rememberMe',
    signInButton: '[data-ga-tracking-id="login_signInButton"]',
    forgotDetailsButton: '[data-ga-tracking-id="login_forgottenDetailsLink"]',
}

export const forgotDetails = {
    continueButton: '[data-ga-tracking-id="forgottenDetails_continueButton"]',
}

export const errorMessage = {
    errorEmailMessage: '.js-validation-error__username .js-input__errorMessage',
    errorPasswordMessage: '.js-validation-error__password .js-input__errorMessage',
    errorMessage: '#loginErrorSummary'
}

export const confirmEmail = {
    pageTitle: '#mfa-selection .pageTitle',
    sendCode: '#send-code-button',
    radioButtonText: '.mfa-form__selector label',
    radioButton: '#mfaEmail'
}
