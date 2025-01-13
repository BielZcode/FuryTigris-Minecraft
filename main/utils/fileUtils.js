const fs = require('fs');
const path = require('path');
const { getFuryTigrisClientPath } = require('./pathUtils');

/**
 * Função para obter o caminho completo para um arquivo no diretório 'FuryTigris Client'.
 * @param {string} fileName O nome do arquivo que será procurado.
 * @returns {string} O caminho completo para o arquivo.
 */
const getFilePath = (fileName) => {
  const clientPath = getFuryTigrisClientPath();
  return path.join(clientPath, fileName);
};

/**
 * Função para verificar se um arquivo existe no diretório 'FuryTigris Client'.
 * @param {string} fileName O nome do arquivo a ser verificado.
 * @returns {boolean} Retorna true se o arquivo existir, caso contrário false.
 */
const fileExists = (fileName) => {
  const filePath = getFilePath(fileName);
  return fs.existsSync(filePath);
};

/**
 * Função para ler um arquivo JSON.
 * @param {string} fileName O nome do arquivo JSON a ser lido.
 * @returns {object|null} Retorna o conteúdo do arquivo JSON ou null se o arquivo não existir ou ocorrer um erro.
 */
const readJSONFile = (fileName) => {
  const filePath = getFilePath(fileName);

  if (!fileExists(fileName)) {
    return null; // Se o arquivo não existir, retorna null
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent); // Retorna o conteúdo parseado do arquivo JSON
  } catch (error) {
    console.error(`Erro ao ler o arquivo JSON: ${error}`);
    return null;
  }
};

/**
 * Função para escrever em um arquivo JSON.
 * @param {string} fileName O nome do arquivo JSON a ser escrito.
 * @param {object} data O objeto que será convertido para JSON e salvo no arquivo.
 * @returns {boolean} Retorna true se a operação for bem-sucedida, caso contrário false.
 */
const writeJSONFile = (fileName, data) => {
  const filePath = getFilePath(fileName);

  try {
    const jsonData = JSON.stringify(data, null, 4);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
    return true;
  } catch (error) {
    console.error(`Erro ao escrever no arquivo JSON: ${error}`);
    return false;
  }
};

module.exports = {
  fileExists,
  readJSONFile,
  writeJSONFile
};
