Feature: Preencher o formulário

  Scenario: Preenchendo e enviando o formulário com sucesso
    Given que o usuário está na tela Forms
    When ele preenche o campo de nome com "Guilherme"
    And clica no botão Active
    Then o formulário deve ser enviado com sucesso
