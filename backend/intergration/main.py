from fastapi import FastAPI, Depends, HTTPException
from .auth import get_current_active_user, check_permissions
from .rate_limiter import rate_limiter

@app.post("/alerts/")
async def create_alert(
    alert: schemas.AlertCreate,
    current_user = Depends(get_current_active_user),
    _: None = Depends(rate_limiter)
):
    # Create alert and trigger sync
    db_alert = crud.create_alert(db, alert)
    await integration_service.sync_alert(db_alert)
    return db_alert