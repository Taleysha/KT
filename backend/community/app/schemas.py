from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Dict, List

class CommunityUserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True

class CommunityUserCreate(CommunityUserBase):
    password: str

class CommunityUser(CommunityUserBase):
    id: int

    class Config:
        orm_mode = True

# Alert Schemas
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
        from_attributes = True

class PublicAlert(BaseModel):
    id: int
    alert_type: str
    title: str
    description: str
    location: Dict
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Safe Haven Schemas
class SafeHavenBase(BaseModel):
    name: str
    description: str
    location: Dict
    contact_info: Dict

class SafeHavenCreate(SafeHavenBase):
    pass

class SafeHaven(SafeHavenBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Community Resources Schemas
class CommunityResourceBase(BaseModel):
    name: str
    description: str
    resource_type: str
    contact_info: Dict
    location: Dict

class CommunityResourceCreate(CommunityResourceBase):
    pass

class CommunityResource(CommunityResourceBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Emergency Contacts Schemas
class EmergencyContactBase(BaseModel):
    name: str
    contact_type: str
    contact_info: Dict
    location: Dict

class EmergencyContactCreate(EmergencyContactBase):
    pass

class EmergencyContact(EmergencyContactBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Safety Tips Schemas
class SafetyTipBase(BaseModel):
    title: str
    description: str
    category: str

class SafetyTipCreate(SafetyTipBase):
    pass

class SafetyTip(SafetyTipBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None