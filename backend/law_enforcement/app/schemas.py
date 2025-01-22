from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Dict, List

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# User schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr
    user_type: str = "law_enforcement"
    permissions: List[str] = []
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    last_login: Optional[datetime] = None
    profile: Optional[dict] = None

    class Config:
        orm_mode = True

# Criminal schemas
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

# Alert schemas
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

# Case schemas
class CaseBase(BaseModel):
    case_id: str
    description: str
    status: str
    assigned_officer: Optional[str] = None
    priority: Optional[str] = "low"

class CaseCreate(CaseBase):
    pass

class Case(CaseBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True