from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from predict_service import AQIPredictionService
import uvicorn
import firebase_admin
from firebase_admin import credentials
import os

# --- FIX: Initialize Firebase ---
if not firebase_admin._apps:
    # Check if the key exists to avoid a crash at startup
    if os.path.exists('serviceAccountKey.json'):
        try:
            cred = credentials.Certificate('serviceAccountKey.json')
            firebase_admin.initialize_app(cred, {
                'databaseURL': 'https://delhibreathe-default-rtdb.firebaseio.com'
            })
            print("✅ Firebase initialized successfully")
        except Exception as e:
            print(f"❌ Error initializing Firebase: {e}")
    else:
        print("⚠️  WARNING: 'serviceAccountKey.json' not found. Database connections will fail.")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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