import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import api, models, database

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Todo API")

# Configure CORS
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api.router)

@app.get("/")  
async def root():
    return {"message": "Welcome to the Todo API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}