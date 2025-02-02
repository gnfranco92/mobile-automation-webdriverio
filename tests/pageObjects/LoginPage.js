class LoginPage {
    
    get userEmailInput() { return $('//android.widget.EditText[@content-desc="input-email"]'); }
    get passwordInput() { return $('//android.widget.EditText[@content-desc="input-password"]'); }
    get loginSubmit() { return $('//android.view.ViewGroup[@content-desc="button-LOGIN"]/android.view.ViewGroup'); }
    get loginButton() { return $('//android.view.View[@content-desc="Login"]'); }
    get successMessage() { return $('//android.widget.TextView[@text="Success"]'); }

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
        return this.successMessage.isDisplayed();
    }
}

module.exports = new LoginPage();