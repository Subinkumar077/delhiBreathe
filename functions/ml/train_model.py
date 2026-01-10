#!/usr/bin/env python3
"""
Train AQI LSTM Model using PyTorch
"""

import numpy as np
import firebase_admin
from firebase_admin import credentials, db
import os
from aqi_lstm_model import AQILSTMPredictor
from datetime import datetime
import json

def initialize_firebase():
    """Initialize Firebase connection"""
    if not firebase_admin._apps:
        if os.path.exists('serviceAccountKey.json'):
            try:
                cred = credentials.Certificate('serviceAccountKey.json')
                firebase_admin.initialize_app(cred, {
                    'databaseURL': 'https://delhibreathe-default-rtdb.firebaseio.com'
                })
                print("✅ Firebase initialized successfully")
                return True
            except Exception as e:
                print(f"❌ Error initializing Firebase: {e}")
                return False
        else:
            print("⚠️ WARNING: 'serviceAccountKey.json' not found.")
            return False
    return True

def fetch_historical_data():
    """Fetch historical AQI data from Firebase"""
    try:
        ref = db.reference('/')
        data = ref.get()
        
        if data and 'aqi' in data:
            print(f"✅ Fetched data from Firebase")
            # For now, we'll generate synthetic historical data based on current AQI
            current_aqi = float(data['aqi'])
            return generate_synthetic_data(current_aqi, points=500)
        else:
            print("⚠️ No AQI data in Firebase, using default synthetic data")
            return generate_synthetic_data(150, points=500)
    except Exception as e:
        print(f"⚠️ Firebase fetch failed: {e}. Using synthetic data.")
        return generate_synthetic_data(150, points=500)

def generate_synthetic_data(base_aqi=150, points=500):
    """Generate synthetic AQI data for training"""
    print(f"📊 Generating {points} synthetic data points (base AQI: {base_aqi})")
    
    # Generate realistic AQI patterns
    data = []
    current = base_aqi
    
    for i in range(points):
        # Add daily patterns
        daily_variation = 20 * np.sin(2 * np.pi * i / 24)
        
        # Add weekly patterns
        weekly_variation = 15 * np.sin(2 * np.pi * i / (24 * 7))
        
        # Add random noise
        noise = np.random.normal(0, 10)
        
        # Calculate new value
        current = current + daily_variation/10 + weekly_variation/10 + noise
        
        # Keep within realistic bounds
        current = max(20, min(400, current))
        data.append(current)
    
    return np.array(data)

def train_model():
    """Main training function"""
    print("\n" + "="*60)
    print("  AQI LSTM Model Training (PyTorch)")
    print("="*60 + "\n")
    
    # Initialize Firebase
    firebase_ok = initialize_firebase()
    
    # Fetch or generate training data
    print("\n📥 Fetching training data...")
    training_data = fetch_historical_data()
    print(f"✅ Training data ready: {len(training_data)} data points")
    
    # Create predictor
    print("\n🧠 Creating LSTM model...")
    predictor = AQILSTMPredictor(lookback=30)
    
    # Train model
    print("\n🚀 Starting training...")
    print("This may take a few minutes...\n")
    
    final_loss = predictor.train(
        training_data,
        epochs=50,
        batch_size=32,
        learning_rate=0.001
    )
    
    # Save model
    print("\n💾 Saving model...")
    predictor.save_model()
    
    # Save training metrics
    metrics = {
        'training_date': datetime.now().isoformat(),
        'data_points': len(training_data),
        'final_loss': float(final_loss),
        'lookback': 30,
        'epochs': 50,
        'framework': 'PyTorch'
    }
    
    os.makedirs('models', exist_ok=True)
    with open('models/training_metrics.json', 'w') as f:
        json.dump(metrics, f, indent=2)
    
    print("\n" + "="*60)
    print("  ✅ Training Complete!")
    print("="*60)
    print(f"\n📊 Final Loss: {final_loss:.4f}")
    print(f"📁 Model saved to: models/aqi_lstm_model.pth")
    print(f"📁 Scaler saved to: models/aqi_scaler.pkl")
    print(f"📁 Metrics saved to: models/training_metrics.json")
    print("\n🎯 Next steps:")
    print("  1. Test predictions: python predict_service.py")
    print("  2. Start API server: python main.py")
    print("\n")

if __name__ == '__main__':
    try:
        train_model()
    except KeyboardInterrupt:
        print("\n\n⚠️ Training interrupted by user")
    except Exception as e:
        print(f"\n\n❌ Training failed: {e}")
        import traceback
        traceback.print_exc()
