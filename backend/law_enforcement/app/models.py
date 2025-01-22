from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, Enum, Boolean, ARRAY
from .database import Base  # Changed from "from database import Base"
import enum

class CaseStatus(enum.Enum):
    ACTIVE = "active"
    CLOSED = "closed"
    PENDING = "pending"

class Criminal(Base):
    __tablename__ = "criminals"
    
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    date_of_birth = Column(DateTime)
    criminal_id = Column(String, unique=True)
    risk_level = Column(String)
    status = Column(String)
    last_known_location = Column(JSON)
    records = Column(JSON)

class Case(Base):
    __tablename__ = "cases"
    
    id = Column(Integer, primary_key=True)
    case_number = Column(String, unique=True)
    status = Column(Enum(CaseStatus))
    details = Column(JSON)
    assigned_officers = Column(JSON)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    
 
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    is_active = Column(Boolean, default=True)
    user_type = Column(String)  # e.g., 'law_enforcement'
    permissions = Column(ARRAY(String))  # Array of permission strings
    created_at = Column(DateTime)
    last_login = Column(DateTime)
    profile = Column(JSON, nullable=True)  # Additional user metadata