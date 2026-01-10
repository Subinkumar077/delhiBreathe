#!/usr/bin/env python3
"""
Quick test script for the PyTorch AQI model
"""

import numpy as np
from aqi_lstm_model import AQILSTMPredictor

def test_model():
    print("\n" + "="*60)
    print("  Testing PyTorch AQI LSTM Model")
    print("="*60 + "\n")
    
    # Create predictor
    print("1️⃣ Creating predictor...")
    predictor = AQILSTMPredictor(lookback=30)
    print("✅ Predictor created\n")
    
    # Generate sample data
    print("2️⃣ Generating sample training data...")
    sample_data = np.random.uniform(50, 200, 200)
    print(f"✅ Generated {len(sample_data)} data points\n")
    
    # Train model
    print("3️⃣ Training model (quick test with 10 epochs)...")
    predictor.train(sample_data, epochs=10, batch_size=16)
    print("✅ Training completed\n")
    
    # Make predictions
    print("4️⃣ Making predictions...")
    recent_data = sample_data[-30:]
    
    daily = predictor.predict_daily(recent_data, days=7)
    print(f"✅ Daily predictions (7 days): {daily[:3]}... (showing first 3)")
    
    weekly = predictor.predict_weekly(recent_data, weeks=4)
    print(f"✅ Weekly predictions (4 weeks): {weekly}")
    
    monthly = predictor.predict_monthly(recent_data, months=3)
    print(f"✅ Monthly predictions (3 months): {monthly}\n")
    
    # Test confidence intervals
    print("5️⃣ Calculating confidence intervals...")
    confidence = predictor.get_prediction_confidence(daily)
    print(f"✅ Sample confidence: {confidence[0]}\n")
    
    # Save and load test
    print("6️⃣ Testing save/load...")
    predictor.save_model()
    
    new_predictor = AQILSTMPredictor(lookback=30)
    new_predictor.load_model()
    print("✅ Model saved and loaded successfully\n")
    
    print("="*60)
    print("  ✅ All Tests Passed!")
    print("="*60 + "\n")
    print("🎯 Model is ready to use!")
    print("📝 Next: Run 'python train_model.py' with real data")
    print("🚀 Then: Run 'python main.py' to start the API\n")

if __name__ == '__main__':
    try:
        test_model()
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
