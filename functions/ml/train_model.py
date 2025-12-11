import firebase_admin
from firebase_admin import credentials, db
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from aqi_lstm_model import AQILSTMPredictor
import json

# Initialize Firebase Admin
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://delhibreathe-default-rtdb.firebaseio.com'
})

def fetch_historical_data(days=90):
    """Fetch historical AQI data from Firebase"""
    print(f"Fetching {days} days of historical data...")
    
    ref = db.reference('/')
    data = ref.get()
    
    if not data:
        print("No data found in Firebase")
        return None
    
    # Extract AQI values with timestamps
    aqi_data = []
    
    # Assuming data structure has aqi field
    if 'aqi' in data:
        aqi_value = data['aqi']
        timestamp = datetime.now()
        aqi_data.append({'timestamp': timestamp, 'aqi': aqi_value})
    
    # If you have historical data stored differently, adjust this
    # For now, we'll generate synthetic historical data for demonstration
    print("Generating synthetic historical data for training...")
    
    base_aqi = data.get('aqi', 150)
    current_time = datetime.now()
    
    for i in range(days * 24):  # Hourly data for N days
        timestamp = current_time - timedelta(hours=i)
        # Simulate realistic AQI variations
        noise = np.random.normal(0, 15)
        seasonal = 20 * np.sin(2 * np.pi * i / (24 * 7))  # Weekly pattern
        daily = 10 * np.sin(2 * np.pi * i / 24)  # Daily pattern
        trend = -0.1 * i  # Slight downward trend
        
        aqi = max(0, base_aqi + noise + seasonal + daily + trend)
        aqi_data.append({'timestamp': timestamp, 'aqi': aqi})
    
    df = pd.DataFrame(aqi_data)
    df = df.sort_values('timestamp')
    
    print(f"Collected {len(df)} data points")
    return df

def train_and_save_model():
    """Train LSTM model and save it"""
    print("Starting model training...")
    
    # Fetch data
    historical_data = fetch_historical_data(days=90)
    
    if historical_data is None or len(historical_data) < 100:
        print("Insufficient data for training")
        return False
    
    # Initialize predictor
    predictor = AQILSTMPredictor(lookback=30)
    
    # Train model
    print("Training LSTM model...")
    history = predictor.train(
        historical_data,
        epochs=50,
        batch_size=32,
        validation_split=0.2
    )
    
    # Save model
    print("Saving model...")
    predictor.save_model(
        model_path='models/aqi_lstm_model.h5',
        scaler_path='models/aqi_scaler.pkl'
    )
    
    # Test predictions
    print("\nTesting predictions...")
    recent_data = historical_data['aqi'].values[-30:]
    
    daily_pred = predictor.predict_daily(recent_data, days=7)
    weekly_pred = predictor.predict_weekly(recent_data, weeks=4)
    monthly_pred = predictor.predict_monthly(recent_data, months=3)
    
    print(f"\nNext 7 days predictions: {daily_pred}")
    print(f"Next 4 weeks predictions: {weekly_pred}")
    print(f"Next 3 months predictions: {monthly_pred}")
    
    # Save training metrics
    metrics = {
        'training_date': datetime.now().isoformat(),
        'data_points': len(historical_data),
        'final_loss': float(history.history['loss'][-1]),
        'final_val_loss': float(history.history['val_loss'][-1]),
        'final_mae': float(history.history['mae'][-1]),
        'final_val_mae': float(history.history['val_mae'][-1])
    }
    
    with open('models/training_metrics.json', 'w') as f:
        json.dump(metrics, f, indent=2)
    
    print("\nModel training completed successfully!")
    return True

if __name__ == '__main__':
    import os
    os.makedirs('models', exist_ok=True)
    train_and_save_model()
