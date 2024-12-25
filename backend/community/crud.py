from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime

def create_alert(db: Session, alert: schemas.AlertCreate):
    db_alert = models.Alert(
        **alert.dict(),
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

def get_active_alerts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Alert).filter(models.Alert.is_active == True)\
             .offset(skip).limit(limit).all()
