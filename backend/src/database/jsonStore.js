const fs = require('fs').promises;
const path = require('path');

class JsonStore {
  constructor() {
    this.dataDir = path.join(__dirname, '../../data');
    this.applicationsFile = path.join(this.dataDir, 'applications.json');
    this.settingsFile = path.join(this.dataDir, 'settings.json');
  }

  async initialize() {
    try {
      // Criar diretório de dados se não existir
      await fs.mkdir(this.dataDir, { recursive: true });
      
      // Inicializar arquivos se não existirem
      await this.initializeFile(this.applicationsFile, []);
      await this.initializeFile(this.settingsFile, {
        language: 'pt',
        phosphorIcons: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      console.log('📁 JSON Store initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing JSON Store:', error);
      throw error;
    }
  }

  async initializeFile(filePath, defaultData) {
    try {
      await fs.access(filePath);
    } catch {
      // Arquivo não existe, criar com dados padrão
      await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2));
      console.log(`📄 Created ${path.basename(filePath)} with default data`);
    }
  }

  async readFile(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
      throw error;
    }
  }

  async writeFile(filePath, data) {
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing ${filePath}:`, error);
      throw error;
    }
  }

  // Applications methods
  async getApplications() {
    const applications = await this.readFile(this.applicationsFile);
    return applications.sort((a, b) => a.order - b.order);
  }

  async saveApplication(applicationData) {
    const applications = await this.readFile(this.applicationsFile);
    const newApplication = {
      _id: this.generateId(),
      ...applicationData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    applications.push(newApplication);
    await this.writeFile(this.applicationsFile, applications);
    return newApplication;
  }

  async updateApplicationOrder(applicationsOrder) {
    const applications = await this.readFile(this.applicationsFile);
    
    // Criar um mapa para busca rápida
    const appMap = new Map(applications.map(app => [app._id, app]));
    
    // Atualizar ordem baseado no array recebido
    applicationsOrder.forEach((app, index) => {
      if (appMap.has(app._id)) {
        appMap.get(app._id).order = index;
        appMap.get(app._id).updatedAt = new Date().toISOString();
      }
    });
    
    await this.writeFile(this.applicationsFile, Array.from(appMap.values()));
    return true;
  }

  async deleteApplication(id) {
    const applications = await this.readFile(this.applicationsFile);
    const applicationIndex = applications.findIndex(app => app._id === id);
    
    if (applicationIndex === -1) {
      return null;
    }
    
    const deletedApplication = applications[applicationIndex];
    applications.splice(applicationIndex, 1);
    await this.writeFile(this.applicationsFile, applications);
    return deletedApplication;
  }

  async findApplicationById(id) {
    const applications = await this.readFile(this.applicationsFile);
    return applications.find(app => app._id === id);
  }

  async updateApplication(id, applicationData) {
    const applications = await this.readFile(this.applicationsFile);
    const applicationIndex = applications.findIndex(app => app._id === id);
    
    if (applicationIndex === -1) {
      return null;
    }
    
    applications[applicationIndex] = {
      ...applications[applicationIndex],
      ...applicationData,
      updatedAt: new Date().toISOString()
    };
    
    await this.writeFile(this.applicationsFile, applications);
    return applications[applicationIndex];
  }

  // Settings methods
  async getSettings() {
    return await this.readFile(this.settingsFile);
  }

  async updateSettings(settingsData) {
    const currentSettings = await this.readFile(this.settingsFile);
    const updatedSettings = {
      ...currentSettings,
      ...settingsData,
      updatedAt: new Date().toISOString()
    };
    
    await this.writeFile(this.settingsFile, updatedSettings);
    return updatedSettings;
  }

  // Utility methods
  generateId() {
    return Date.now().toString() + Math.random().toString(36).substring(2, 11);
  }
}

// Singleton instance
const jsonStore = new JsonStore();

module.exports = jsonStore;
