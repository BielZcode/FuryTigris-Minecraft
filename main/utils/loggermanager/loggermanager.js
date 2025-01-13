const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const dataHoraAtual = new Date();
const horas = dataHoraAtual.getHours(); 
const minutos = dataHoraAtual.getMinutes(); 
const segundos = dataHoraAtual.getSeconds(); 

/**
 * Loggermanager usado para exibir todas as logs e salvar em json/txt
 * 
 * By BielZcode
 * 
 * Data: 11.1.2025
 */
function loggermanager() {
    if(fs.existsSync()) {
        console.log('+---------------------------------------------------+');
        console.log('|      Inicializando FuryTigris Launcher 1.0.0      |');
        console.log('|      F')
        console.log('+---------------------------------------------------+');;
    }

    const htmlPath = './main/renderer/views/index.html';
    const runFile = './main/run.js';
    const preloadFile = './main/preload.js';
    const fileutilsFile = './main/utils/fileUtils.js';
    const pathUtilsFile = './main/utils/pathUtils.js';

    /**
     * Salva a data e hora para exibir no console
     * @param {*} dataHoraAtual 
     * @param {*} horas 
     * @param {*} minutos 
     * @param {*} segundos 
     * Usado em --> "loggermanager"
     */
    function dateHours(dataHoraAtual, horas, minutos, segundos) {
        console.log((dataHoraAtual),(horas),(minutos),(segundos));
    }

    const roamingPath = path.join(os.homedir(), 'AppData', 'Roaming', '.minecraft', 'versions', 'furytigris_1.8.8', 'furytigris_1.8.8.jar');

    console.log((dateHours), '[FuryTigris Launcher log] INFO: Localizando arquivo de exibição HTML');

    if(fs.existsSync(htmlPath)) {     
        console.log('[FuryTigris Launcher log] INFO: Arquivo ./main/renderer/views/index.html localizado iniciando Carregamento de sisema do launcher')
    } else{
        console.log('[FuryTigris Launcher log] ERRO: HTML não localizado reinstale o launcher novamente ou contate um administrador! ou reinicie novamente');
    }

    console.log('[FuryTigris Launcher log] INFO: Carregando sistema do launcher');

    /**
     * Arquivos necessarios para o sistema do Launcher
     * @fs.existSync
     */
    if(fs.existsSync(runFile)) {
        console.log('[FuryTigris Launcher log] INFO: Arquivo [run.js] Encontrado e Carregado com sucesso!');
    } else{
        console.log('[FuryTigris Launcher log] ERRO: não foi possível localizar ou carregar o [run.js] do Sistema! reinicie novamente');
        process.exit();
    }
    if(fs.existsSync(preloadFile)) {
        console.log('[FuryTigris Launcher log] INFO: Arquivo [preload.js] Encontrado e Carregado com sucesso!');
    } else{
        console.log('[FuryTigris Launcher log] ERRO: não foi possível localizar ou carregar o [preload.js] do Sistema! reinicie novamente');
        process.exit();
    }
    if(fs.existsSync(fileutilsFile)) {
        console.log('[FuryTigris Launcher log] INFO: Arquivo [fileUtils.js] Encontrado e Carregado com sucesso!');
    } else{
        console.log('[FuryTigris Launcher log] ERRO: não foi possível localizar ou carregar o [fileUtils.js] do Sistema! reinicie novamente');
        process.exit();
    }
    if(fs.existsSync(pathUtilsFile)) {
        console.log('[FuryTigris Launcher log] INFO: Arquivo [pathUtils.js] Encontrado e Carregado com sucesso!');
    } else{
        console.log('[FuryTigris Launcher log] ERRO: não foi possível localizar ou carregar o [pathUtils.js] do Sistema! reinicie novamente');
        process.exit();
    }

    console.log('[FuryTigris Launcher log] INFO: Arquivos de sistema carregados com sucesso!');

    if(fs.existsSync(roamingPath)) {
        console.log(
            '[FuryTigris Launcher log] INFO: Client ja esta instalado no sistema',
            '.main/utils/loggermanager/loggermanager.js => VersionLocation: ', roamingPath, 
        );
    } else {
        console.log(
            '[FuryTigris Launcher log] ERRO: Client não esta instalado no Sistema operacional!',
            '.main/utils/loggermanager/loggermanager.js => : ', 'furytigris_1.8.8 not exists from pc contact for adm or gerent'
        );
    }
}


/**
 * @Exporta o arquivo js loggermanager para usar publicamente
 * 
 * @By BielZcode
 * 
 * @Data: 11.1.2025
 */
module.exports = { loggermanager };