const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../pageObjects/LoginPage');
const { expect } = require('chai');

Given('que o usuário está na tela de login', async () => {
    await LoginPage.tapLoginButton();
});

When('ele insere o usuário {string} e a senha {string}', async (username, password) => {
    await LoginPage.login(username, password);
});

When('clica no botão de login', async () => {
    await LoginPage.submit();
});

Then('o login deve ser feito com sucesso', async () => {
    expect(await LoginPage.isLoggedIn()).to.be.true;
});

Then('o login deve falhar devido ao e-mail invalido', async () => {
    expect(await LoginPage.isLoginErrorEmail()).to.be.true;
});

Then('o login deve falhar devido não ter inserido a senha', async () => {
    expect(await LoginPage.isLoginErrorPassword()).to.be.true;
});