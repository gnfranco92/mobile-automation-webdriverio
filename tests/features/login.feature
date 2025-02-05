Feature: Login no aplicativo

  Scenario: Login bem-sucedido
    Given que o usuário está na tela de login
    When ele insere o usuário "testuser@test.com.br" e a senha "password123"
    And clica no botão de login
    Then o login deve ser feito com sucesso

  Scenario: Login invalido e-mail
    Given que o usuário está na tela de login
    When ele insere o usuário "invalido" e a senha "password123"
    And clica no botão de login
    Then o login deve falhar devido ao e-mail invalido

  Scenario: Login invalido password
    Given que o usuário está na tela de login
    When ele insere o usuário "testuser@test.com.br" e a senha ""
    And clica no botão de login
    Then o login deve falhar devido não ter inserido a senha

    Scenario: Sign up Form 
    Given que o usuário está na tela de login
    When clico em Sign up
    And ele insere o usuário "testuser@test.com.br" e a senha "password123"
    And insere a a senha "password123" novamente 
    Then e clico no botão Sign UP e valido o sucesso
    