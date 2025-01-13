/**
* By: GameStatic: BielZcode
* Data 11.1.2025 
**/
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  checkAccount: (username) => ipcRenderer.invoke('check-account', username),
  createAccount: (username) => ipcRenderer.invoke('create-account', username)
});

const { contextBridge, ipcRenderer } = require('electron');

/** 
* @runlauncher () => ipcRenderer.invoke('run-launcher') Usado para Inicializar o minecraft
**/
contextBridge.exposeInMainWorld('electron', {
    runLauncher: () => ipcRenderer.invoke('run-launcher')
});

/** 
* @toggle-debug usado via post do main/renderer/views/config/debug.html
**/
contextBridge.exposeInMainWorld('electronAPI', {
  toggleDebug: (state) => ipcRenderer.send('toggle-debug', state),
  getDebugState: () =>
    new Promise((resolve) => {
      ipcRenderer.once('debug-state', (_, state) => resolve(state));
      ipcRenderer.send('get-debug-state');
    }),
});

contextBridge.exposeInMainWorld('electron', {
  toggleDebug: (shouldEnable) => ipcRenderer.send('toggle-debug', shouldEnable),
  getDebugState: () => ipcRenderer.invoke('get-debug-state'),
  checkFileExists: (fileName) => ipcRenderer.invoke('check-file-exists', fileName),
  readJsonFile: (fileName) => ipcRenderer.invoke('read-json-file', fileName),
  writeJsonFile: (fileName, data) => ipcRenderer.invoke('write-json-file', fileName, data),
  createConfig: (config) => ipcRenderer.invoke('create-config', config)
});