const { Given, When, Then } = require('@wdio/cucumber-framework');
const NavigationPage = require('../pageObjects/NavigationPage');
const assert = require('chai').assert;

Given('estou na tela inicial do aplicativo', async () => {
    await NavigationPage.homeScreen.waitForDisplayed();
});

When('navego para a tela {string}', async (screenName) => {
    const isNavigated = await NavigationPage.navigateTo(screenName);
    assert.isTrue(isNavigated, `Falha ao navegar para a tela ${screenName}.`);
});

Then('estou na tela {string}', async (screenName) => {
    const isDisplayed = await NavigationPage.isOnScreen(screenName);
    assert.isTrue(isDisplayed, `A tela ${screenName} não foi exibida corretamente.`);
});
