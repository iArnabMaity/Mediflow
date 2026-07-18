#!/bin/bash

# MediFlow Setup Script
# Initializes development environment for MediFlow

set -e

echo "🚀 MediFlow Setup Script"
echo "========================"

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.10 or higher."
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker."
    exit 1
fi

echo "✅ All prerequisites are installed"

# Install dependencies
echo ""
echo "📦 Installing root dependencies..."
npm install

echo ""
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo ""
echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

echo ""
echo "🐍 Installing AI service dependencies..."
cd ai-service && pip install -r requirements.txt && cd ..

# Create environment files
echo ""
echo "🔧 Setting up environment files..."

if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file (update with your configuration)"
fi

if [ ! -f frontend/.env.local ]; then
    cp frontend/ENV_TEMPLATE.txt frontend/.env.local
    echo "✅ Created frontend/.env.local file"
fi

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env file"
fi

# Initialize databases
echo ""
echo "🗄️  Initializing databases..."

# Start PostgreSQL and Redis with Docker (optional)
if command -v docker-compose &> /dev/null; then
    echo "📦 Starting database containers..."
    docker-compose up -d db redis
    sleep 5
fi

echo ""
echo "✅ MediFlow setup completed successfully!"
echo ""
echo "Next steps:"
echo "  1. Update .env files with your configuration"
echo "  2. Run 'npm run dev' to start development servers"
echo "  3. Visit http://localhost:3000 for the frontend"
echo "  4. Visit http://localhost:3001/api for the backend"
echo "  5. Visit http://localhost:8000/docs for AI service API docs"
