Feature: Navegação entre telas do aplicativo

  Scenario: Navegar para todas as telas pela Bottom Bar
    Given estou na tela inicial do aplicativo
    When navego para a tela "Webview"
    Then estou na tela "Webview"
    When navego para a tela "Login"
    Then estou na tela "Login"
    When navego para a tela "Forms"
    Then estou na tela "Forms"
    When navego para a tela "Swipe"
    Then estou na tela "Swipe"
    When navego para a tela "Drag"
    Then estou na tela "Drag"
