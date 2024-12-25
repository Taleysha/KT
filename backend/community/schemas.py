from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict

class AlertBase(BaseModel):
    alert_type: str
    title: str
    description: str
    location: Dict

class AlertCreate(AlertBase):
    pass

class Alert(AlertBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
