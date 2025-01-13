const fetch = require('node-fetch');
const fs = require('fs/promises'); // Importação para usar promises com fs
const path = require('path');
const { exec } = require('child_process');

async function getLatestVersion(versionEndpoint) {
    try {
        const response = await fetch(versionEndpoint);
        if (!response.ok) {
            throw new Error(`Endpoint retornou status ${response.status}`);
        }
        const data = await response.json();

        if (data.version) {
            return data.version;
        } else if (typeof data === 'string') {
            return data;
        } else {
            throw new Error("Formato de versão inválido no JSON.");
        }
    } catch (error) {
        console.error("Erro ao obter a versão remota:", error);
        throw error;
    }
}

async function downloadUpdate(downloadURL, destinationPath) {
    try {
        const response = await fetch(downloadURL);
        if (!response.ok) {
            throw new Error(`Download retornou status ${response.status}`);
        }

        const fileStream = fs.createWriteStream(destinationPath);
        await new Promise((resolve, reject) => {
            response.body.pipe(fileStream);
            response.body.on('error', reject);
            fileStream.on('finish', resolve);
        });
    } catch (error) {
        console.error("Erro durante o download:", error);
        throw error;
    }
}

async function checkForUpdates(currentVersion, versionEndpoint, downloadURL, app) {
    try {
        const latestVersion = await getLatestVersion(versionEndpoint);

        if (latestVersion !== currentVersion) {
            console.log("Atualização disponível!");
            if (app.isPackaged) {
                const currentPID = process.pid;
                exec(`taskkill /PID ${currentPID} /F`, (error) => {
                    if (error) {
                        console.error(`Erro ao matar o processo: ${error}`);
                    }
                });
            }

            const downloadPath = path.join(app.getPath('downloads'), 'nova_versao.exe');
            await downloadUpdate(downloadURL, downloadPath);

            exec(downloadPath, (error) => {
                if (error) {
                    console.error(`Erro ao executar a nova versão: ${error}`);

                }
            });

            return true;
        } else {
            console.log("Nenhuma atualização disponível.");

            return false;
        }
    } catch (error) {
        console.error("Erro durante a verificação de atualizações:", error);
        throw error;
    }
}
module.exports = { checkForUpdates, getLatestVersion, downloadUpdate }; // Exporta as funções
