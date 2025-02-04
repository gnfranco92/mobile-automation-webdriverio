class NavigationPage {
    
    // Bottom bar
    get webviewButton() { return $('//android.view.View[@content-desc="Webview"]');}
    get loginButton() { return $('//android.view.View[@content-desc="Login"]');}
    get formsButton() { return $('//android.view.View[@content-desc="Forms"]');}
    get swipeButton() { return $('//android.view.View[@content-desc="Swipe"]');}
    get dragButton() { return $('//android.view.View[@content-desc="Drag"]');}

    // Elementos de cada tela
    get homeScreen() { return $('//android.widget.ScrollView[@content-desc="Home-screen"]');}
    get webviewScreen() { return $('//android.view.View[@content-desc="WebdriverIO"]');}
    get loginScreen() { return $('//android.widget.ScrollView[@content-desc="Login-screen"]');}
    get formsScreen() { return $('//android.widget.ScrollView[@content-desc="Forms-screen"]');}
    get swipeScreen() { return $('//android.widget.ScrollView[@content-desc="Swipe-screen"]');}
    get dragScreen() { return $('//android.view.ViewGroup[@content-desc="Drag-drop-screen"]');}

    async navigateTo(screenName) {
        if (screenName.toLowerCase() === 'home') {
            return this.isOnScreen('home');
        }

        let button;
        switch (screenName.toLowerCase()) {
            case 'webview':
                button = this.webviewButton;
                break;
            case 'login':
                button = this.loginButton;
                break;
            case 'forms':
                button = this.formsButton;
                break;
            case 'swipe':
                button = this.swipeButton;
                break;
            case 'drag':
                button = this.dragButton;
                break;
            default:
                throw new Error(`Tela "${screenName}" não foi mapeada na Bottom Bar`);
        }

        await button.waitForDisplayed();
        await button.click();

        // Valida se a tela correta carregou
        return this.isOnScreen(screenName);
    }

    // Método para verificar se está na tela correta
    async isOnScreen(screenName) {
        let screenElement;
        
        switch (screenName.toLowerCase()) {
            case 'home':
                screenElement = this.homeScreen;
                break;
            case 'webview':
                screenElement = this.webviewScreen;
                break;
            case 'login':
                screenElement = this.loginScreen;
                break;
            case 'forms':
                screenElement = this.formsScreen;
                break;
            case 'swipe':
                screenElement = this.swipeScreen;
                break;
            case 'drag':
                screenElement = this.dragScreen;
                break;
            default:
                throw new Error(`Validação da tela "${screenName}" não foi mapeada.`);
        }

        await screenElement.waitForDisplayed();
        return screenElement.isDisplayed();
    }
}

module.exports = new NavigationPage();
