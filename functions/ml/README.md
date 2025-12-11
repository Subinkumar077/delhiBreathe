# AQI LSTM Prediction System

This directory contains the machine learning system for predicting Air Quality Index (AQI) using LSTM neural networks.

## 🧠 Overview

The system uses Long Short-Term Memory (LSTM) neural networks to predict AQI values at three different time scales:
- **Daily**: Next 7 days
- **Weekly**: Next 4 weeks (averaged)
- **Monthly**: Next 3 months (averaged)

## 📁 Files

- `aqi_lstm_model.py` - Core LSTM model implementation
- `train_model.py` - Training script to train the model on historical data
- `predict_service.py` - Prediction service that generates forecasts
- `requirements.txt` - Python dependencies
- `models/` - Directory for saved models (created automatically)

## 🚀 Setup

### 1. Install Python Dependencies

```bash
cd functions/ml
pip install -r requirements.txt
```

### 2. Get Firebase Service Account Key

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save the JSON file as `serviceAccountKey.json` in the `functions/ml/` directory

**⚠️ IMPORTANT**: Add `serviceAccountKey.json` to `.gitignore` to keep it secure!

### 3. Train the Model

```bash
python train_model.py
```

This will:
- Fetch historical AQI data from Firebase
- Train the LSTM model (may take 10-30 minutes)
- Save the trained model to `models/aqi_lstm_model.h5`
- Save the scaler to `models/aqi_scaler.pkl`
- Save training metrics to `models/training_metrics.json`

### 4. Test Predictions

```bash
python predict_service.py
```

This will generate sample predictions and output them as JSON.

## 🔧 Model Architecture

```
Input Layer (30 timesteps)
    ↓
LSTM Layer (128 units) + Dropout (0.2)
    ↓
LSTM Layer (64 units) + Dropout (0.2)
    ↓
LSTM Layer (32 units) + Dropout (0.2)
    ↓
Dense Layer (16 units, ReLU)
    ↓
Output Layer (1 unit)
```

**Key Features:**
- Lookback window: 30 time steps
- Optimizer: Adam (learning rate: 0.001)
- Loss function: Mean Squared Error (MSE)
- Metrics: Mean Absolute Error (MAE)
- Early stopping with patience of 10 epochs
- Model checkpointing to save best weights

## 📊 Training Data

The model requires historical AQI data with timestamps. The training script:
1. Fetches data from Firebase Realtime Database
2. Generates synthetic data if insufficient historical data exists
3. Normalizes data using MinMaxScaler
4. Creates sequences for LSTM training
5. Splits data into training (80%) and validation (20%)

## 🎯 Prediction Confidence

Each prediction includes:
- **Prediction value**: The forecasted AQI
- **Lower bound**: 95% confidence interval lower limit
- **Upper bound**: 95% confidence interval upper limit

## 🔄 Retraining

Retrain the model periodically (recommended: monthly) to improve accuracy:

```bash
python train_model.py
```

Or trigger via Firebase Cloud Function:
```
POST https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/trainModel
```

## 📈 Model Performance

After training, check `models/training_metrics.json` for:
- Final training loss
- Final validation loss
- Mean Absolute Error (MAE)
- Training date and data points used

## 🐛 Troubleshooting

### "Model files not found"
- Run `python train_model.py` first to train and save the model

### "Insufficient data for training"
- Ensure Firebase has at least 100 historical data points
- The script will generate synthetic data if needed

### "TensorFlow not found"
- Install TensorFlow: `pip install tensorflow==2.15.0`

### "Firebase permission denied"
- Check that `serviceAccountKey.json` is valid
- Verify Firebase database rules allow read/write access

## 🔐 Security Notes

1. **Never commit** `serviceAccountKey.json` to version control
2. Add to `.gitignore`:
   ```
   functions/ml/serviceAccountKey.json
   functions/ml/models/*.h5
   functions/ml/models/*.pkl
   ```
3. Use Firebase Security Rules to restrict access to prediction endpoints

## 📝 API Response Format

```json
{
  "success": true,
  "timestamp": "2024-12-11T10:30:00Z",
  "predictions": {
    "daily": [
      {
        "date": "2024-12-12",
        "day": "Thursday",
        "aqi": 145.3,
        "confidence": {
          "prediction": 145.3,
          "lower_bound": 130.2,
          "upper_bound": 160.4
        },
        "category": "Unhealthy for Sensitive Groups",
        "color": "#ff7e00",
        "description": "Sensitive groups may experience health effects"
      }
    ],
    "weekly": [...],
    "monthly": [...]
  }
}
```

## 🎨 Frontend Integration

The predictions are displayed in the React app via `AQIPredictionCard.tsx`:
- Fetches predictions from Cloud Function
- Displays in tabbed interface (Daily/Weekly/Monthly)
- Auto-refreshes every 30 minutes
- Shows confidence intervals and AQI categories

## 📚 Further Reading

- [LSTM Networks](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)
- [TensorFlow Keras Guide](https://www.tensorflow.org/guide/keras)
- [Time Series Forecasting](https://www.tensorflow.org/tutorials/structured_data/time_series)
