# Dockerfile Ultra Simples - Apenas Node.js
FROM node:18-alpine

WORKDIR /app

# Copiar e instalar dependências do backend
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

# Copiar e instalar dependências do frontend
WORKDIR /app
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copiar código fonte
WORKDIR /app
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Build do frontend
WORKDIR /app/frontend
RUN npm run build

# Criar diretórios necessários
WORKDIR /app
RUN mkdir -p backend/uploads backend/data

# Expor apenas a porta do backend
EXPOSE 3001

# Iniciar apenas o backend (que agora serve o frontend também)
CMD ["node", "backend/src/index.js"]
