class LoginPage {
    
    // Elementos utilizados
    get userEmailInput() { return $('//android.widget.EditText[@content-desc="input-email"]');}
    get passwordInput() { return $('//android.widget.EditText[@content-desc="input-password"]');}
    get loginSubmit() { return $('//android.view.ViewGroup[@content-desc="button-LOGIN"]');}
    get loginButton() { return $('//android.view.View[@content-desc="Login"]');}
    get confirmButton() { return $('//android.widget.Button[@resource-id="android:id/button1"]');}
    get successMessage() { return $('//android.widget.TextView[@text="Success"]');}

    // Mensagem de erro
    get errorMessageEmail() { return $('//android.widget.TextView[contains(@text, "Please enter a valid email address")]');}
    get errorMessagePassword() { return $('//android.widget.TextView[@text, "Please enter at least 8 characters"]');}



    async tapLoginButton() {
        await this.loginButton.waitForDisplayed();
        await this.loginButton.click();
    }
   
    async login(username, password) {
        await this.userEmailInput.waitForDisplayed();
        await this.userEmailInput.setValue(username);
        await this.passwordInput.waitForDisplayed();
        await this.passwordInput.setValue(password);
    }

    async submit() {
        await this.loginSubmit.waitForDisplayed();
        await this.loginSubmit.click();
    }

    async isLoggedIn() {
        await this.successMessage.waitForDisplayed({ timeout: 5000 });
        await this.confirmButton.click();
        return this.loginSubmit.isDisplayed();
    }

    async isLoginErrorEmail() {
        await this.errorMessageEmail.waitForDisplayed({ timeout: 5000 });
        return this.errorMessageEmail.isDisplayed();
    }

    async isLoginErrorPassword() {
        await this.errorMessagePassword.waitForDisplayed({ timeout: 5000 });
        return this.errorMessagePassword.isDisplayed();
    }
}

module.exports = new LoginPage();