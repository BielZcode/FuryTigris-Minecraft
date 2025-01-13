const os = require('os');
const path = require('path');

/**
 * Função para localizar o caminho da pasta 'Roaming/FuryTigris Client'.
 * @returns {string} O caminho completo para a pasta 'FuryTigris Client' dentro do diretório Roaming.
 */
const getFuryTigrisClientPath = () => {
  const roamingPath = path.join(os.homedir(), 'AppData', 'Roaming');
  const furyTigrisClientPath = path.join(roamingPath, 'FuryTigris Client');
  return furyTigrisClientPath;
};

module.exports = {
  getFuryTigrisClientPath
};

