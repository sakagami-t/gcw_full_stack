import logging
import os
import time
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database connection details
DB_HOST = os.getenv("DB_HOST", "db")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_USER = os.getenv("POSTGRES_USER", "postgres")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
DB_NAME = os.getenv("POSTGRES_DB", "postgres")

def wait_for_db():
    """Wait for the database to be available."""
    db_url = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    logger.info(f"Waiting for database at {DB_HOST}:{DB_PORT}...")
    
    engine = create_engine(db_url)
    max_retries = 30
    retry_interval = 2  # seconds
    
    for i in range(max_retries):
        try:
            with engine.connect() as conn:
                logger.info("Database is available!")
                return
        except OperationalError:
            if i < max_retries - 1:
                logger.info(f"Database not available yet, retrying in {retry_interval} seconds...")
                time.sleep(retry_interval)
            else:
                logger.error("Could not connect to the database after multiple attempts.")
                raise

def init_db():
    """Initialize the database."""
    # Wait for the database to be available
    wait_for_db()
    
    # Run Alembic migrations
    logger.info("Running database migrations...")
    os.system("alembic upgrade head")
    logger.info("Database initialization completed successfully!")

if __name__ == "__main__":
    init_db()