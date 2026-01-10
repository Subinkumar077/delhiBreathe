from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from predict_service import AQIPredictionService
import uvicorn
import firebase_admin
from firebase_admin import credentials
import os

# --- Initialize Firebase ---
if not firebase_admin._apps:
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
        print("⚠️ WARNING: 'serviceAccountKey.json' not found. Using simulation mode.")

app = FastAPI(title="AQI Prediction API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the prediction service
service = AQIPredictionService()

@app.get("/")
def root():
    return {
        "message": "AQI Prediction API",
        "version": "2.0.0",
        "framework": "PyTorch",
        "endpoints": {
            "/predict": "Get AQI predictions (daily, weekly, monthly)",
            "/health": "Health check"
        }
    }

@app.get("/health")
def health():
    return {"status": "healthy", "model_loaded": service.predictor.model is not None}

@app.get("/predict")
def predict():
    return service.predict_all()

if __name__ == "__main__":
    print("\n" + "="*60)
    print("  🚀 Starting AQI Prediction API Server")
    print("="*60)
    print("\n📍 Server: http://localhost:8000")
    print("📍 Docs: http://localhost:8000/docs")
    print("📍 Predict: http://localhost:8000/predict\n")
    uvicorn.run(app, host="0.0.0.0", port=8000)