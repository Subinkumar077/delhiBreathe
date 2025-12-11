#!/usr/bin/env python3
"""
Quick Start Script for AQI LSTM Prediction System
This script checks prerequisites and guides you through setup
"""

import os
import sys
import subprocess
import json

def print_header(text):
    print("\n" + "="*60)
    print(f"  {text}")
    print("="*60 + "\n")

def print_success(text):
    print(f"✅ {text}")

def print_error(text):
    print(f"❌ {text}")

def print_warning(text):
    print(f"⚠️  {text}")

def print_info(text):
    print(f"ℹ️  {text}")

def check_python_version():
    """Check if Python version is 3.8+"""
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print_success(f"Python {version.major}.{version.minor}.{version.micro} detected")
        return True
    else:
        print_error(f"Python 3.8+ required, found {version.major}.{version.minor}.{version.micro}")
        return False

def check_dependencies():
    """Check if required packages are installed"""
    required = ['tensorflow', 'numpy', 'pandas', 'sklearn', 'firebase_admin']
    missing = []
    
    for package in required:
        try:
            __import__(package)
            print_success(f"{package} installed")
        except ImportError:
            missing.append(package)
            print_error(f"{package} not installed")
    
    return len(missing) == 0, missing

def check_service_account():
    """Check if service account key exists"""
    if os.path.exists('serviceAccountKey.json'):
        print_success("Service account key found")
        return True
    else:
        print_error("Service account key not found")
        print_info("Download from Firebase Console → Project Settings → Service Accounts")
        print_info("Save as: functions/ml/serviceAccountKey.json")
        return False

def check_models_directory():
    """Check if models directory exists"""
    if os.path.exists('models'):
        print_success("Models directory exists")
        
        # Check for model files
        has_model = os.path.exists('models/aqi_lstm_model.h5')
        has_scaler = os.path.exists('models/aqi_scaler.pkl')
        
        if has_model and has_scaler:
            print_success("Trained model found")
            return True, True
        else:
            print_warning("Model not trained yet")
            return True, False
    else:
        print_warning("Models directory not found")
        return False, False

def install_dependencies():
    """Install Python dependencies"""
    print_info("Installing dependencies from requirements.txt...")
    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
        print_success("Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError:
        print_error("Failed to install dependencies")
        return False

def create_models_directory():
    """Create models directory"""
    try:
        os.makedirs('models', exist_ok=True)
        print_success("Models directory created")
        return True
    except Exception as e:
        print_error(f"Failed to create models directory: {e}")
        return False

def train_model():
    """Train the LSTM model"""
    print_info("Starting model training (this may take 10-30 minutes)...")
    try:
        subprocess.check_call([sys.executable, 'train_model.py'])
        print_success("Model trained successfully!")
        return True
    except subprocess.CalledProcessError:
        print_error("Model training failed")
        return False

def test_predictions():
    """Test the prediction service"""
    print_info("Testing prediction service...")
    try:
        result = subprocess.run([sys.executable, 'predict_service.py'], 
                              capture_output=True, text=True, timeout=30)
        if result.returncode == 0:
            print_success("Prediction service working!")
            print_info("Sample output:")
            print(result.stdout[:500] + "..." if len(result.stdout) > 500 else result.stdout)
            return True
        else:
            print_error("Prediction service failed")
            print(result.stderr)
            return False
    except subprocess.TimeoutExpired:
        print_error("Prediction service timed out")
        return False
    except Exception as e:
        print_error(f"Error testing predictions: {e}")
        return False

def main():
    print_header("AQI LSTM Prediction System - Quick Start")
    
    # Step 1: Check Python version
    print_header("Step 1: Checking Python Version")
    if not check_python_version():
        print_error("Please install Python 3.8 or higher")
        sys.exit(1)
    
    # Step 2: Check dependencies
    print_header("Step 2: Checking Dependencies")
    deps_ok, missing = check_dependencies()
    
    if not deps_ok:
        print_warning(f"Missing packages: {', '.join(missing)}")
        response = input("\nInstall missing dependencies? (y/n): ")
        if response.lower() == 'y':
            if not install_dependencies():
                sys.exit(1)
        else:
            print_error("Cannot proceed without dependencies")
            sys.exit(1)
    
    # Step 3: Check service account
    print_header("Step 3: Checking Firebase Service Account")
    if not check_service_account():
        print_warning("Setup cannot continue without service account key")
        print_info("\nSteps to get service account key:")
        print_info("1. Go to https://console.firebase.google.com/")
        print_info("2. Select your project")
        print_info("3. Click Settings (gear icon) → Project Settings")
        print_info("4. Go to Service Accounts tab")
        print_info("5. Click 'Generate New Private Key'")
        print_info("6. Save as: functions/ml/serviceAccountKey.json")
        input("\nPress Enter once you've added the key...")
        
        if not check_service_account():
            print_error("Service account key still not found")
            sys.exit(1)
    
    # Step 4: Check models directory
    print_header("Step 4: Checking Models Directory")
    dir_exists, model_exists = check_models_directory()
    
    if not dir_exists:
        if not create_models_directory():
            sys.exit(1)
    
    # Step 5: Train model if needed
    if not model_exists:
        print_header("Step 5: Training LSTM Model")
        print_warning("No trained model found. Training is required.")
        response = input("\nTrain model now? This will take 10-30 minutes (y/n): ")
        if response.lower() == 'y':
            if not train_model():
                sys.exit(1)
        else:
            print_warning("Model training skipped. You'll need to train before making predictions.")
    else:
        print_header("Step 5: Model Status")
        print_success("Trained model already exists")
    
    # Step 6: Test predictions
    if model_exists or response.lower() == 'y':
        print_header("Step 6: Testing Predictions")
        test_predictions()
    
    # Final summary
    print_header("Setup Complete! 🎉")
    print_success("Your AQI LSTM prediction system is ready!")
    print("\n📋 Next Steps:")
    print("1. Deploy Cloud Functions:")
    print("   cd ..")
    print("   firebase deploy --only functions")
    print("\n2. Update frontend with Cloud Function URL")
    print("   Edit: src/components/home/AQIPredictionCard.tsx")
    print("   Update the fetch URL with your Cloud Function endpoint")
    print("\n3. Test the complete system:")
    print("   npm run dev")
    print("\n📚 For detailed instructions, see ML_SETUP_GUIDE.md")
    print("\n🔄 To retrain the model later:")
    print("   python train_model.py")

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Setup interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Unexpected error: {e}")
        sys.exit(1)
