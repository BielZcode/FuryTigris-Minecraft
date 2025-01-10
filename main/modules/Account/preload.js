const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  checkAccount: (username) => ipcRenderer.invoke('check-account', username),
  createAccount: (username) => ipcRenderer.invoke('create-account', username)
});
