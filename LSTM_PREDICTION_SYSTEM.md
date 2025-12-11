# 🤖 AQI LSTM Prediction System - Complete Documentation

## 📖 Overview

This document provides complete information about the AI-powered AQI prediction system integrated into your Delhi Breathe application.

### What It Does

The system uses **Long Short-Term Memory (LSTM)** neural networks to predict Air Quality Index (AQI) values at three time scales:

- **Daily Predictions**: Next 7 days (individual daily forecasts)
- **Weekly Predictions**: Next 4 weeks (weekly averages)
- **Monthly Predictions**: Next 3 months (monthly averages)

### Technology Stack

- **Backend**: Python 3.8+, TensorFlow 2.15, Firebase Cloud Functions
- **Frontend**: React + TypeScript, Tailwind CSS
- **Database**: Firebase Realtime Database
- **ML Model**: LSTM Neural Network (3 layers, 224 total units)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface (React)                   │
│                  AQIPredictionCard Component                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS Request
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Firebase Cloud Function (Node.js)               │
│                    predictAQI Endpoint                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Spawns Python Process
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Python Prediction Service                       │
│                  predict_service.py                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Loads Model & Fetches Data
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    LSTM Model                                │
│              aqi_lstm_model.py                               │
│                                                              │
│  Input (30 timesteps) → LSTM(128) → LSTM(64) → LSTM(32)    │
│                    → Dense(16) → Output(1)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Reads Historical Data
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Firebase Realtime Database                      │
│                  Historical AQI Data                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 File Structure

```
delhibreathe/
├── functions/
│   ├── ml/
│   │   ├── aqi_lstm_model.py       # Core LSTM model class
│   │   ├── train_model.py          # Training script
│   │   ├── predict_service.py      # Prediction service
│   │   ├── requirements.txt        # Python dependencies
│   │   ├── setup.sh               # Setup script (Linux/Mac)
│   │   ├── quick_start.py         # Interactive setup
│   │   ├── README.md              # ML system docs
│   │   ├── .gitignore             # Git ignore rules
│   │   ├── serviceAccountKey.json # Firebase credentials (DO NOT COMMIT!)
│   │   └── models/
│   │       ├── aqi_lstm_model.h5  # Trained model weights
│   │       ├── aqi_scaler.pkl     # Data scaler
│   │       └── training_metrics.json # Training stats
│   └── index.js                   # Cloud Functions
├── src/
│   └── components/
│       └── home/
│           ├── AQIPredictionCard.tsx  # Prediction UI component
│           └── main.tsx               # Home page (includes card)
├── ML_SETUP_GUIDE.md              # Detailed setup guide
└── LSTM_PREDICTION_SYSTEM.md      # This file
```

---

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
cd functions/ml
python3 quick_start.py
```

This interactive script will:
1. Check Python version
2. Install dependencies
3. Verify Firebase credentials
4. Train the model
5. Test predictions

### Option 2: Manual Setup

```bash
# 1. Install dependencies
cd functions/ml
pip install -r requirements.txt

# 2. Add Firebase service account key
# Download from Firebase Console and save as serviceAccountKey.json

# 3. Train model
python train_model.py

# 4. Test predictions
python predict_service.py

# 5. Deploy Cloud Functions
cd ..
firebase deploy --only functions

# 6. Update frontend URL in AQIPredictionCard.tsx
```

---

## 🧠 Model Details

### Architecture

```python
Sequential([
    LSTM(128, return_sequences=True, input_shape=(30, 1)),
    Dropout(0.2),
    LSTM(64, return_sequences=True),
    Dropout(0.2),
    LSTM(32, return_sequences=False),
    Dropout(0.2),
    Dense(16, activation='relu'),
    Dense(1)
])
```

### Hyperparameters

| Parameter | Value |
|-----------|-------|
| Lookback Window | 30 timesteps |
| LSTM Units | 128 → 64 → 32 |
| Dropout Rate | 0.2 |
| Optimizer | Adam (lr=0.001) |
| Loss Function | MSE |
| Batch Size | 32 |
| Max Epochs | 100 |
| Early Stopping | Patience 10 |

### Training Process

1. **Data Collection**: Fetch 90 days of hourly AQI data from Firebase
2. **Preprocessing**: Normalize using MinMaxScaler (0-1 range)
3. **Sequence Creation**: Create sliding windows of 30 timesteps
4. **Train/Val Split**: 80% training, 20% validation
5. **Training**: Fit model with early stopping
6. **Evaluation**: Calculate MAE and MSE on validation set
7. **Save**: Export model (.h5) and scaler (.pkl)

### Prediction Types

#### Daily Predictions
- Forecasts next 7 days
- One prediction per day
- Includes confidence intervals

#### Weekly Predictions
- Forecasts next 4 weeks
- Average of 7 daily predictions per week
- Smooths out daily variations

#### Monthly Predictions
- Forecasts next 3 months
- Average of 30 daily predictions per month
- Shows long-term trends

---

## 🎨 Frontend Component

### AQIPredictionCard Features

```typescript
<AQIPredictionCard />
```

**Features:**
- 🎯 Three tabs: Daily, Weekly, Monthly
- 🎨 Color-coded AQI categories
- 📊 Confidence interval ranges
- 🔄 Auto-refresh every 30 minutes
- 🔁 Manual refresh button
- ⏰ Last updated timestamp
- 💡 Educational info about LSTM
- 📱 Fully responsive design
- 🎭 Matches your app's theme

### Integration

The component is already integrated in `src/components/home/main.tsx`:

```typescript
import AQIPredictionCard from './AQIPredictionCard';

// In the render:
<AQIPredictionCard />
```

It appears below the "Major Air Pollutants" section.

---

## 🔧 Configuration

### Update Cloud Function URL

In `src/components/home/AQIPredictionCard.tsx`, line 33:

```typescript
const response = await fetch('https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/predictAQI');
```

Replace with your actual Cloud Function URL after deployment.

### Firebase Database Structure

Expected structure for historical data:

```json
{
  "readings": {
    "timestamp1": {
      "aqi": 145,
      "timestamp": 1702300800000,
      "pm25": 75.5,
      "pm10": 120.3
    },
    "timestamp2": {
      "aqi": 152,
      "timestamp": 1702304400000,
      "pm25": 80.2,
      "pm10": 125.8
    }
  }
}
```

---

## 📊 API Reference

### Prediction Endpoint

**URL**: `https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/predictAQI`

**Method**: GET

**Response**:
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

### Training Endpoint

**URL**: `https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/trainModel`

**Method**: POST

**Response**:
```json
{
  "success": true,
  "message": "Model trained successfully",
  "output": "Training logs..."
}
```

---

## 🎯 AQI Categories

| AQI Range | Category | Color | Health Impact |
|-----------|----------|-------|---------------|
| 0-50 | Good | Green (#00e400) | Air quality is satisfactory |
| 51-100 | Moderate | Yellow (#ffff00) | Acceptable for most people |
| 101-150 | Unhealthy for Sensitive Groups | Orange (#ff7e00) | Sensitive groups affected |
| 151-200 | Unhealthy | Red (#ff0000) | Everyone may experience effects |
| 201-300 | Very Unhealthy | Purple (#8f3f97) | Health alert |
| 301+ | Hazardous | Maroon (#7e0023) | Emergency conditions |

---

## 🔄 Maintenance

### Retraining Schedule

Retrain the model regularly for best accuracy:

- **Recommended**: Monthly
- **Minimum**: Quarterly
- **After**: Major air quality events or data anomalies

### Retraining Process

```bash
cd functions/ml
python train_model.py
firebase deploy --only functions
```

Or via API:
```bash
curl -X POST https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/trainModel
```

### Monitoring

Check training metrics after each training:

```bash
cat functions/ml/models/training_metrics.json
```

**Good metrics:**
- MAE < 15 (predictions within ±15 AQI)
- Validation loss ≈ Training loss (not overfitting)

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Model files not found"
**Solution**: Train the model first
```bash
cd functions/ml
python train_model.py
```

#### 2. "TensorFlow not installed"
**Solution**: Install dependencies
```bash
pip install -r requirements.txt
```

#### 3. "Service account key not found"
**Solution**: Download from Firebase Console
- Go to Project Settings → Service Accounts
- Generate New Private Key
- Save as `serviceAccountKey.json`

#### 4. "CORS error in frontend"
**Solution**: Cloud Function already has CORS enabled. Check:
- Function URL is correct
- Function is deployed
- No typos in URL

#### 5. "Predictions not loading"
**Solution**: Check:
- Browser console for errors
- Cloud Function logs in Firebase Console
- Network tab for failed requests
- Function URL in component

#### 6. "Python not found in Cloud Functions"
**Solution**: Ensure Python 3 is available in Cloud Functions environment
- Check `functions/package.json` for correct Node version
- Verify Python is installed on Cloud Functions runtime

---

## 🔐 Security

### Best Practices

1. **Never commit** `serviceAccountKey.json`
2. **Add to .gitignore**:
   ```
   functions/ml/serviceAccountKey.json
   functions/ml/models/*.h5
   functions/ml/models/*.pkl
   functions/ml/venv/
   ```
3. **Implement authentication** for trainModel endpoint
4. **Rate limit** prediction API
5. **Use Firebase Security Rules** for database access
6. **Monitor** Cloud Function usage and costs

### Firebase Security Rules

```json
{
  "rules": {
    "readings": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

---

## 📈 Performance

### Expected Performance

- **Training Time**: 10-30 minutes (depends on hardware)
- **Prediction Time**: 1-3 seconds
- **Model Size**: ~5-10 MB
- **Memory Usage**: ~500 MB during training, ~200 MB during prediction

### Optimization Tips

1. **Reduce lookback window** (30 → 20) for faster predictions
2. **Use smaller LSTM units** (128 → 64) for smaller model
3. **Implement caching** for repeated predictions
4. **Use Cloud Functions 2nd gen** for better performance

---

## 📚 Resources

### Documentation
- [TensorFlow Keras Guide](https://www.tensorflow.org/guide/keras)
- [LSTM Networks Explained](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
- [Time Series Forecasting](https://www.tensorflow.org/tutorials/structured_data/time_series)

### Research Papers
- [Long Short-Term Memory (Hochreiter & Schmidhuber, 1997)](http://www.bioinf.jku.at/publications/older/2604.pdf)
- [Air Quality Prediction using Deep Learning](https://arxiv.org/abs/1804.07891)

---

## 🎉 Success Checklist

- [ ] Python 3.8+ installed
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] Service account key downloaded and placed
- [ ] Model trained successfully
- [ ] Training metrics look good (MAE < 15)
- [ ] Cloud Functions deployed
- [ ] Function URL updated in frontend
- [ ] Predictions loading in UI
- [ ] All three tabs working (Daily/Weekly/Monthly)
- [ ] Confidence intervals displaying correctly
- [ ] Auto-refresh working (every 30 min)
- [ ] Manual refresh button working
- [ ] Component matches app theme
- [ ] Responsive on mobile devices

---

## 💡 Future Enhancements

### Potential Improvements

1. **Multi-pollutant predictions** (PM2.5, PM10, etc.)
2. **Weather integration** (temperature, humidity, wind)
3. **Ensemble models** (combine LSTM with other models)
4. **Attention mechanisms** for better long-term predictions
5. **Real-time model updates** (online learning)
6. **Explainable AI** (show what factors influence predictions)
7. **Mobile notifications** for predicted poor air quality
8. **Historical comparison** (predicted vs actual)

### Advanced Features

- **A/B testing** different model architectures
- **Hyperparameter tuning** with Keras Tuner
- **Model versioning** and rollback
- **Prediction confidence visualization**
- **Feature importance analysis**
- **Seasonal decomposition**

---

## 📞 Support

For issues or questions:

1. Check this documentation
2. Review `ML_SETUP_GUIDE.md`
3. Check Firebase Console logs
4. Review browser console errors
5. Verify all files are in correct locations

---

## 📝 License

This ML system is part of the Delhi Breathe project.

---

**Last Updated**: December 11, 2024
**Version**: 1.0.0
**Author**: AI-Powered AQI Prediction System

---

🎊 **Congratulations!** You now have a complete, production-ready AI-powered AQI prediction system!
