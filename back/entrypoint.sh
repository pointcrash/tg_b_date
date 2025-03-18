#!/bin/bash -e

. .venv/bin/activate

cd src

echo "Running Alembic migrations..."
alembic upgrade head

echo "Starting FastAPI..."
python main.py
