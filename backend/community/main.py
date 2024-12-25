from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm

from . import crud, models, schemas, auth
from .database import SessionLocal, engine
from .auth import (
    get_current_active_community_user,
    rate_limiter,
    create_community_token,
    authenticate_community_user
)

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Community Portal API")

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
@app.post("/community/token", response_model=schemas.Token)
async def login_for_community_access(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    await rate_limiter.check_rate_limit(request)
    user = authenticate_community_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_community_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Public alert endpoints
@app.get("/public/alerts/", response_model=List[schemas.PublicAlert])
async def read_public_alerts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return crud.get_public_alerts(db, skip=skip, limit=limit)

# Safe haven endpoints
@app.get("/safe-havens/", response_model=List[schemas.SafeHaven])
async def read_safe_havens(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return crud.get_safe_havens(db, skip=skip, limit=limit)

# Community user endpoints
@app.post("/community/users/", response_model=schemas.CommunityUser)
async def create_community_user(
    user: schemas.CommunityUserCreate,
    db: Session = Depends(get_db)
):
    return crud.create_community_user(db=db, user=user)

@app.get("/community/users/me", response_model=schemas.CommunityUser)
async def read_community_user_me(
    current_user: models.User = Depends(get_current_active_community_user)
):
    return current_user