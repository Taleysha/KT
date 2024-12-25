from sqlalchemy import Column, Integer, String, DateTime, JSON, Boolean
from database import Base

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