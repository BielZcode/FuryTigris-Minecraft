/*
Copyright (c) 2024 GameStatic. Todos os direitos reservados.

Este software, incluindo todo o seu conteúdo, código-fonte, design, documentação, imagens, textos, gráficos, logotipos, e qualquer outro material associado, é protegido por leis nacionais e internacionais de direitos autorais e propriedade intelectual. Todos os direitos são reservados exclusivamente à GameStatic.
A reprodução, distribuição, exibição pública, modificação, criação de trabalhos derivados, engenharia reversa, desmontagem ou qualquer outra forma de utilização, total ou parcial, deste software ou de seus componentes, é estritamente proibida sem autorização prévia e expressa dos detentores dos direitos autorais.
Equipe liberada a destribuição equipe GameStatic não liberaremos permissão de nem uma forma resultara em Penalidades
Este software é fornecido "como está", sem garantias de qualquer tipo, expressas ou implícitas, incluindo, mas não se limitando a, garantias de comercialização, adequação a um propósito específico, ou não violação. O uso deste software é feito sob risco exclusivo do usuário, e os proprietários não se responsabilizam por quaisquer danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou da incapacidade de usar o software.
Qualquer violação dos termos acima será tratada como uma infração às leis de direitos autorais e poderá resultar em penalidades legais, incluindo ações judiciais civis e criminais, de acordo com as regulamentações aplicáveis.
Ao utilizar este software, você concorda em respeitar os termos deste aviso de copyright. Reservamo-nos o direito de tomar as medidas legais necessárias para proteger nossos direitos de propriedade intelectual e para garantir o cumprimento dos termos estabelecidos neste documento.

*/

const express = require('express');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const fs = require('fs');
const https = require('https');  // Para baixar o arquivo
const app = express();
const logger = require('./main/handlers/logger');  // Importando o Logger
const port = 3000;

// Função que retorna o caminho completo para o arquivo 'accounts.json'
function getAccountsFilePath() {
    // Usando pathUtils para obter o diretório do usuário no Roaming
    const roamingPath = path.join(os.homedir(), 'AppData', 'Roaming', 'FuryTigris Client');
    const accountsFilePath = path.join(roamingPath, 'accounts.json');
    return accountsFilePath;
}

// Função para carregar o arquivo 'accounts.json'
function loadAccounts() {
    const accountsFilePath = getAccountsFilePath();

    // Verificar se o arquivo existe
    if (fs.existsSync(accountsFilePath)) {
        // Ler o conteúdo do arquivo JSON
        return fs.readFileSync(accountsFilePath, 'utf8');
    } else {
        console.log('[FuryTigris Launcher log] INFO:  arquivo accounts.json não existe no caminho:', accountsFilePath);
        return null;
    }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Permite que o Express parseie JSON

// Endpoint para fornecer o username
// Endpoint para fornecer o username
app.get('/get-username', (req, res) => {
    const accountsData = loadAccounts();
    if (accountsData) {
        try {
            const accounts = JSON.parse(accountsData);
            // Verifique se há pelo menos um usuário no array
            if (accounts.length > 0) {
                const username = accounts[0].username; // Acessando o primeiro usuário no array
                res.json({ username });
            } else {
                res.status(404).json({ error: '[FuryTigris Launcher log] INFO: Nenhum usuário encontrado no arquivo accounts.json' });
            }
        } catch (error) {
            res.status(500).json({ error: '[FuryTigris Launcher log] INFO: Erro ao processar o arquivo accounts.json' });
        }
    } else {
        res.status(404).json({ error: '[FuryTigris Launcher log] INFO: accounts.json não encontrado' });
    }
});

app.get('/run-launcher', (req, res) => {
    const batFilePath = path.join(os.homedir(), 'AppData', 'Roaming', 'FuryTigris Client', 'minecraftstart.bat');
    console.log('[FuryTigris Launcher log] INFO: iniciando bat', batFilePath);
    exec(`cmd /c "${batFilePath}"`, (error, stdout, stderr) => {
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);

        if (error) {
            console.error('[FuryTigris Launcher log] INFO: Erro ao executar o .bat:', error);
        } else {
            console.log('[FuryTigris Launcher log] INFO: Execução do .bat foi bem-sucedida');
        }
        if (error) {
            const errorMessage = `[FuryTigris Launcher log] INFO: Erro ao executar o arquivo .bat: ${error.message}`;

            // Chama o Logger para registrar o erro no arquivo de log e crash report
            logger.saveLog(errorMessage, 'launcher/error-log.json');
            logger.saveCrashReport(error, 'launcher/crashreport.json');

            return res.json({
                success: false,
                errorDetails: errorMessage,
                stdout: stdout,
                stderr: stderr || error.message,
            });
        }
        
        res.json({
            success: true,
            message: successMessage,
            stdout: stdout,
        });
    });
});
