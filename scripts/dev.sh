#!/bin/bash

# MediFlow Development Server Script
# Starts all services in development mode

set -e

echo "🚀 Starting MediFlow Development Environment"
echo "============================================"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    # Kill all background processes
    pkill -f "next dev" || true
    pkill -f "ts-node-dev" || true
    pkill -f "python" || true
}

trap cleanup EXIT

# Start services in background
echo "📱 Starting Frontend (Port 3000)..."
cd frontend && npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!

echo "🔌 Starting Backend (Port 3001)..."
cd ../backend && npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!

echo "🤖 Starting AI Service (Port 8000)..."
cd ../ai-service && python main.py > /tmp/ai-service.log 2>&1 &
AI_PID=$!

# Wait for services to start
sleep 5

echo ""
echo "✅ All services started!"
echo ""
echo "📋 Service URLs:"
echo "   Frontend:   http://localhost:3000"
echo "   Backend:    http://localhost:3001/health"
echo "   AI Service: http://localhost:8000/docs"
echo ""
echo "📊 Logs:"
echo "   Frontend:   tail -f /tmp/frontend.log"
echo "   Backend:    tail -f /tmp/backend.log"
echo "   AI Service: tail -f /tmp/ai-service.log"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for all background processes
wait
