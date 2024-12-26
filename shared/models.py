# shared_models.py
from sqlalchemy import Column, Integer, String, DateTime, JSON, Boolean
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class BaseAlert:
    id = Column(Integer, primary_key=True)
    alert_type = Column(String)
    title = Column(String)
    description = Column(String)
    location = Column(JSON)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Use this as base for both law enforcement and community alerts
class LEAlert(Base, BaseAlert):
    __tablename__ = "alerts"
    investigation_details = Column(JSON)
    assigned_officers = Column(JSON)

class CommunityAlert(Base, BaseAlert):
    __tablename__ = "alerts"
    # Additional public-facing fields can be added here