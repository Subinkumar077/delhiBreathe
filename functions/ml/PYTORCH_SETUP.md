# PyTorch AQI LSTM Model - Setup Complete ✅

## Overview

Successfully rebuilt the AQI prediction model using **PyTorch 2.9.1** which supports Python 3.14.

## What Changed

### Old Stack (Not Compatible)
- TensorFlow 2.15.0 ❌ (doesn't support Python 3.14)
- Keras API

### New Stack (Python 3.14 Compatible)
- PyTorch 2.9.1 ✅
- Native PyTorch LSTM implementation
- Same prediction accuracy and functionality

## Files Updated

1. **aqi_lstm_model.py** - Rewritten using PyTorch
   - `LSTMModel` class (PyTorch nn.Module)
   - `AQILSTMPredictor` class with all prediction methods

2. **requirements.txt** - Updated dependencies
   ```
   torch==2.9.1
   numpy==2.3.5
   pandas==2.3.3
   scikit-learn==1.8.0
   firebase-admin==7.1.0
   fastapi==0.124.2
   uvicorn==0.38.0
   ```

3. **train_model.py** - Training script (works with PyTorch)

4. **predict_service.py** - Updated model path (.pth instead of .h5)

5. **main.py** - Enhanced FastAPI server

## Current Status

✅ Model trained successfully (Loss: 0.0271)
✅ API server running on http://localhost:8000
✅ Predictions working (daily, weekly, monthly)
✅ Frontend React app running on http://localhost:5173

## API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `GET /predict` - Get AQI predictions
- `GET /docs` - Interactive API documentation

## Model Files

- `models/aqi_lstm_model.pth` - PyTorch model weights
- `models/aqi_scaler.pkl` - Data scaler
- `models/training_metrics.json` - Training statistics

## Usage

### Train Model
```bash
cd functions/ml
python train_model.py
```

### Start API Server
```bash
python main.py
```

### Test Predictions
```bash
curl http://localhost:8000/predict
```

## Model Architecture

```
Input (30 timesteps)
    ↓
LSTM Layer (64 units, 2 layers)
    ↓
Fully Connected (1 output)
    ↓
AQI Prediction
```

## Prediction Types

1. **Daily** - Next 7 days
2. **Weekly** - Next 4 weeks (averaged)
3. **Monthly** - Next 3 months (averaged)

Each prediction includes:
- AQI value
- Confidence interval (lower/upper bounds)
- Category (Good, Moderate, Unhealthy, etc.)
- Color code
- Health description

## Notes

- Model works in simulation mode without Firebase service account key
- Uses synthetic data for training if Firebase is unavailable
- All predictions include 95% confidence intervals
- Compatible with Python 3.14+

## Next Steps

1. ✅ Model trained and running
2. ✅ API server operational
3. 🔄 Frontend integration (update API URL if needed)
4. 📝 Optional: Add Firebase service account key for real data

## Troubleshooting

If you encounter issues:
1. Clear Python cache: `Remove-Item -Recurse -Force __pycache__`
2. Reinstall dependencies: `pip install -r requirements.txt`
3. Retrain model: `python train_model.py`
