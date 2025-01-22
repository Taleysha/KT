from sqlalchemy import Column, Integer, String, DateTime, JSON, Boolean, ARRAY
from .database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    is_active = Column(Boolean, default=True)
    user_type = Column(String)  
    permissions = Column(ARRAY(String))  # Array of permission strings
    created_at = Column(DateTime)
    last_login = Column(DateTime)
    profile = Column(JSON, nullable=True)  # Additional user metadata


class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True)
    alert_type = Column(String)
    title = Column(String)
    description = Column(String)
    location = Column(JSON)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

class SafeHaven(Base):
    __tablename__ = "safe_havens"
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    address = Column(String)
    contact_info = Column(JSON)
    status = Column(String)
    operating_hours = Column(JSON)


class CommunityResource(Base):
    __tablename__ = "community_resources"
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    category = Column(String)  # e.g., "emergency", "support", "education"
    contact_info = Column(JSON)
    url = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)

class EmergencyContact(Base):
    __tablename__ = "emergency_contacts"
    
    id = Column(Integer, primary_key=True)
    service_name = Column(String)
    phone_number = Column(String)
    description = Column(String)
    service_area = Column(JSON)  # Geographic coverage
    available_24_7 = Column(Boolean)

class SafetyTip(Base):
    __tablename__ = "safety_tips"
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    content = Column(String)
    category = Column(String)  # e.g., "personal_safety", "home_security"
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    priority_level = Column(Integer)

    