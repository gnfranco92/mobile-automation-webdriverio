class WebViewPage {

    get buttonGetStarted() { return $('//android.view.View[@content-desc="Get Started"]');}
    get textGettingStarted() { return $('//android.widget.TextView[@text="Getting Started"]');}


    async tapGetStarted() {
        await this.buttonGetStarted.waitForDisplayed({timeout: 5000});
        await this.buttonGetStarted.click();
    }

    async isGettingStarted() {
        await this.textGettingStarted.waitForDisplayed({timeout: 5000});
        return this.textGettingStarted.isDisplayed();
    }
}

module.exports = new WebViewPage();


