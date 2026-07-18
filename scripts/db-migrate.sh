#!/bin/bash

# MediFlow Database Migration Script
# Handles database setup and migrations

set -e

echo "🗄️  MediFlow Database Migration Script"
echo "======================================"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create it from .env.example"
    exit 1
fi

# Source environment variables
set -a
source .env
set +a

echo "📊 Database Configuration:"
echo "   Host:     $POSTGRES_HOST"
echo "   Port:     $POSTGRES_PORT"
echo "   Database: $POSTGRES_DB"
echo "   User:     $POSTGRES_USER"

echo ""
echo "🔄 Running migrations..."

cd backend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Run migrations
echo "📝 Running database migrations..."
npm run db:push

# Optionally seed data
if [ "$1" == "--seed" ]; then
    echo "🌱 Seeding database..."
    npm run seed
fi

echo ""
echo "✅ Database migrations completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "   - Start the development server with: npm run dev"
echo "   - Open http://localhost:3001/api in your browser"
