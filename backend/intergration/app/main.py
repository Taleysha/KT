from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .services import IntegrationService
from .middleware import SecurityMiddleware
from .config import settings
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Integration Service API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add security middleware
app.add_middleware(SecurityMiddleware)

# Initialize integration service
integration_service = IntegrationService()

@app.post("/sync-alert")
async def sync_alert(alert_data: dict):
    try:
        result = await integration_service.sync_alert(alert_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}