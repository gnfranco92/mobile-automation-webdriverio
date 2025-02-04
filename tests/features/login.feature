Feature: Login no aplicativo

  Scenario: Login bem-sucedido
    Given que o usuário está na tela de login
    When ele insere o usuário "testuser@test.com.br" e a senha "password123"
    And clica no botão de login
    Then o login deve ser feito com sucesso

  Scenario: Login invalido
    Given que o usuário está na tela de login
    When ele insere o usuário "invalido" e a senha "password123"
    And clica no botão de login
    Then o login deve falhar devido ao e-mail invalido
    