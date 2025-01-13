const fs = require('fs');
const path = require('path');
const pathUtils = require('../utils/pathUtils'); // Ajuste o caminho se necessário

const Logger = {
    saveLog: (message, logFile) => {
        const logsDir = path.join(pathUtils.getFuryTigrisClientPath(), 'logs');
        const logFilePath = path.join(logsDir, logFile);

        try {
            // Verifique se o diretório existe e, caso contrário, crie-o
            if (!fs.existsSync(logsDir)) {
                fs.mkdirSync(logsDir, { recursive: true });
            }

            // Adicionando o timestamp (data e hora) no log
            const timestamp = new Date().toISOString();
            const logMessage = `[${timestamp}] ${message}\n`;

            // Exibe a mensagem no console
            console.log(`[FuryTigris Launcher logger] ${logMessage}`);

            // Salva o log no arquivo
            fs.appendFileSync(logFilePath, logMessage, 'utf8');

            console.log(`[FuryTigris Launcher logger] Log salvo em: ${logFilePath}`);
        } catch (error) {
            console.error('[FuryTigris Launcher logger] Erro ao salvar o log:', error);
        }
    },

    saveCrashReport: (error, logFile) => {
        const logsDir = path.join(pathUtils.getFuryTigrisClientPath(), 'logs');
        const crashReportPath = path.join(logsDir, logFile);

        try {
            // Verifique se o diretório de logs existe e crie-o se necessário
            if (!fs.existsSync(logsDir)) {
                fs.mkdirSync(logsDir, { recursive: true });
            }

            // Adicionando o timestamp (data e hora) no crash report
            const timestamp = new Date().toISOString();
            const crashReportMessage = `[${timestamp}] ERROR: ${error.message}\nStack trace: ${error.stack}\n`;

            // Exibe o crash report no console
            console.error(`[FuryTigris Launcher logger] Crash Report: ${crashReportMessage}`);

            // Salva o crash report no arquivo
            fs.appendFileSync(crashReportPath, crashReportMessage, 'utf8');

            console.log(`[FuryTigris Launcher logger] Crash report salvo em: ${crashReportPath}`);
        } catch (error) {
            console.error('[FuryTigris Launcher logger] Erro ao salvar o crash report:', error);
        }
    }
};

module.exports = Logger;
