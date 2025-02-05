class LoginPage {
    
    // Elementos utilizados
    get userEmailInput() { return $('//android.widget.EditText[@content-desc="input-email"]');}
    get passwordInput() { return $('//android.widget.EditText[@content-desc="input-password"]');}
    get confirmPasswordInput() { return $('//android.widget.EditText[@content-desc="input-repeat-password"]');}
    get loginSubmit() { return $('//android.view.ViewGroup[@content-desc="button-LOGIN"]');}
    get loginButton() { return $('//android.view.View[@content-desc="Login"]');}
    get confirmButton() { return $('//android.widget.Button[@resource-id="android:id/button1"]');}
    get signUp() { return $('//android.view.ViewGroup[@content-desc="button-sign-up-container"]');}
    get signUpSubmit() { return $('//android.view.ViewGroup[@content-desc="button-SIGN UP"]');}

    // Text
    get successMessage() { return $('//android.widget.TextView[@text="Success"]');}
    get successSingnedMessage() { return $('//android.widget.TextView[@text="You successfully signed up!"]');}

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

    async password(password) {
        await this.passwordInput.waitForDisplayed();
        await this.passwordInput.setValue(password);
    }

    async confirmpassword(password) {
        await this.confirmPasswordInput.waitForDisplayed();
        await this.confirmPasswordInput.setValue(password);
    }

    async submit() {
        await this.loginSubmit.waitForDisplayed();
        await this.loginSubmit.click();
    }

    async isLoggedIn() {
        try {
            await this.successMessage.waitForDisplayed({timeout: 5000});    
            if (await this.successMessage.isDisplayed()) {
                console.log('Mensagem de sucesso visível.');
                await this.confirmButton.waitForDisplayed({timeout: 3000});
                await this.confirmButton.click();
            }    
            return await this.loginSubmit.waitForDisplayed({timeout: 5000});
        } catch (error) {
            console.error('Erro ao verificar se o usuário está logado:', error);
            return false;
        }
    }

    async isLoginErrorEmail() {
        try {
            await this.errorMessageEmail.waitForDisplayed({timeout: 5000});    
            if (await this.errorMessageEmail.isDisplayed()) {
                console.log('Mensagem de erro de e-mail inválido visível.');
                return true;
            }    
            return false;
        } catch (error) {
            console.error('Erro ao verificar a mensagem de erro do e-mail inválido:', error);
            return false;
        }
    }

    async isLoginErrorPassword() {
        try {
            await this.errorMessagePassword.waitForDisplayed({timeout: 5000});
            if (await this.errorMessagePassword.isDisplayed()) {
                console.log('Mensagem de erro de senha ausente visível.');
                return true;
            }    
            return false;
        } catch (error) {
            console.error('Erro ao verificar a mensagem de erro da senha ausente:', error);
            return false;
        }
    }

    async tapSignUp() {
        await this.signUp.waitForDisplayed();
        await this.signUp.click();
    }

    async tapSignUpSubmit() {
        await this.signUpSubmit.waitForDisplayed();
        await this.signUpSubmit.click();
    }

    async isSignedUp() {
        await this.successSingnedMessage.waitForDisplayed({timeout: 8000});
        const isVisible = await this.successSingnedMessage.isDisplayed();
        if (!isVisible) {
            await driver.pause(2000);
        }
        return isVisible;
    } 
}

module.exports = new LoginPage();