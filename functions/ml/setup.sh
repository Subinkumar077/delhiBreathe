#!/bin/bash

# AQI LSTM Model Setup Script
# This script sets up the Python environment and trains the initial model

echo "🚀 Setting up AQI LSTM Prediction System..."

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check for service account key
if [ ! -f "serviceAccountKey.json" ]; then
    echo "⚠️  WARNING: serviceAccountKey.json not found!"
    echo "Please download your Firebase service account key and save it as:"
    echo "  functions/ml/serviceAccountKey.json"
    echo ""
    echo "Steps:"
    echo "1. Go to Firebase Console → Project Settings → Service Accounts"
    echo "2. Click 'Generate New Private Key'"
    echo "3. Save the JSON file as serviceAccountKey.json in this directory"
    echo ""
    read -p "Press Enter once you've added the service account key..."
fi

# Create models directory
echo "📁 Creating models directory..."
mkdir -p models

# Train the model
echo "🧠 Training LSTM model (this may take 10-30 minutes)..."
python3 train_model.py

if [ $? -eq 0 ]; then
    echo "✅ Model training completed successfully!"
    echo ""
    echo "📊 Check models/training_metrics.json for training results"
    echo ""
    echo "🎉 Setup complete! You can now:"
    echo "   1. Deploy Firebase functions: firebase deploy --only functions"
    echo "   2. Test predictions: python3 predict_service.py"
else
    echo "❌ Model training failed. Please check the error messages above."
    exit 1
fi

echo ""
echo "🔐 Security reminder:"
echo "   - Add serviceAccountKey.json to .gitignore"
echo "   - Never commit model files or credentials to version control"
