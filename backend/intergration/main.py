from fastapi import FastAPI
from .middleware import SecurityMiddleware
from .services import DataSyncService

app = FastAPI()
app.add_middleware(SecurityMiddleware)
sync_service = DataSyncService()

@app.post("/sync/alert")
async def sync_alert(alert_data: dict):
    await sync_service.sync_alert(alert_data)
    return {"status": "success"}