#!/usr/bin/env python3
"""
Test script to verify the AQI LSTM prediction system
Run this after setup to ensure everything works correctly
"""

import os
import sys
import json
from datetime import datetime

def test_imports():
    """Test if all required packages can be imported"""
    print("Testing imports...")
    try:
        import tensorflow as tf
        print(f"  ✅ TensorFlow {tf.__version__}")
        
        import numpy as np
        print(f"  ✅ NumPy {np.__version__}")
        
        import pandas as pd
        print(f"  ✅ Pandas {pd.__version__}")
        
        import sklearn
        print(f"  ✅ scikit-learn {sklearn.__version__}")
        
        import firebase_admin
        print(f"  ✅ Firebase Admin SDK")
        
        return True
    except ImportError as e:
        print(f"  ❌ Import error: {e}")
        return False

def test_model_files():
    """Test if model files exist"""
    print("\nTesting model files...")
    
    model_path = 'models/aqi_lstm_model.h5'
    scaler_path = 'models/aqi_scaler.pkl'
    metrics_path = 'models/training_metrics.json'
    
    all_exist = True
    
    if os.path.exists(model_path):
        size = os.path.getsize(model_path) / (1024 * 1024)  # MB
        print(f"  ✅ Model file found ({size:.2f} MB)")
    else:
        print(f"  ❌ Model file not found: {model_path}")
        all_exist = False
    
    if os.path.exists(scaler_path):
        size = os.path.getsize(scaler_path) / 1024  # KB
        print(f"  ✅ Scaler file found ({size:.2f} KB)")
    else:
        print(f"  ❌ Scaler file not found: {scaler_path}")
        all_exist = False
    
    if os.path.exists(metrics_path):
        with open(metrics_path, 'r') as f:
            metrics = json.load(f)
        print(f"  ✅ Metrics file found")
        print(f"     Training date: {metrics.get('training_date', 'N/A')}")
        print(f"     Data points: {metrics.get('data_points', 'N/A')}")
        print(f"     Final MAE: {metrics.get('final_mae', 'N/A'):.2f}")
    else:
        print(f"  ⚠️  Metrics file not found (optional)")
    
    return all_exist

def test_model_loading():
    """Test if model can be loaded"""
    print("\nTesting model loading...")
    try:
        from aqi_lstm_model import AQILSTMPredictor
        
        predictor = AQILSTMPredictor(lookback=30)
        predictor.load_model('models/aqi_lstm_model.h5', 'models/aqi_scaler.pkl')
        
        print("  ✅ Model loaded successfully")
        return True, predictor
    except Exception as e:
        print(f"  ❌ Failed to load model: {e}")
        return False, None

def test_predictions(predictor):
    """Test if predictions can be generated"""
    print("\nTesting predictions...")
    try:
        import numpy as np
        
        # Generate sample data (30 recent AQI values)
        sample_data = np.random.uniform(100, 200, 30)
        
        # Test daily predictions
        daily = predictor.predict_daily(sample_data, days=7)
        print(f"  ✅ Daily predictions: {len(daily)} days")
        print(f"     Range: {daily.min():.1f} - {daily.max():.1f}")
        
        # Test weekly predictions
        weekly = predictor.predict_weekly(sample_data, weeks=4)
        print(f"  ✅ Weekly predictions: {len(weekly)} weeks")
        print(f"     Range: {weekly.min():.1f} - {weekly.max():.1f}")
        
        # Test monthly predictions
        monthly = predictor.predict_monthly(sample_data, months=3)
        print(f"  ✅ Monthly predictions: {len(monthly)} months")
        print(f"     Range: {monthly.min():.1f} - {monthly.max():.1f}")
        
        return True
    except Exception as e:
        print(f"  ❌ Prediction failed: {e}")
        return False

def test_service_account():
    """Test if service account key exists"""
    print("\nTesting Firebase credentials...")
    
    if os.path.exists('serviceAccountKey.json'):
        try:
            with open('serviceAccountKey.json', 'r') as f:
                creds = json.load(f)
            
            if 'project_id' in creds:
                print(f"  ✅ Service account key found")
                print(f"     Project: {creds.get('project_id', 'N/A')}")
                return True
            else:
                print("  ❌ Invalid service account key format")
                return False
        except json.JSONDecodeError:
            print("  ❌ Service account key is not valid JSON")
            return False
    else:
        print("  ❌ Service account key not found")
        print("     Download from Firebase Console → Project Settings → Service Accounts")
        return False

def test_firebase_connection():
    """Test Firebase connection"""
    print("\nTesting Firebase connection...")
    try:
        import firebase_admin
        from firebase_admin import credentials, db
        
        # Initialize Firebase (if not already initialized)
        if not firebase_admin._apps:
            cred = credentials.Certificate('serviceAccountKey.json')
            firebase_admin.initialize_app(cred, {
                'databaseURL': 'https://delhibreathe-default-rtdb.firebaseio.com'
            })
        
        # Try to read from database
        ref = db.reference('/')
        data = ref.get()
        
        if data:
            print("  ✅ Firebase connection successful")
            print(f"     Database has data: {len(data)} keys")
            return True
        else:
            print("  ⚠️  Firebase connected but database is empty")
            return True
    except Exception as e:
        print(f"  ❌ Firebase connection failed: {e}")
        return False

def run_all_tests():
    """Run all tests"""
    print("="*60)
    print("  AQI LSTM Prediction System - Test Suite")
    print("="*60)
    
    results = {}
    
    # Test 1: Imports
    results['imports'] = test_imports()
    
    # Test 2: Model files
    results['model_files'] = test_model_files()
    
    # Test 3: Service account
    results['service_account'] = test_service_account()
    
    # Test 4: Firebase connection (only if service account exists)
    if results['service_account']:
        results['firebase'] = test_firebase_connection()
    else:
        results['firebase'] = False
        print("\nSkipping Firebase connection test (no service account)")
    
    # Test 5: Model loading (only if model files exist)
    if results['model_files']:
        success, predictor = test_model_loading()
        results['model_loading'] = success
        
        # Test 6: Predictions (only if model loaded)
        if success and predictor:
            results['predictions'] = test_predictions(predictor)
        else:
            results['predictions'] = False
            print("\nSkipping prediction test (model not loaded)")
    else:
        results['model_loading'] = False
        results['predictions'] = False
        print("\nSkipping model tests (model files not found)")
    
    # Summary
    print("\n" + "="*60)
    print("  Test Summary")
    print("="*60)
    
    total = len(results)
    passed = sum(1 for v in results.values() if v)
    
    for test, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"  {status}  {test.replace('_', ' ').title()}")
    
    print("\n" + "="*60)
    print(f"  Results: {passed}/{total} tests passed")
    print("="*60)
    
    if passed == total:
        print("\n🎉 All tests passed! Your system is ready to use.")
        print("\nNext steps:")
        print("1. Deploy Cloud Functions: firebase deploy --only functions")
        print("2. Update frontend URL in AQIPredictionCard.tsx")
        print("3. Test the complete system in your app")
    else:
        print("\n⚠️  Some tests failed. Please fix the issues above.")
        print("\nCommon fixes:")
        if not results['imports']:
            print("- Install dependencies: pip install -r requirements.txt")
        if not results['model_files']:
            print("- Train the model: python train_model.py")
        if not results['service_account']:
            print("- Add serviceAccountKey.json from Firebase Console")
    
    return passed == total

if __name__ == '__main__':
    try:
        success = run_all_tests()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\n⚠️  Tests interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
