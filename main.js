const { app, BrowserWindow } = require('electron'); 
const { run, setAppDir } = require('./main/run');

setAppDir('.launcher');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1100,
    height: 700,
  });

  win.loadFile('main/renderer/views/index.html');
};

app.whenReady().then(() => {
  createWindow()
});

// Quando todas as janelas forem fechadas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
