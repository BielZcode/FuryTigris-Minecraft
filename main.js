const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const os = require('os');
const generateBat = require('./main/modules/game/generateMinecraftBat');
const server = require('./server');
const { loggermanager } = require('./main/utils/loggermanager/loggermanager');

const createWindow = () => {
  const win = new BrowserWindow({
    
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'main/modules/preload.js'),
    },
    menu: null,
    resizable: false,
    maximizable: false,
  });

  /** 
   * @loggersystem usado para carregar logs criado por BielZcode
  */

  loggermanager();


  win.loadFile('./main/renderer/views/index.html');
};

ipcMain.handle('load-account', (event) => {
  const accountData = loadAccount();

  if (accountData.success) {
    startMinecraft(accountData.username);
  }

  return accountData;
});

function loadAccount() {
  const filePath = path.join(os.homedir(), 'AppData', 'Roaming', 'FuryTigris Client', 'accounts.json');

  if (!fs.existsSync(filePath)) {
    return { success: false, message: 'Arquivo de contas não encontrado!' };
  }

  const accounts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (accounts.length > 0) {
    const username = accounts[0].username;
    return { success: true, username };
  }

  return { success: false, message: 'Nenhuma conta encontrada!' };
}

ipcMain.handle('does-account-exist', (event, username) => {
  const filePath = path.join(os.homedir(), 'AppData', 'Roaming', 'FuryTigris Client', 'accounts.json');

  if (fs.existsSync(filePath)) {
    const accounts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return accounts.some(account => account.username === username);
  }

  return false;
});

ipcMain.handle('create-account', (event, username) => {
  const filePath = path.join(os.homedir(), 'AppData', 'Roaming', 'FuryTigris Client', 'accounts.json');

  let accounts = [];
  if (fs.existsSync(filePath)) {
    accounts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  if (accounts.some(account => account.username === username)) {
    return { success: false, message: 'Conta já existe!' };
  }

  const accountData = {
    username: username,
    createdDate: new Date().toISOString(),
  };

  accounts.push(accountData);

  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(accounts, null, 4));
    return { success: true, message: 'Conta criada com sucesso!' };
  } catch (err) {
    console.error('[FuryTigris Launcher log] ERRO: Erro ao criar a conta: ', err);
  }
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    server();
    generateBat();
  }
});