# 🚀 Phosphor - Deployment Guide

## Quick Deploy

### Docker Hub (Recomendado)
```bash
docker run -p 80:80 -v phosphor_data:/app/uploads gabdevbr/phosphor
```

### Build Local
```bash
git clone https://github.com/gabdevbr/phosphor
cd phosphor
docker build -t phosphor .
docker run -p 80:80 -v $(pwd)/uploads:/app/uploads phosphor
```

## Desenvolvimento

### Setup Rápido
```bash
# Instalar dependências
yarn install
cd backend && yarn install
cd ../frontend && yarn install

# Ou usar o script
chmod +x scripts/dev-setup.sh
./scripts/dev-setup.sh
```

### Executar em Desenvolvimento
```bash
# Modo desenvolvimento (frontend + backend)
npm run dev

# Frontend apenas (porta 3000)
cd frontend && npm start

# Backend apenas (porta 3001)
cd backend && npm run dev
```

## Configuração GitHub Actions

Para ativar o CI/CD automático, configure os secrets no GitHub:

1. Vá em Settings > Secrets and variables > Actions
2. Adicione:
   - `DOCKER_USERNAME`: seu username do Docker Hub
   - `DOCKER_PASSWORD`: seu token do Docker Hub

## Persistência de Dados

A aplicação salva dados em:
- `/app/uploads` - Imagens das aplicações
- `/app/backend/data` - Arquivos JSON com dados das aplicações e configurações

Use volumes Docker para persistir os dados entre reinicializações.

## Ports

- `3001` - Backend API (apenas desenvolvimento)