# 🤖 Complete AQI LSTM Prediction System Setup Guide

This guide will help you set up the complete machine learning system for AQI predictions using LSTM neural networks.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Python Environment Setup](#python-environment-setup)
3. [Firebase Configuration](#firebase-configuration)
4. [Model Training](#model-training)
5. [Deploy Cloud Functions](#deploy-cloud-functions)
6. [Frontend Integration](#frontend-integration)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before starting, ensure you have:

- ✅ Python 3.8 or higher installed
- ✅ Node.js 18+ and npm installed
- ✅ Firebase CLI installed (`npm install -g firebase-tools`)
- ✅ Firebase project with Realtime Database enabled
- ✅ Git installed

---

## 🐍 Python Environment Setup

### Step 1: Navigate to ML Directory

```bash
cd functions/ml
```

### Step 2: Create Virtual Environment

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

### Step 3: Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

This will install:
- TensorFlow 2.15.0
- NumPy, Pandas
- scikit-learn
- Firebase Admin SDK

---

## 🔥 Firebase Configuration

### Step 1: Get Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **delhibreathe**
3. Click the gear icon ⚙️ → **Project Settings**
4. Navigate to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Save the downloaded JSON file as `serviceAccountKey.json` in `functions/ml/`

### Step 2: Verify Firebase Config

Your Firebase config (already in your code):
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDkcNWLtPvQmrAfly7OsfptbC_lwy75id4",
  authDomain: "delhibreathe.firebaseapp.com",
  databaseURL: "https://delhibreathe-default-rtdb.firebaseio.com",
  projectId: "delhibreathe",
  storageBucket: "delhibreathe.firebasestorage.app",
  messagingSenderId: "573127193014",
  appId: "1:573127193014:web:62a385807322f934e09117",
  measurementId: "G-T8K5F3P1ZX"
};
```

### Step 3: Security - Add to .gitignore

Ensure these lines are in `functions/ml/.gitignore`:
```
serviceAccountKey.json
models/*.h5
models/*.pkl
```

---

## 🧠 Model Training

### Step 1: Create Models Directory

```bash
mkdir -p functions/ml/models
```

### Step 2: Train the Model

```bash
cd functions/ml
python train_model.py
```

**What happens during training:**
1. Connects to Firebase Realtime Database
2. Fetches historical AQI data (or generates synthetic data)
3. Preprocesses and normalizes data
4. Trains LSTM model (3 layers, 128→64→32 units)
5. Saves model to `models/aqi_lstm_model.h5`
6. Saves scaler to `models/aqi_scaler.pkl`
7. Saves metrics to `models/training_metrics.json`

**Expected output:**
```
Fetching 90 days of historical data...
Generating synthetic historical data for training...
Collected 2160 data points
Starting model training...
Training LSTM model...
Epoch 1/50
...
Model training completed successfully!
```

**Training time:** 10-30 minutes depending on your hardware

### Step 3: Verify Model Files

Check that these files were created:
```bash
ls -la functions/ml/models/
```

You should see:
- `aqi_lstm_model.h5` (model weights)
- `aqi_scaler.pkl` (data scaler)
- `training_metrics.json` (training stats)

---

## 🚀 Deploy Cloud Functions

### Step 1: Update Firebase Functions Package

```bash
cd functions
npm install
```

### Step 2: Deploy Functions

```bash
firebase deploy --only functions
```

This deploys two Cloud Functions:
1. **predictAQI** - Returns AQI predictions
2. **trainModel** - Retrains the model (admin use)

### Step 3: Get Function URLs

After deployment, you'll see URLs like:
```
✔  functions[predictAQI(us-central1)] https://us-central1-delhibreathe.cloudfunctions.net/predictAQI
✔  functions[trainModel(us-central1)] https://us-central1-delhibreathe.cloudfunctions.net/trainModel
```

**Copy the `predictAQI` URL** - you'll need it for the frontend!

---

## 🎨 Frontend Integration

### Step 1: Update API URL

Open `src/components/home/AQIPredictionCard.tsx` and update line 33:

```typescript
// Replace this line:
const response = await fetch('https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/predictAQI');

// With your actual URL:
const response = await fetch('https://us-central1-delhibreathe.cloudfunctions.net/predictAQI');
```

### Step 2: Build and Deploy Frontend

```bash
npm run build
firebase deploy --only hosting
```

---

## 🧪 Testing

### Test 1: Python Prediction Service

```bash
cd functions/ml
python predict_service.py
```

Expected output: JSON with daily, weekly, and monthly predictions

### Test 2: Cloud Function (Local)

```bash
firebase emulators:start --only functions
```

Then test in browser:
```
http://localhost:5001/delhibreathe/us-central1/predictAQI
```

### Test 3: Cloud Function (Production)

```bash
curl https://us-central1-delhibreathe.cloudfunctions.net/predictAQI
```

### Test 4: Frontend Component

1. Start dev server: `npm run dev`
2. Navigate to home page
3. Scroll to "AI-Powered AQI Predictions" card
4. Check that predictions load and display correctly

---

## 🐛 Troubleshooting

### Issue: "Module 'tensorflow' not found"

**Solution:**
```bash
pip install tensorflow==2.15.0
```

### Issue: "serviceAccountKey.json not found"

**Solution:**
1. Download from Firebase Console (see Firebase Configuration section)
2. Place in `functions/ml/` directory
3. Verify filename is exactly `serviceAccountKey.json`

### Issue: "Insufficient data for training"

**Solution:**
The script automatically generates synthetic data. If you want to use real data:
1. Ensure Firebase Realtime Database has historical AQI readings
2. Update `fetch_historical_data()` in `train_model.py` to match your data structure

### Issue: "Python process error" in Cloud Functions

**Solution:**
1. Ensure Python 3 is installed on Cloud Functions environment
2. Check that model files are uploaded:
   ```bash
   firebase deploy --only functions
   ```
3. Verify `functions/ml/models/` contains `.h5` and `.pkl` files

### Issue: Predictions not loading in frontend

**Solution:**
1. Check browser console for errors
2. Verify Cloud Function URL is correct in `AQIPredictionCard.tsx`
3. Test Cloud Function directly in browser
4. Check CORS settings in Cloud Function

### Issue: "CORS error" when fetching predictions

**Solution:**
The Cloud Function already has `cors: true` enabled. If still having issues:
```javascript
// In functions/index.js, add explicit CORS headers:
res.set('Access-Control-Allow-Origin', '*');
res.set('Access-Control-Allow-Methods', 'GET, POST');
```

---

## 📊 Model Performance

### Check Training Metrics

```bash
cat functions/ml/models/training_metrics.json
```

Example output:
```json
{
  "training_date": "2024-12-11T10:30:00",
  "data_points": 2160,
  "final_loss": 0.0234,
  "final_val_loss": 0.0289,
  "final_mae": 8.45,
  "final_val_mae": 9.12
}
```

**Good metrics:**
- MAE < 15 (predictions within ±15 AQI points)
- Validation loss close to training loss (not overfitting)

### Retrain Model

Retrain monthly for better accuracy:
```bash
cd functions/ml
python train_model.py
firebase deploy --only functions
```

Or trigger via API:
```bash
curl -X POST https://us-central1-delhibreathe.cloudfunctions.net/trainModel
```

---

## 🎯 What You Get

After setup, your app will have:

✅ **Daily Predictions** - Next 7 days with confidence intervals
✅ **Weekly Predictions** - Next 4 weeks averaged
✅ **Monthly Predictions** - Next 3 months averaged
✅ **Professional UI** - Tabbed interface matching your theme
✅ **Auto-refresh** - Updates every 30 minutes
✅ **AQI Categories** - Color-coded health categories
✅ **Confidence Ranges** - Upper and lower bounds for each prediction

---

## 📱 Component Features

The `AQIPredictionCard` component includes:

- 🧠 Brain icon with gradient header
- 📊 Three tabs: Daily, Weekly, Monthly
- 🎨 Color-coded AQI categories
- 📈 Confidence interval ranges
- 🔄 Manual refresh button
- ⏰ Last updated timestamp
- 💡 Educational info about LSTM predictions
- 📱 Fully responsive design

---

## 🔐 Security Best Practices

1. **Never commit** `serviceAccountKey.json`
2. **Add to .gitignore:**
   ```
   functions/ml/serviceAccountKey.json
   functions/ml/models/*.h5
   functions/ml/models/*.pkl
   functions/ml/venv/
   ```
3. **Use Firebase Security Rules** to restrict database access
4. **Implement authentication** for trainModel endpoint
5. **Rate limit** prediction API to prevent abuse

---

## 📚 Additional Resources

- [LSTM Networks Explained](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)
- [TensorFlow Time Series Tutorial](https://www.tensorflow.org/tutorials/structured_data/time_series)
- [Firebase Cloud Functions Docs](https://firebase.google.com/docs/functions)
- [Air Quality Index Guide](https://www.airnow.gov/aqi/aqi-basics/)

---

## 🎉 Success Checklist

- [ ] Python environment set up
- [ ] Dependencies installed
- [ ] Service account key downloaded
- [ ] Model trained successfully
- [ ] Cloud Functions deployed
- [ ] Frontend URL updated
- [ ] Predictions loading in UI
- [ ] All three tabs working (Daily/Weekly/Monthly)
- [ ] Confidence intervals displaying
- [ ] Auto-refresh working

---

## 💬 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review Firebase Console logs
3. Check browser console for frontend errors
4. Verify all files are in correct locations
5. Ensure all dependencies are installed

---

**🎊 Congratulations!** You now have a complete AI-powered AQI prediction system using LSTM neural networks!
