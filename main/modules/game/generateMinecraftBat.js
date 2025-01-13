const fs = require('fs');
const path = require('path');
const os = require('os');

// Função para carregar o arquivo accounts.json
function loadAccount(username) {
    const accountsFilePath = path.join(os.homedir(), 'AppData', 'Roaming', 'FuryTigris Client', 'accounts.json');
    
    try {
        const accountsData = fs.readFileSync(accountsFilePath, 'utf8');
        const accounts = JSON.parse(accountsData);
        const account = accounts.find(acc => acc.username === username);
        return account;
    } catch (err) {
        console.error('Erro ao carregar accounts.json:', err);
        return null;
    }
}

// Função para gerar o arquivo .bat com o caminho correto para a pasta .minecraft
function generateBat(username) {
    const minecraftPath = path.join(os.homedir(), 'AppData', 'Roaming', '.minecraft'); // Caminho da pasta .minecraft

    // Certificando-se de que o username é passado corretamente para o arquivo .bat
    const batContent = `
@echo off
cd /d "%~dp0"
java -Djava.library.path="${minecraftPath}\\versions\\furytigris_1.8.8\\natives" -cp "${minecraftPath}\\versions\\furytigris_1.8.8/furytigris_1.8.8.jar;%~dp0libraries\\*" net.minecraft.client.main.Main --version 1.8.8 --accessToken 000--username "${username}"
`;

    // Caminho onde o arquivo .bat será gerado
    const batFilePath = path.join(os.homedir(), 'AppData', 'Roaming', 'FuryTigris Client', 'minecraftstart.bat');
    
    // Escrevendo o conteúdo no arquivo .bat
    fs.writeFileSync(batFilePath, batContent, 'utf8');
    console.log('Arquivo .bat gerado com sucesso!');
}

// Exemplo de chamada: Carregar conta e gerar o .bat
const account = loadAccount('DarkZinh');  // Aqui você passa o nome do usuário que você deseja carregar
if (account) {
    generateBat(account.username);  // Passando o username para a função que gera o .bat
} else {
    console.log('Conta não encontrada.');
}

module.exports = generateBat;