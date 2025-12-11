# 🤖 AI-Powered AQI Prediction System

## 🎯 Overview

This system adds **AI-powered AQI predictions** to your Delhi Breathe application using **LSTM (Long Short-Term Memory)** neural networks. It predicts air quality for the next 7 days, 4 weeks, and 3 months with confidence intervals.

![System Architecture](https://img.shields.io/badge/ML-LSTM%20Neural%20Network-blue)
![Backend](https://img.shields.io/badge/Backend-Python%20%2B%20TensorFlow-green)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-cyan)
![Cloud](https://img.shields.io/badge/Cloud-Firebase%20Functions-orange)

---

## ✨ Features

### 📊 Three Prediction Types

1. **Daily Predictions** (7 days)
   - Individual daily forecasts
   - Day-by-day AQI values
   - Confidence intervals

2. **Weekly Predictions** (4 weeks)
   - Weekly averaged forecasts
   - Smoothed trends
   - Date ranges

3. **Monthly Predictions** (3 months)
   - Long-term forecasts
   - Monthly averages
   - Seasonal patterns

### 🎨 Professional UI

- ✅ Tabbed interface (Daily/Weekly/Monthly)
- ✅ Color-coded AQI categories
- ✅ Confidence interval ranges
- ✅ Auto-refresh every 30 minutes
- ✅ Manual refresh button
- ✅ Responsive design
- ✅ Matches your app theme
- ✅ Loading states and error handling

### 🧠 Advanced ML

- ✅ LSTM neural network (3 layers)
- ✅ 30-timestep lookback window
- ✅ Dropout regularization
- ✅ Early stopping
- ✅ Model checkpointing
- ✅ Confidence intervals

---

## 📁 Project Structure

```
delhibreathe-vite/
│
├── 📄 AI_PREDICTION_README.md          ← You are here
├── 📄 QUICK_START.md                   ← 5-minute setup guide
├── 📄 ML_SETUP_GUIDE.md                ← Detailed setup instructions
├── 📄 LSTM_PREDICTION_SYSTEM.md        ← Complete technical docs
│
├── functions/
│   ├── index.js                        ← Cloud Functions (updated)
│   ├── package.json
│   │
│   └── ml/                             ← ML System
│       ├── 📄 README.md                ← ML system docs
│       ├── 📄 CHECKLIST.md             ← Setup checklist
│       │
│       ├── 🐍 aqi_lstm_model.py        ← LSTM model class
│       ├── 🐍 train_model.py           ← Training script
│       ├── 🐍 predict_service.py       ← Prediction API
│       ├── 🐍 test_system.py           ← Test suite
│       ├── 🐍 quick_start.py           ← Interactive setup
│       │
│       ├── 📋 requirements.txt         ← Python dependencies
│       ├── 🔒 .gitignore               ← Security rules
│       ├── 🔧 setup.sh                 ← Setup script (Linux/Mac)
│       │
│       ├── 🔑 serviceAccountKey.json   ← ADD THIS! (from Firebase)
│       │
│       └── models/                     ← Created by training
│           ├── aqi_lstm_model.h5       ← Trained model
│           ├── aqi_scaler.pkl          ← Data scaler
│           └── training_metrics.json   ← Training stats
│
└── src/
    └── components/
        └── home/
            ├── AQIPredictionCard.tsx   ← NEW! Prediction UI
            └── main.tsx                ← Updated (includes card)
```

---

## 🚀 Quick Start

### Option 1: Super Quick (5 Steps)

```bash
# 1. Install Python dependencies
cd functions/ml
pip install -r requirements.txt

# 2. Add Firebase service account key
# Download from Firebase Console → Settings → Service Accounts
# Save as: functions/ml/serviceAccountKey.json

# 3. Train the model (10-30 minutes)
python train_model.py

# 4. Deploy Cloud Functions
cd ..
firebase deploy --only functions

# 5. Update frontend URL in src/components/home/AQIPredictionCard.tsx
```

### Option 2: Interactive Setup

```bash
cd functions/ml
python quick_start.py
```

This will guide you through the entire setup process.

### Option 3: Automated Setup (Linux/Mac)

```bash
cd functions/ml
chmod +x setup.sh
./setup.sh
```

---

## 📚 Documentation

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **QUICK_START.md** | 5-minute setup | Start here! |
| **ML_SETUP_GUIDE.md** | Detailed setup with troubleshooting | If you encounter issues |
| **LSTM_PREDICTION_SYSTEM.md** | Complete technical documentation | For understanding the system |
| **functions/ml/README.md** | ML system specifics | For ML development |
| **functions/ml/CHECKLIST.md** | Setup verification | To ensure everything works |

---

## 🎯 What Gets Added to Your App

### 1. New Component

**Location**: Below "Major Air Pollutants" section on home page

**Appearance**:
```
┌─────────────────────────────────────────────────────┐
│ 🧠 AI-Powered AQI Predictions                       │
│ LSTM Neural Network forecasting • Updated 10:30 AM  │
├─────────────────────────────────────────────────────┤
│ [Daily (7 Days)] [Weekly (4 Weeks)] [Monthly (3 Mo)]│
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ Thursday │  │  Friday  │  │ Saturday │  ...     │
│  │ Dec 12   │  │  Dec 13  │  │  Dec 14  │         │
│  │          │  │          │  │          │         │
│  │   145    │  │   152    │  │   138    │         │
│  │   AQI    │  │   AQI    │  │   AQI    │         │
│  │ Unhealthy│  │ Unhealthy│  │ Moderate │         │
│  └──────────┘  └──────────┘  └──────────┘         │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 2. Backend Services

- **Cloud Function**: `predictAQI` - Returns predictions
- **Cloud Function**: `trainModel` - Retrains model
- **Python Service**: Generates predictions using LSTM
- **Trained Model**: Stored in `functions/ml/models/`

### 3. Features

- ✅ Real-time predictions
- ✅ Confidence intervals
- ✅ Color-coded categories
- ✅ Auto-refresh (30 min)
- ✅ Manual refresh
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

---

## 🔧 Requirements

### System Requirements

- **Python**: 3.8 or higher
- **Node.js**: 18 or higher
- **npm**: 8 or higher
- **Firebase CLI**: Latest version
- **RAM**: 4GB minimum (8GB recommended for training)
- **Disk Space**: 2GB for dependencies and models

### Python Packages

```
tensorflow==2.15.0
numpy==1.24.3
pandas==2.0.3
scikit-learn==1.3.0
firebase-admin==6.2.0
```

### Firebase Services

- Realtime Database (enabled)
- Cloud Functions (enabled)
- Hosting (optional, for deployment)

---

## 🧪 Testing

### Test Everything

```bash
cd functions/ml
python test_system.py
```

Expected output:
```
✅ PASS  Imports
✅ PASS  Model Files
✅ PASS  Service Account
✅ PASS  Firebase
✅ PASS  Model Loading
✅ PASS  Predictions

Results: 6/6 tests passed
🎉 All tests passed! Your system is ready to use.
```

### Test Individual Components

```bash
# Test model training
python train_model.py

# Test predictions
python predict_service.py

# Test Cloud Function (local)
firebase emulators:start --only functions

# Test frontend
npm run dev
```

---

## 📊 Model Performance

### Architecture

```
Input (30 timesteps)
    ↓
LSTM Layer (128 units) + Dropout (0.2)
    ↓
LSTM Layer (64 units) + Dropout (0.2)
    ↓
LSTM Layer (32 units) + Dropout (0.2)
    ↓
Dense Layer (16 units, ReLU)
    ↓
Output (1 value)
```

### Expected Metrics

- **MAE**: < 15 (predictions within ±15 AQI)
- **Training Time**: 10-30 minutes
- **Prediction Time**: 1-3 seconds
- **Model Size**: 5-10 MB

### Check Metrics

```bash
cat functions/ml/models/training_metrics.json
```

---

## 🔄 Maintenance

### Retraining Schedule

- **Recommended**: Monthly
- **Minimum**: Quarterly
- **After**: Major air quality events

### How to Retrain

```bash
cd functions/ml
python train_model.py
firebase deploy --only functions
```

Or via API:
```bash
curl -X POST https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/trainModel
```

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "TensorFlow not found" | `pip install tensorflow==2.15.0` |
| "Service account key not found" | Download from Firebase Console |
| "Model files not found" | Run `python train_model.py` |
| "CORS error" | Already handled in Cloud Function |
| "Predictions not loading" | Check Cloud Function URL in component |

### Get Help

1. Check `ML_SETUP_GUIDE.md` troubleshooting section
2. Run `python test_system.py` for diagnostics
3. Check Firebase Console logs
4. Review browser console errors

---

## 🔐 Security

### Critical Security Rules

1. **NEVER commit** `serviceAccountKey.json`
2. **Add to .gitignore**:
   ```
   functions/ml/serviceAccountKey.json
   functions/ml/models/*.h5
   functions/ml/models/*.pkl
   ```
3. **Use Firebase Security Rules** for database
4. **Implement authentication** for trainModel endpoint
5. **Rate limit** prediction API

### Verify Security

```bash
# Check git status (should NOT show sensitive files)
git status

# Check .gitignore
cat functions/ml/.gitignore
```

---

## 📈 API Reference

### Prediction Endpoint

```
GET https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/predictAQI
```

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

---

## 🎓 Learning Resources

### Understanding LSTM

- [LSTM Networks Explained](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)
- [TensorFlow Time Series Tutorial](https://www.tensorflow.org/tutorials/structured_data/time_series)

### Air Quality

- [AQI Basics](https://www.airnow.gov/aqi/aqi-basics/)
- [Health Effects of Air Pollution](https://www.who.int/health-topics/air-pollution)

### Firebase

- [Cloud Functions Guide](https://firebase.google.com/docs/functions)
- [Realtime Database Guide](https://firebase.google.com/docs/database)

---

## 🎉 Success Checklist

- [ ] Python dependencies installed
- [ ] Service account key added
- [ ] Model trained successfully
- [ ] Cloud Functions deployed
- [ ] Frontend URL updated
- [ ] Predictions loading in UI
- [ ] All three tabs working
- [ ] Auto-refresh working
- [ ] No console errors
- [ ] Tests passing

**All checked?** Congratulations! 🎊 Your AI prediction system is live!

---

## 💡 Future Enhancements

### Potential Improvements

- Multi-pollutant predictions (PM2.5, PM10, etc.)
- Weather integration (temperature, humidity, wind)
- Ensemble models (combine multiple models)
- Attention mechanisms for better accuracy
- Real-time model updates (online learning)
- Explainable AI (show prediction factors)
- Mobile notifications for poor air quality
- Historical comparison (predicted vs actual)

---

## 📞 Support

### Need Help?

1. **Quick issues**: Check `QUICK_START.md`
2. **Setup problems**: See `ML_SETUP_GUIDE.md`
3. **Technical details**: Read `LSTM_PREDICTION_SYSTEM.md`
4. **Verification**: Use `functions/ml/CHECKLIST.md`
5. **Testing**: Run `python test_system.py`

---

## 📝 Version Info

- **Version**: 1.0.0
- **Last Updated**: December 11, 2024
- **Python**: 3.8+
- **TensorFlow**: 2.15.0
- **Node.js**: 18+
- **Firebase**: Latest

---

## 🙏 Credits

Built with:
- TensorFlow & Keras
- Firebase Cloud Functions
- React & TypeScript
- Tailwind CSS

---

## 📄 License

Part of the Delhi Breathe project.

---

**🎊 Congratulations on adding AI-powered predictions to your air quality monitoring system!**

For detailed instructions, start with `QUICK_START.md` 🚀
