from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm
from .schemas import Case  # Relative import


from . import crud, models, schemas, auth
from .database import SessionLocal, engine
from .auth import (
    get_current_active_user,
    check_permissions,
    log_auth_event,
    create_access_token,
    authenticate_user
)

# Add the print statement here to check if the import is working fine
print("Debugging: Starting app import...")

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Law Enforcement API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Authentication endpoints
@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    log_auth_event(db, user.id, "login", f"User login: {user.username}")
    return {"access_token": access_token, "token_type": "bearer"}

# User management endpoints
@app.post("/users/", response_model=schemas.User)
async def create_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_permissions(["admin"]))
):
    return crud.create_user(db=db, user=user)

@app.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(get_current_active_user)):
    return current_user

# Criminal record endpoints
@app.post("/criminals/", response_model=schemas.Criminal)
async def create_criminal(
    criminal: schemas.CriminalCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_permissions(["create_criminal"]))
):
    return crud.create_criminal(db=db, criminal=criminal)

@app.get("/criminals/{criminal_id}", response_model=schemas.Criminal)
async def read_criminal(
    criminal_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_permissions(["read_criminal"]))
):
    db_criminal = crud.get_criminal(db, criminal_id=criminal_id)
    if db_criminal is None:
        raise HTTPException(status_code=404, detail="Criminal not found")
    return db_criminal

# Alert endpoints
@app.post("/alerts/", response_model=schemas.Alert)
async def create_alert(
    alert: schemas.AlertCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_permissions(["create_alert"]))
):
    return crud.create_alert(db=db, alert=alert)

@app.get("/alerts/", response_model=List[schemas.Alert])
async def read_alerts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_permissions(["read_alert"]))
):
    alerts = crud.get_active_alerts(db, skip=skip, limit=limit)
    return alerts

# Case management endpoints
@app.post("/cases/", response_model=schemas.Case)
async def create_case(
    case: schemas.CaseCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_permissions(["create_case"]))
):
    return crud.create_case(db=db, case=case)

@app.get("/cases/{case_id}", response_model=schemas.Case)
async def read_case(
    case_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_permissions(["read_case"]))
):
    case = crud.get_case(db, case_id=case_id)
    if case is None:
        raise HTTPException(status_code=404, detail="Case not found")
    return case
