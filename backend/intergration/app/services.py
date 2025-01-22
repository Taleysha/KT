from fastapi import HTTPException
import httpx
from typing import Dict, Optional
import asyncio
from .config import settings

class IntegrationService:
    def __init__(self):
        self.le_api_url = settings.law_enforcement_api_url
        self.community_api_url = settings.community_api_url
        self.le_api_key = settings.law_enforcement_api_key
        self.community_api_key = settings.community_api_key
        self.retry_attempts = settings.retry_attempts

    async def sync_alert(self, alert_data: Dict) -> Dict:
        """
        Syncs alert data between law enforcement and community systems
        """
        try:
            # Filter sensitive data before sending to community system
            public_alert = self.filter_sensitive_data(alert_data)
            
            # Attempt to sync with retries
            for attempt in range(self.retry_attempts):
                try:
                    return await self._send_to_community(public_alert)
                except Exception as e:
                    if attempt == self.retry_attempts - 1:
                        raise
                    await asyncio.sleep(2 ** attempt)  # Exponential backoff
            
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Integration service error: {str(e)}"
            )

    async def _send_to_community(self, alert_data: Dict) -> Dict:
        """
        Sends filtered alert data to community system
        """
        async with httpx.AsyncClient() as client:
            headers = {
                "X-API-Key": self.community_api_key,
                "Content-Type": "application/json"
            }
            
            response = await client.post(
                f"{self.community_api_url}/public/alerts/",
                json=alert_data,
                headers=headers,
                timeout=30.0
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Community system error: {response.text}"
                )
                
            return {
                "status": "success",
                "synced_alert": alert_data,
                "community_response": response.json()
            }

    def filter_sensitive_data(self, alert_data: Dict) -> Dict:
        """
        Filters out sensitive information from alert data
        """
        sensitive_fields = {
            "internal_notes",
            "officer_details",
            "confidential_info",
            "investigation_details"
        }
        
        return {
            k: v for k, v in alert_data.items() 
            if k not in sensitive_fields
        }

    async def health_check(self) -> Dict:
        """
        Checks the health of connected services
        """
        services_status = {}
        
        async with httpx.AsyncClient() as client:
            # Check law enforcement service
            try:
                le_response = await client.get(
                    f"{self.le_api_url}/health",
                    headers={"X-API-Key": self.le_api_key},
                    timeout=5.0
                )
                services_status["law_enforcement"] = le_response.status_code == 200
            except:
                services_status["law_enforcement"] = False

            # Check community service
            try:
                comm_response = await client.get(
                    f"{self.community_api_url}/health",
                    headers={"X-API-Key": self.community_api_key},
                    timeout=5.0
                )
                services_status["community"] = comm_response.status_code == 200
            except:
                services_status["community"] = False

        return {
            "status": "healthy" if all(services_status.values()) else "degraded",
            "services": services_status
        }