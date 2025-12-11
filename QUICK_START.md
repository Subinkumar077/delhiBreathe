# 🚀 Quick Start - AQI LSTM Prediction System

Get your AI-powered AQI prediction system up and running in minutes!

## ⚡ Super Quick Start (5 Steps)

### 1️⃣ Install Python Dependencies

```bash
cd functions/ml
pip install -r requirements.txt
```

### 2️⃣ Add Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select **delhibreathe** project
3. Settings ⚙️ → **Service Accounts** → **Generate New Private Key**
4. Save as `functions/ml/serviceAccountKey.json`

### 3️⃣ Train the Model

```bash
python train_model.py
```

⏱️ Takes 10-30 minutes. Grab a coffee! ☕

### 4️⃣ Deploy to Firebase

```bash
cd ..
firebase deploy --only functions
```

Copy the `predictAQI` function URL from the output.

### 5️⃣ Update Frontend

Edit `src/components/home/AQIPredictionCard.tsx` line 33:

```typescript
const response = await fetch('YOUR_CLOUD_FUNCTION_URL_HERE');
```

## ✅ Verify It Works

```bash
cd functions/ml
python test_system.py
```

Should show: **🎉 All tests passed!**

## 🎨 See It In Action

```bash
npm run dev
```

Navigate to home page and scroll to **"AI-Powered AQI Predictions"** card.

---

## 📁 What You Get

✅ **Daily Predictions** - Next 7 days  
✅ **Weekly Predictions** - Next 4 weeks  
✅ **Monthly Predictions** - Next 3 months  
✅ **Professional UI** - Matches your theme  
✅ **Auto-refresh** - Every 30 minutes  
✅ **Confidence Intervals** - Upper/lower bounds  

---

## 🆘 Need Help?

### Quick Fixes

**"TensorFlow not found"**
```bash
pip install tensorflow==2.15.0
```

**"Service account key not found"**
- Download from Firebase Console (see step 2)
- Save as `serviceAccountKey.json` in `functions/ml/`

**"Model files not found"**
```bash
python train_model.py
```

**"Predictions not loading"**
- Check Cloud Function URL in `AQIPredictionCard.tsx`
- Verify function is deployed: `firebase functions:list`

---

## 📚 Full Documentation

- **Detailed Setup**: See `ML_SETUP_GUIDE.md`
- **Complete Docs**: See `LSTM_PREDICTION_SYSTEM.md`
- **ML System**: See `functions/ml/README.md`

---

## 🎯 File Locations

```
functions/ml/
├── aqi_lstm_model.py          # LSTM model
├── train_model.py             # Training script
├── predict_service.py         # Prediction API
├── test_system.py             # Test suite
├── quick_start.py             # Interactive setup
├── requirements.txt           # Dependencies
├── serviceAccountKey.json     # Your Firebase key (add this!)
└── models/
    ├── aqi_lstm_model.h5      # Trained model (created by training)
    └── aqi_scaler.pkl         # Data scaler (created by training)

src/components/home/
└── AQIPredictionCard.tsx      # UI component
```

---

## 🔐 Security Reminder

**Never commit these files:**
- `serviceAccountKey.json`
- `models/*.h5`
- `models/*.pkl`

They're already in `.gitignore` ✅

---

## 🎉 That's It!

You now have a complete AI-powered AQI prediction system!

**Questions?** Check the full documentation files.

**Working?** Enjoy your ML-powered air quality forecasts! 🌟
