const fs = require('fs');
const path = require('path');
const os = require('os');

class DebugConfig {
  constructor() {
    this.configPath = path.join(os.homedir(), 'AppData', 'Roaming', 'FuryTigris Client', 'data', 'config.json');
  }

  loadConfig() {
    if (!fs.existsSync(this.configPath)) {
      return false; // Estado padrão se o arquivo não existir
    }

    try {
      const data = fs.readFileSync(this.configPath, 'utf-8');
      const config = JSON.parse(data);
      return config.debug || false;
    } catch (err) {
      console.error('Erro ao carregar o arquivo de configuração:', err);
      return false;
    }
  }

  saveConfig(debugState) {
    const dirPath = path.dirname(this.configPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const config = { debug: debugState };
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 4));
    } catch (err) {
      console.error('Erro ao salvar o arquivo de configuração:', err);
    }
  }
}

module.exports = DebugConfig;
