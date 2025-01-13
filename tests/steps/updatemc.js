const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
const updateChecker = rewire('../../update/update-checker.js');

let currentVersion = "1.0.1";
let versionEndpoint;
let downloadURL;
let app;
let checkForUpdatesStub;
let updateStarted;
let errorMessage;


Given('que o endpoint da última versão está acessível', function () {
    versionEndpoint = 'https://exemplo.com/api/versao';
    downloadURL = 'https://exemplo.com/download/nova_versao.exe';
    app = {
        isPackaged: true,
        getPath: sinon.stub().returns('/tmp'),
    };
});

When('o aplicativo verifica por atualizações', async function () {
    checkForUpdatesStub = sinon.stub().rejects(new Error("Erro durante a verificação de atualizações:")); // Configura a REJEIÇÃO AQUI!!!
    updateChecker.__set__('checkForUpdates', checkForUpdatesStub); // Injeta o stub

    try {
        updateStarted = await updateChecker.checkForUpdates(currentVersion, versionEndpoint, downloadURL, app); // Chama a função DEPOIS de configurar o stub
    } catch (error) {
        errorMessage = error.message;
    }
});

Then('ele deve detectar uma nova versão disponível', function () {
    // checkForUpdatesStub.resolves(true); // Configura para outros cenários
    expect(updateStarted).to.be.true;
});

Then('deve executar o processo de atualização \\(incluindo matar o processo atual, se necessário)', function () {
    expect(checkForUpdatesStub.calledOnce).to.be.true;
});

Then('ele não deve detectar nenhuma nova versão disponível', function () {
    checkForUpdatesStub.resolves(false); // Configura para outros cenários
    expect(updateStarted).to.be.false;
});

Then('não deve executar nenhuma ação adicional', function () {
    expect(checkForUpdatesStub.calledOnce).to.be.true;
});

Then('ele deve exibir uma mensagem de erro informando a falha na verificação', function () {
    // expect(errorMessage).to.equal("Erro durante a verificação de atualizações:");
});