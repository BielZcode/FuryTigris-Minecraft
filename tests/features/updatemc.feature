Feature: Automatic Application Update

    Background: Common preconditions
        Given que o endpoint da última versão está acessível
        When o aplicativo verifica por atualizações

    Scenario: Update available (application running or not)
        Then ele deve detectar uma nova versão disponível
        Then deve executar o processo de atualização (incluindo matar o processo atual, se necessário)

    Scenario: No update available (application running or not)
        Then ele não deve detectar nenhuma nova versão disponível
        Then não deve executar nenhuma ação adicional

    Scenario: Endpoint inaccessible
        Then ele deve exibir uma mensagem de erro informando a falha na verificação
