from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from predict_service import AQIPredictionService
import uvicorn
import firebase_admin
from firebase_admin import credentials
import os
import json

# --- Initialize Firebase ---
if not firebase_admin._apps:
    # Try to load from environment variable (for Render deployment)
    service_account_json = os.getenv('FIREBASE_SERVICE_ACCOUNT')
    database_url = os.getenv('FIREBASE_DATABASE_URL', 'https://delhibreathe-default-rtdb.firebaseio.com')
    
    if service_account_json:
        try:
            # Parse JSON from environment variable
            service_account_info = json.loads(service_account_json)
            cred = credentials.Certificate(service_account_info)
            firebase_admin.initialize_app(cred, {
                'databaseURL': database_url
            })
            print("✅ Firebase initialized successfully from environment")
        except Exception as e:
            print(f"❌ Error initializing Firebase from environment: {e}")
    elif os.path.exists('serviceAccountKey.json'):
        try:
            cred = credentials.Certificate('serviceAccountKey.json')
            firebase_admin.initialize_app(cred, {
                'databaseURL': database_url
            })
            print("✅ Firebase initialized successfully from file")
        except Exception as e:
            print(f"❌ Error initializing Firebase: {e}")
    else:
        print("⚠️  WARNING: No Firebase credentials found. Database connections will fail.")

app = FastAPI()

# Allow CORS for production and development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend URL in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the service (this loads the created model)
service = AQIPredictionService()

@app.get("/predict")
def predict():
    return service.predict_all()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)