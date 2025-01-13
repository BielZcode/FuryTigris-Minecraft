const { ipcMain } = require('electron');
const { fileExists, readJSONFile, writeJSONFile } = require('./utils/fileUtils');
const DebugConfig = require('../modules/config/debugConfig');
const debugConfig = new DebugConfig();

/**
 * Manipulador para alternar o estado do debug.
 */
ipcMain.on('toggle-debug', (event, shouldEnable) => {
  if (shouldEnable) {
    event.sender.send('debug-enabled');
  } else {
    event.sender.send('debug-disabled');
  }
  
  // Salva o estado de debug no arquivo
  debugConfig.saveConfig(shouldEnable);
});

/**
 * Manipulador para verificar o estado do debug.
 */
ipcMain.on('get-debug-state', (event) => {
  const debugState = debugConfig.loadConfig();
  event.reply('debug-state', debugState);
});

/**
 * Manipulador para verificar se um arquivo existe.
 */
ipcMain.handle('check-file-exists', async (event, fileName) => {
  return fileExists(fileName);
});

/**
 * Manipulador para ler um arquivo JSON.
 */
ipcMain.handle('read-json-file', async (event, fileName) => {
  return readJSONFile(fileName);
});

/**
 * Manipulador para escrever em um arquivo JSON.
 */
ipcMain.handle('write-json-file', async (event, fileName, data) => {
  return writeJSONFile(fileName, data);
});

/**
 * Manipulador para criar um arquivo de configuração JSON.
 */
ipcMain.handle('create-config', async (event, config) => {
  const fileName = 'config.json';
  return writeJSONFile(fileName, config);
});
