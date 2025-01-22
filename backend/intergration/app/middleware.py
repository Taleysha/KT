from fastapi import Request, HTTPException
from typing import Dict
from .config import settings

class SecurityMiddleware:
    async def __call__(self, request: Request, call_next):
        # Skip auth for health check endpoint
        if request.url.path == "/health":
            return await call_next(request)
            
        # Verify API keys
        if not await self.verify_api_key(request):
            raise HTTPException(
                status_code=403, 
                detail="Invalid or missing API key"
            )
        
        response = await call_next(request)
        return response
    
    async def verify_api_key(self, request: Request) -> bool:
        api_key = request.headers.get("X-API-Key")
        
        if not api_key:
            return False
            
        # Verify against known API keys
        valid_keys = [
            settings.law_enforcement_api_key,
            settings.community_api_key
        ]
        
        return api_key in valid_keys