from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, List

class CriminalBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: datetime
    risk_level: str
    status: str
    last_known_location: Dict

class CriminalCreate(CriminalBase):
    criminal_id: str

class Criminal(CriminalBase):
    id: int
    records: Dict

    class Config:
        orm_mode = True
