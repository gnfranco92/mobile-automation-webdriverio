Feature: Login no aplicativo

  Scenario: Login bem-sucedido com credenciais válidas
    Given que o usuário está na tela de login
    When ele insere o usuário "testuser@test.com.br" e a senha "password123"
    And clica no botão de login
    Then ele deve ser redirecionado para o dashboard
    