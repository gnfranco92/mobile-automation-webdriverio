
const { Given, When, Then } = require('@wdio/cucumber-framework');
const WebViewPage = require('../pageObjects/WebViewPage');
const assert = require('chai').assert;

When('clico em Get Started', async () => {
    await WebViewPage.tapGetStarted();
});

Then('então valido a tela Get Started', async () => {
    const isDisplayed = await WebViewPage.isGettingStarted();
    assert.isTrue(isDisplayed, 'A tela Get Started não foi exibida corretamente.');
    console.log('✅ Página exibida com sucesso!');
});
