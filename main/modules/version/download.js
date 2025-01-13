const fs = require('fs');
const path = require('path');
const https = require('https'); // ou 'http' se o arquivo for HTTP

// Função para fazer o download e salvar o arquivo no diretório específico
function downloadAndSaveFile(url, fileName) {
    // Define o caminho onde o arquivo será salvo
    const savePath = path.join(process.env.APPDATA, '.minecraft', 'versions', 'furytigris', fileName);

    // Cria o stream de gravação para salvar o arquivo
    const file = fs.createWriteStream(savePath);

    // Faz a requisição HTTP para o URL
    https.get(url, (response) => {
        response.pipe(file);
        
        file.on('finish', () => {
            file.close();
            console.log('Download concluído e salvo em:', savePath);
        });
    }).on('error', (err) => {
        fs.unlink(savePath);  // Remove o arquivo caso ocorra erro
        console.error('Erro no download:', err.message);
    });
}

// Exporte a função para ser usada em outros arquivos
module.exports = { downloadAndSaveFile };
