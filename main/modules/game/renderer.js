const { exec } = require('child_process');
const path = require('path');

document.getElementById('startButton').addEventListener('click', () => {
    
    ipcRenderer.send('start-minecraft', { someParam: 'value' });
    const batFilePath = path.join(__dirname, 'minecraftstart.bat');
    
    // Executa o arquivo .bat
    exec(batFilePath, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar o arquivo .bat: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
});
