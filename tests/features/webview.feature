Feature: Validar funções da tela Webview

  Scenario: Acesso ao Get Started
    Given estou na tela inicial do aplicativo
    When navego para a tela "Webview"
    And estou na tela "Webview"
    And clico em Get Started
    Then então valido a tela Get Started
