const { Given, When, Then } = require('@wdio/cucumber-framework');
const FormsPage = require('../pageObjects/FormsPage');
const assert = require('chai').assert;

Given('que o usuário está na tela Forms', async () => {
    await FormsPage.navigateToForms();
});

When('ele preenche o campo de nome com {string}', async (name) => {
    await FormsPage.enterName(name);
});

When('clica no botão Active', async () => {
    await FormsPage.submitForm();
});

Then('o formulário deve ser enviado com sucesso', async () => {
    const isDisplayed = await FormsPage.isFormOK();
    assert.isTrue(isDisplayed, 'O botão Active não foi exibido corretamente após o envio do formulário.');
    console.log('✅ Formulário enviado com sucesso!');
});
