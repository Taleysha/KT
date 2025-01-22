from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseModel):
    # Service information
    app_name: str = "Integration Service"
    
    # API URLs
    law_enforcement_api_url: str = os.getenv("LAW_ENFORCEMENT_API_URL", "http://law-enforcement-service:8000")
    community_api_url: str = os.getenv("COMMUNITY_API_URL", "http://community-service:8000")
    
    # API Keys
    law_enforcement_api_key: str = os.getenv("LAW_ENFORCEMENT_API_KEY", "")
    community_api_key: str = os.getenv("COMMUNITY_API_KEY", "")
    
    # Optional configurations
    sync_batch_size: int = int(os.getenv("SYNC_BATCH_SIZE", "100"))
    retry_attempts: int = int(os.getenv("RETRY_ATTEMPTS", "3"))

settings = Settings()