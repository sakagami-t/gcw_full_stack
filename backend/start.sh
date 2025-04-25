#!/bin/bash
set -e

# Run the database initialization script
python init_db.py

# Start the application
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload