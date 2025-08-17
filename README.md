# 🖥️ Phosphor Terminal

Portal de aplicações com visual terminal retro que simula monitores CRT antigos.

<img width="660" height="486" alt="image" src="https://github.com/user-attachments/assets/f2ce94ba-f679-48fe-9a58-1e13a5d6c4d6" />

<img width="660" height="486" alt="image" src="https://github.com/user-attachments/assets/4f2951d9-e99a-496d-b2e4-ac2541f76712" />

<img width="661" height="650" alt="image" src="https://github.com/user-attachments/assets/263fa4d1-700a-4385-b1e6-f3ca0c8d4757" />


![GitHub](https://img.shields.io/github/license/gabdevbr/phosphor)
![GitHub stars](https://img.shields.io/github/stars/gabdevbr/phosphor)
![GitHub forks](https://img.shields.io/github/forks/gabdevbr/phosphor)
![Docker Pulls](https://img.shields.io/docker/pulls/gabdevbr/phosphor)

## 🚀 Quick Start

### Docker Run (Simples)
```bash
# Executar via Docker
docker run -p 9999:3001 gabdevbr/phosphor

# Acessar em http://localhost:9999
```

### Docker Compose (Recomendado)
Crie um arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  phosphor:
    image: gabdevbr/phosphor:latest
    ports:
      - "9999:3001"
    volumes:
      - ./uploads:/app/backend/uploads
      - ./data:/app/backend/data
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

Execute:
```bash
docker-compose up -d
```

Acesse em: http://localhost:9999

## ✨ Features

- 🖥️ Visual terminal retro com efeitos CRT
- 📱 Portal de aplicações drag & drop
- 🌍 Suporte i18n (pt/en/es)
- 🔧 Configurações personalizáveis
- 🎨 **Título personalizado** - Altere o título da aplicação nas configurações
- 🌟 **Favicon personalizado** - Ícone terminal com efeito phosphor
- ⚡ Efeitos de ícones Phosphor opcional
- � Sistema de arquivos JSON para persistência
- �🐳 Deploy com um comando Docker

## 🎛️ Configurações

A aplicação oferece as seguintes opções de personalização:

### 🎨 Título Personalizado
- Personalize o título exibido no cabeçalho da aplicação
- O título também atualiza automaticamente o título da aba do navegador
- Mantenha em branco para usar o título padrão

### 🌍 Idioma
- Português (PT)
- English (EN) 
- Español (ES)

### ⚡ Efeitos Visuais
- **Ícones Phosphor**: Aplica efeito terminal aos ícones das aplicações

## 🛠️ Desenvolvimento Local

Para contribuir com o projeto, siga os passos abaixo:

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn

### Setup
```bash
# Clonar repositório
git clone https://github.com/gabdevbr/phosphor
cd phosphor

# Instalar dependências do backend
cd backend && npm install

# Instalar dependências do frontend
cd ../frontend && npm install

# Voltar para raiz
cd ..

# Executar em modo desenvolvimento
npm run dev
```

O servidor estará disponível em http://localhost:3001

### Estrutura do Projeto
```
phosphor/
├── backend/          # API Node.js + serve frontend
├── frontend/         # React SPA
├── uploads/         # Armazenamento de imagens
├── data/            # Arquivos JSON (applications.json, settings.json)
└── docker/          # Configs Docker
```

## 🐳 Docker para Desenvolvimento

```bash
# Build local
docker build -t phosphor-local .

# Run local
docker run -p 3001:3001 phosphor-local

# Ou usar docker-compose para desenvolvimento
docker-compose -f docker-compose.dev.yml up
```

## 🎯 Como Usar

1. **Adicionar Aplicações**: Clique no botão "+" para adicionar uma nova aplicação
2. **Configurar**: Use o ícone de configurações no canto superior direito
3. **Personalizar Título**: Nas configurações, defina um título personalizado para sua instância
4. **Organizar**: Arraste e solte as aplicações para reordená-las

## 🤝 Contribuindo

Contribuições são bem-vindas! Este projeto está aberto para a comunidade.

### Como Contribuir

1. **Fork** o repositório
2. Crie uma **branch** para sua feature (`git checkout -b feature/nova-feature`)
3. **Commit** suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. **Push** para a branch (`git push origin feature/nova-feature`)
5. Abra um **Pull Request**

### Diretrizes

- Siga os padrões de código existentes
- Adicione testes quando aplicável
- Atualize a documentação se necessário
- Use commits semânticos (feat, fix, docs, style, refactor, test, chore)

### Roadmap de Features

Veja nossa lista de funcionalidades planejadas:

#### 🔥 Prioridade Alta
- [ ] Sistema de autenticação
- [ ] Perfis de usuário múltiplos
- [ ] Backup/restore de configurações
- [ ] Busca e filtros de aplicações

#### 🎨 Visual & UX
- [ ] Animações de transição
- [ ] Sound effects retro opcionais
- [ ] Temas alternativos (amber, blue)
- [ ] Shortcuts de teclado

#### ⚡ Features Avançadas
- [ ] Widget de informações do sistema
- [ ] Integração com APIs externas
- [ ] Modo offline com cache
- [ ] Notificações no estilo terminal

### Issues e Bugs

- 🐛 Encontrou um bug? [Abra uma issue](https://github.com/gabdevbr/phosphor/issues)
- 💡 Tem uma ideia? [Discussões](https://github.com/gabdevbr/phosphor/discussions)
- � Dúvidas? Verifique a [documentação](https://github.com/gabdevbr/phosphor/wiki)

## 🏗️ Stack Tecnológica

- **Frontend**: React 18, Material-UI 5, react-beautiful-dnd
- **Backend**: Node.js, Express
- **Persistência**: Arquivos JSON (zero configuração)
- **Container**: Docker simples
- **I18n**: react-i18next (pt/en/es)

## �📝 Licença

MIT © [Gabriel Oliveira](https://github.com/gabdevbr)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!
