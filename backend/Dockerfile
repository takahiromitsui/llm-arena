FROM python:3.11-slim
WORKDIR /app

# Install the application dependencies
COPY ./fastapi_backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy in the source code
COPY . .

# Expose the port
EXPOSE 8000

CMD ["uvicorn", "fastapi_backend.main:app", "--host", "0.0.0.0", "--port", "8000"]