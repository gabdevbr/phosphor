#!/bin/bash

echo "🔧 Setting up Phosphor development environment..."

# Install root dependencies
echo "📦 Installing root dependencies..."
yarn install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && yarn install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && yarn install
cd ..

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p backend/uploads

echo "✅ Setup complete! Run 'npm run dev' to start development server"