# Phosphor - Copilot Instructions

## Projeto Overview
Phosphor é um portal de aplicações com visual terminal retro que simula monitores CRT antigos. A aplicação utiliza React com Material-UI no frontend, Node.js no backend, sistema de persistência baseado em arquivos JSON, e roda completamente em Docker com arquitetura simplificada.

## Stack Tecnológica
- **Frontend**: React 18, Material-UI 5, react-beautiful-dnd, react-i18next, axios
- **Backend**: Node.js, Express, Multer, Sharp, UUID, Helmet, Rate Limiting
- **Persistência**: Arquivos JSON (eliminando dependência de banco de dados)
- **Container**: Docker simples com Node.js servindo frontend+backend unificado
- **CI/CD**: GitHub Actions com deploy automático no Docker Hub

## Princípios de Desenvolvimento
- Seguir princípios SOLID sem overengineering
- Código simples, objetivo e fácil para contributors
- Visual terminal retro com efeitos CRT e scanlines
- Suporte completo a i18n (pt, en, es) com detecção automática
- Containerização ultra-simples sem dependências externas
- Persistência em arquivos JSON para zero-configuração
- Deploy com um único comando Docker
- Servidor único Node.js servindo API + frontend estático

## Estrutura do Projeto
```
phosphor/
├── backend/          # API Node.js + serve frontend
├── frontend/         # React SPA
├── uploads/         # Armazenamento de imagens
├── data/            # Arquivos JSON (applications.json, settings.json)
├── docker/          # Configs Docker simplificados
└── .github/         # CI/CD e instruções
```

## Arquitetura Simplificada

### Sistema de Persistência JSON
O Phosphor utiliza um sistema de persistência baseado em arquivos JSON, eliminando a necessidade de bancos de dados externos:

- **JsonStore**: Classe centralizada para gerenciar dados (`backend/src/database/jsonStore.js`)
- **applications.json**: Array de aplicações com metadados
- **settings.json**: Configurações globais do sistema
- **Backup automático**: Arquivos JSON são versionados pelo Git
- **Zero configuração**: Não requer setup de banco de dados

### Servidor Único Node.js
- Backend Express serve tanto API quanto frontend estático
- Eliminação do Nginx para simplicidade máxima
- Porta única (3001) para desenvolvimento e produção
- Middleware integrado para uploads, segurança e CORS
- Health check endpoint em /health
- Catch-all handler para SPA routing do React

### Docker Minimal
- Dockerfile: Imagem Node.js pura sem dependências externas
- docker-compose.yml: Setup simples para produção
- docker-compose.dev.yml: Setup para desenvolvimento  
- Volumes apenas para uploads e dados JSON
- Startup rápido sem orquestração complexa
- Porta 9097 mapeada em produção via docker-compose

## Visual Terminal Retro
- Fundo preto (#000) com texto verde (#00ff00)
- Fonte monospace "Share Tech Mono"
- Efeitos de scanlines e glow
- Ícones com filtro phosphor (verde pixelado) opcional
- Modais estilo terminal com bordas verdes
- Efeito CRT com box-shadow verde

## Roadmap de Funcionalidades

### ✅ Funcionalidades Implementadas
- [x] Estrutura base do projeto (React + Node.js)
- [x] Sistema de persistência em arquivos JSON
- [x] Backend API servindo frontend e dados
- [x] Frontend com visual terminal retro
- [x] Modal para adicionar aplicações
- [x] Sistema de drag & drop para reordenar
- [x] Modal de configurações
- [x] Sistema i18n (pt/en/es) com detecção automática
- [x] Upload e processamento de imagens
- [x] Efeito fósforo para ícones (opcional)
- [x] Pipeline CI/CD GitHub Actions
- [x] Containerização simplificada sem dependências externas
- [x] Título personalizado configurável
- [x] Favicon personalizado (ícone terminal)
- [x] Modal de confirmação para deletar aplicações
- [x] Modal de edição de aplicações
- [x] Context menu (botão direito)
- [x] Catch-all handler para SPA routing
- [x] Health check endpoint

### 🚧 Em Desenvolvimento
- [ ] Nenhuma tarefa em desenvolvimento no momento

### 📋 Funcionalidades Pendentes

#### Core Features
- [ ] Sistema de autenticação (login/logout)
- [ ] Perfis de usuário múltiplos
- [ ] Backup/restore de configurações
- [ ] Importar/exportar aplicações
- [ ] Busca e filtros de aplicações
- [ ] Categorização de aplicações
- [ ] Modo fullscreen/kiosk

#### Visual & UX
- [ ] Animações de transição entre telas
- [ ] Sound effects retro opcionais
- [ ] Temas alternativos (amber, blue)
- [ ] Personalização de cores
- [ ] Wallpapers de terminal
- [ ] Efeito de digitação no texto

#### Funcionalidades Avançadas
- [ ] Widget de informações do sistema
- [ ] Integração com APIs externas
- [ ] Shortcuts de teclado
- [ ] Modo offline com cache
- [ ] Notificações no estilo terminal
- [ ] Logs de acesso às aplicações

#### DevOps & Deployment
- [ ] Health checks avançados
- [ ] Métricas e monitoramento
- [ ] Logs estruturados
- [ ] Configuração via environment variables
- [ ] Docker Compose para desenvolvimento
- [ ] Kubernetes manifests

## Padrões de Código

### Frontend (React)
- Usar hooks funcionais
- Context API para estado global
- Material-UI com customização terminal
- Componentes reutilizáveis em /components
- CSS classes com prefixo terminal-*

### Backend (Node.js)
- Arquitetura baseada em rotas
- Persistência em arquivos JSON simples
- Middleware para segurança (helmet, rate-limit)
- Validação de entrada
- Error handling consistente
- Logs estruturados
- Servidor único servindo API + frontend

### Docker
- Containerização simples com Node.js
- Dockerfile minimal para produção
- Docker Compose para desenvolvimento
- Volumes para persistência de uploads e dados

## Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Build do frontend
npm run build

# Build Docker
docker build -t gabdevbr/phosphor .

# Run Docker local
docker run -p 3001:3001 gabdevbr/phosphor

# Docker Compose produção
docker-compose up

# Docker Compose desenvolvimento
docker-compose -f docker-compose.dev.yml up

# Publicar no Docker Hub
docker push gabdevbr/phosphor

# Script de desenvolvimento com verificações
./start-dev.sh

# Script de desenvolvimento simples
./start.sh

# Setup inicial do ambiente de desenvolvimento
./scripts/dev-setup.sh
```

## Instruções Importantes

### Ao fazer mudanças no projeto:
1. **SEMPRE** atualizar este arquivo copilot-instructions.md
2. Marcar itens como implementados [x] no roadmap
3. Adicionar novos itens se descobertos durante implementação
4. Manter padrões visuais terminal retro
5. Seguir convenções de commit semântico

### Para Contributors:
- Fork o repositório
- Criar branch feature/nome-da-feature
- Seguir padrões de código estabelecidos
- Atualizar documentação

### Estrutura de Dados

#### Application JSON (applications.json)
```json
[
  {
    "_id": "1692123456789abc123def",
    "name": "Nome da Aplicação",
    "url": "https://example.com",
    "image": "hash-da-imagem.png",
    "order": 1629876543210,
    "createdAt": "2025-08-17T10:30:00.000Z",
    "updatedAt": "2025-08-17T10:30:00.000Z"
  }
]
```

#### Settings JSON (settings.json)
```json
{
  "language": "pt",
  "phosphorIcons": true,
  "customTitle": "Meu Terminal",
  "createdAt": "2025-08-17T10:30:00.000Z",
  "updatedAt": "2025-08-17T10:30:00.000Z"
}
```

## Endpoints da API

### Applications
- `GET /api/applications` - Listar todas as aplicações
- `POST /api/applications` - Criar nova aplicação (com upload de imagem)
- `PUT /api/applications/:id` - Atualizar aplicação existente
- `DELETE /api/applications/:id` - Deletar aplicação
- `PUT /api/applications/reorder` - Reordenar aplicações (drag & drop)

### Settings
- `GET /api/settings` - Obter configurações atuais
- `PUT /api/settings` - Atualizar configurações

### Static Files
- `GET /uploads/:filename` - Servir imagens das aplicações
- `GET /health` - Health check do servidor
- `GET *` - Catch-all para servir o frontend React (SPA routing)

## Segurança
- Rate limiting no backend (15 min window, 100 requests max)
- Validação de uploads de imagem com Sharp
- Helmet para headers de segurança HTTP
- CORS configurado para desenvolvimento e produção
- Validação de tipos MIME para uploads
- Express middleware para parsing JSON com limites

## Upload e Processamento de Imagens
- **Multer**: Upload com limite de 5MB por arquivo
- **Sharp**: Redimensionamento automático para 64x64px
- **Hash SHA256**: Nomes únicos de arquivos para evitar conflitos
- **Formatos suportados**: JPEG, PNG, GIF, WebP, SVG
- **Conversão**: Automática para PNG otimizado
- **Validação**: MIME types e extensões para segurança
- **Fallback**: Transparência preservada com fundo preto

## Performance
- Imagens otimizadas (64x64 PNG)
- Cache de assets estáticos
- Lazy loading quando aplicável
- Bundle optimization

## Arquitetura Frontend React

### Context APIs
- **ApplicationContext**: Gerencia estado global das aplicações
  - `useApplications()` hook para acessar dados e ações
  - CRUD completo: adicionar, editar, deletar, reordenar
  - Loading states e error handling
  
- **SettingsContext**: Gerencia configurações globais
  - `useSettings()` hook para acessar configurações
  - Sincronização automática com i18n
  - Persistência automática no backend

### Hooks Customizados
- **useDocumentTitle**: Atualiza título da aba do navegador automaticamente
  - Integração com configurações de título personalizado
  - Fallback para título padrão traduzido

### Componentes Principais
- **ApplicationGrid**: Grid responsivo com drag & drop
- **ApplicationItem**: Card individual de aplicação
- **AddApplicationModal**: Modal para adicionar aplicações
- **EditApplicationModal**: Modal para editar aplicações
- **SettingsModal**: Modal de configurações
- **ConfirmDeleteModal**: Modal de confirmação para exclusão
- **ContextMenu**: Menu de contexto (botão direito)
- **TerminalHeader**: Cabeçalho estilo terminal
- **DocumentTitleUpdater**: Wrapper para atualização de título

---

**Última atualização**: Migração para sistema de arquivos JSON - 2025-08-17  
**Próximos passos**: Escolher e implementar funcionalidades do roadmap baseado em prioridade