# Dockerfile (shared for all services)
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the container
COPY ./requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire codebase into the container
COPY . .

# Set environment variable to allow reading from .env file
ENV PYTHONUNBUFFERED=1

# Default command to run, can be overridden per service
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
