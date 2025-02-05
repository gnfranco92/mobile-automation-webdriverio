const {Given, When, Then} = require('@wdio/cucumber-framework');
const LoginPage = require('../pageObjects/LoginPage');
const chai = require('chai'); 
const assert = chai.assert;    
const expect = chai.expect;    

Given('que o usuário está na tela de login', async () => {
    await LoginPage.tapLoginButton();
});

When('ele insere o usuário {string} e a senha {string}', async (username, password) => {
    await LoginPage.login(username, password);
});

When('clica no botão de login', async () => {
    await LoginPage.submit();
});

When('clico em Sign up', async () => {
    await LoginPage.tapSignUp();
});

Then('o login deve ser feito com sucesso', async () => {
    const loginSuccessful = await LoginPage.isLoggedIn();
    expect(loginSuccessful).to.equal(true, 'O login não foi concluído com sucesso.');
});

Then('o login deve falhar devido ao e-mail invalido', async () => {
    const isErrorDisplayed = await LoginPage.isLoginErrorEmail();
    expect(isErrorDisplayed).to.equal(true,' A mensagem de erro de e-mail inválido não foi exibida.');
});

Then('o login deve falhar devido não ter inserido a senha', async () => {
    const isErrorDisplayed = await LoginPage.isLoginErrorPassword();
    expect(isErrorDisplayed).to.equal(true,'A mensagem de erro de senha ausente não foi exibida.');
});

Then('insere a a senha {string} novamente', async (password) => {
    await LoginPage.confirmpassword(password);
});

When('e clico no botão Sign UP e valido o sucesso', async () => {
    await LoginPage.tapSignUpSubmit();
    const isDisplayed = await LoginPage.isSignedUp();
    assert.isTrue(isDisplayed, 'Signed sucess');
});