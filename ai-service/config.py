"""
Configuration settings for MediFlow AI Service
"""

from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    """Application settings"""
    
    # Service
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    AI_SERVICE_PORT: int = int(os.getenv("AI_SERVICE_PORT", 8000))
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    
    # External Services
    OLLAMA_URL: str = os.getenv("OLLAMA_URL", "http://localhost:11434")
    HUGGINGFACE_API_KEY: str = os.getenv("HUGGINGFACE_API_KEY", "")
    
    # Vector Database
    PINECONE_API_KEY: str = os.getenv("PINECONE_API_KEY", "")
    PINECONE_ENVIRONMENT: str = os.getenv("PINECONE_ENVIRONMENT", "")
    
    # Models
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"
    LLM_MODEL: str = "mistral"  # Ollama model
    
    # Cache
    CACHE_DIR: str = "./models_cache"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
