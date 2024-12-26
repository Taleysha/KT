from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import APIKeyHeader
from typing import Dict
from dotenv import load_dotenv
import os
import httpx
import json

load_dotenv()

app = FastAPI()

class IntegrationService:
    def __init__(self):
        self.le_api_url = os.getenv("LAW_ENFORCEMENT_API_URL")
        self.community_api_url = os.getenv("COMMUNITY_API_URL")
        self.le_api_key = os.getenv("LAW_ENFORCEMENT_API_KEY")
        self.community_api_key = os.getenv("COMMUNITY_API_KEY")

    async def sync_alert(self, alert_data: Dict):
        # Remove sensitive information
        public_alert = self.filter_sensitive_data(alert_data)
        
        # Send to community system
        async with httpx.AsyncClient() as client:
            headers = {"X-API-Key": self.community_api_key}
            response = await client.post(
                f"{self.community_api_url}/public/alerts/",
                json=public_alert,
                headers=headers
            )
            if response.status_code != 200:
                raise HTTPException(status_code=500, detail="Failed to sync alert")
        
        return {"status": "success"}

    def filter_sensitive_data(self, data: Dict) -> Dict:
        sensitive_fields = [
            "criminal_history",
            "investigation_details",
            "officer_notes",
            "confidential_info"
        ]
        return {k: v for k, v in data.items() if k not in sensitive_fields}

integration_service = IntegrationService()

# API Key security
api_key_header = APIKeyHeader(name="X-API-Key")

async def verify_api_key(api_key: str = Depends(api_key_header)):
    if api_key != os.getenv("INTEGRATION_SECRET_KEY"):
        raise HTTPException(
            status_code=403,
            detail="Invalid API key"
        )

@app.post("/sync/alert")
async def sync_alert(
    alert_data: Dict,
    _: str = Depends(verify_api_key)
):
    return await integration_service.sync_alert(alert_data)