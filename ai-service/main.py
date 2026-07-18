"""
MediFlow AI Service - Main Entry Point
Healthcare-specific AI recommendations and patient care coordination
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from app.config import settings

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="MediFlow AI Service",
    description="AI-powered healthcare navigation and patient care coordination",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "mediflow-ai",
        "version": "1.0.0"
    }

# API Routes (placeholder)
@app.get("/api/v1")
async def api_info():
    """API Information"""
    return {
        "service": "MediFlow AI Service",
        "version": "1.0.0",
        "endpoints": {
            "recommendations": "/api/v1/recommendations",
            "diagnosis-assistance": "/api/v1/diagnosis",
            "drug-interactions": "/api/v1/drug-interactions",
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=settings.AI_SERVICE_PORT,
        reload=settings.DEBUG
    )
