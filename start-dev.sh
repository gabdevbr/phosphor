#!/bin/bash

# Phosphor Development Startup Script
# Este script inicia o frontend e backend em modo de desenvolvimento

set -e

echo "🚀 Iniciando Phosphor em modo desenvolvimento..."
echo "============================================="

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para verificar se uma porta está em uso
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${YELLOW}⚠️  Porta $port já está em uso${NC}"
        return 1
    fi
    return 0
}

# Função para instalar dependências se necessário
install_dependencies() {
    local dir=$1
    local name=$2
    
    if [ ! -d "$dir/node_modules" ]; then
        echo -e "${YELLOW}📦 Instalando dependências do $name...${NC}"
        cd "$dir"
        npm install
        cd - > /dev/null
    fi
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}❌ Este script deve ser executado no diretório raiz do projeto Phosphor${NC}"
    exit 1
fi

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não está instalado. Por favor, instale o Node.js primeiro.${NC}"
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm não está instalado. Por favor, instale o npm primeiro.${NC}"
    exit 1
fi

# Instalar dependências do projeto principal
echo -e "${BLUE}📦 Verificando dependências do projeto principal...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Instalando dependências do projeto principal...${NC}"
    npm install
fi

# Instalar dependências do backend
echo -e "${BLUE}📦 Verificando dependências do backend...${NC}"
install_dependencies "backend" "backend"

# Instalar dependências do frontend
echo -e "${BLUE}📦 Verificando dependências do frontend...${NC}"
install_dependencies "frontend" "frontend"

# Verificar portas
echo -e "${BLUE}🔍 Verificando portas...${NC}"
if ! check_port 3001; then
    echo -e "${RED}❌ Porta 3001 (backend) está em uso. Por favor, libere a porta antes de continuar.${NC}"
    exit 1
fi

if ! check_port 3000; then
    echo -e "${RED}❌ Porta 3000 (frontend) está em uso. Por favor, libere a porta antes de continuar.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Pré-requisitos verificados!${NC}"
echo ""
echo -e "${BLUE}🚀 Iniciando aplicação...${NC}"
echo ""
echo -e "${GREEN}Frontend: ${NC}http://localhost:3000"
echo -e "${GREEN}Backend:  ${NC}http://localhost:3001"
echo ""
echo -e "${YELLOW}Para parar a aplicação, pressione Ctrl+C${NC}"
echo ""

# Iniciar frontend e backend usando concurrently
npm run dev
