class FormsPage {
    
    get formsButton() { return $('//android.view.View[@content-desc="Forms"]');}       
    get nameInput() { return $('android=new UiSelector().resourceId("RNE__Input__text-input")');}
    get activeButton() { return $('//android.view.ViewGroup[@content-desc="button-Active"]');}
    get thisActiveButton() { return $('//android.widget.TextView[@text="This button is active"]');}
    get buttonOK() { return $('//android.widget.Button[@resource-id="android:id/button1"]');}
    
    async navigateToForms() {
        await this.formsButton.waitForDisplayed();
        await this.formsButton.click();
    }

    async enterName(name) {
        await this.nameInput.waitForDisplayed();
        await this.nameInput.setValue(name);
    }

    async submitForm() {
        await this.activeButton.waitForDisplayed();
        await this.activeButton.click();
    }

    async isFormOK() {
        await this.thisActiveButton.waitForDisplayed({ timeout: 5000 });
        await this.buttonOK.waitForDisplayed({ timeout: 5000 }); 
        await this.buttonOK.click();
        return this.activeButton.isDisplayed();
    }
}

module.exports = new FormsPage();
