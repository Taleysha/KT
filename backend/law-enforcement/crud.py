from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime

def get_criminal(db: Session, criminal_id: int):
    return db.query(models.Criminal).filter(models.Criminal.id == criminal_id).first()

def create_criminal(db: Session, criminal: schemas.CriminalCreate):
    db_criminal = models.Criminal(**criminal.dict())
    db.add(db_criminal)
    db.commit()
    db.refresh(db_criminal)
    return db_criminal