# ✅ AQI LSTM Setup Checklist

Use this checklist to ensure everything is set up correctly.

## 📋 Pre-Setup

- [ ] Python 3.8+ installed
  ```bash
  python3 --version
  ```

- [ ] Node.js 18+ installed
  ```bash
  node --version
  ```

- [ ] Firebase CLI installed
  ```bash
  firebase --version
  ```

- [ ] Git repository initialized
  ```bash
  git status
  ```

---

## 🐍 Python Environment

- [ ] Virtual environment created (optional but recommended)
  ```bash
  python3 -m venv venv
  source venv/bin/activate  # Mac/Linux
  # or
  venv\Scripts\activate  # Windows
  ```

- [ ] Dependencies installed
  ```bash
  pip install -r requirements.txt
  ```

- [ ] All packages import successfully
  ```bash
  python -c "import tensorflow, numpy, pandas, sklearn, firebase_admin; print('✅ All imports OK')"
  ```

---

## 🔥 Firebase Setup

- [ ] Firebase project exists (delhibreathe)
  - Visit: https://console.firebase.google.com/

- [ ] Realtime Database enabled
  - Check: Firebase Console → Realtime Database

- [ ] Service account key downloaded
  - Location: Firebase Console → Settings → Service Accounts
  - Action: Generate New Private Key

- [ ] Service account key saved correctly
  - File: `functions/ml/serviceAccountKey.json`
  - Check: `ls -la serviceAccountKey.json`

- [ ] Service account key in .gitignore
  - Check: `cat .gitignore | grep serviceAccountKey`

---

## 🧠 Model Training

- [ ] Models directory exists
  ```bash
  mkdir -p models
  ```

- [ ] Training script runs without errors
  ```bash
  python train_model.py
  ```

- [ ] Model file created
  - File: `models/aqi_lstm_model.h5`
  - Check: `ls -la models/aqi_lstm_model.h5`

- [ ] Scaler file created
  - File: `models/aqi_scaler.pkl`
  - Check: `ls -la models/aqi_scaler.pkl`

- [ ] Training metrics saved
  - File: `models/training_metrics.json`
  - Check: `cat models/training_metrics.json`

- [ ] Training metrics look good
  - MAE < 15 ✅
  - Validation loss ≈ Training loss ✅

---

## 🧪 Testing

- [ ] Test system script runs
  ```bash
  python test_system.py
  ```

- [ ] All tests pass
  - Imports ✅
  - Model files ✅
  - Service account ✅
  - Firebase connection ✅
  - Model loading ✅
  - Predictions ✅

- [ ] Prediction service works
  ```bash
  python predict_service.py
  ```

- [ ] Output is valid JSON
  - Contains: daily, weekly, monthly predictions
  - Each prediction has: aqi, confidence, category, color

---

## ☁️ Cloud Functions

- [ ] Firebase logged in
  ```bash
  firebase login
  ```

- [ ] Correct project selected
  ```bash
  firebase use delhibreathe
  ```

- [ ] Functions directory has correct structure
  ```bash
  ls -la functions/
  # Should see: index.js, package.json, ml/
  ```

- [ ] Cloud Functions deployed
  ```bash
  firebase deploy --only functions
  ```

- [ ] Deployment successful
  - Check output for function URLs
  - No errors in deployment log

- [ ] Function URLs copied
  - predictAQI: `https://...cloudfunctions.net/predictAQI`
  - trainModel: `https://...cloudfunctions.net/trainModel`

- [ ] Functions accessible
  ```bash
  curl https://YOUR-FUNCTION-URL/predictAQI
  ```

---

## 🎨 Frontend Integration

- [ ] Component file exists
  - File: `src/components/home/AQIPredictionCard.tsx`
  - Check: `ls -la src/components/home/AQIPredictionCard.tsx`

- [ ] Component imported in main.tsx
  - File: `src/components/home/main.tsx`
  - Check: `grep AQIPredictionCard src/components/home/main.tsx`

- [ ] Cloud Function URL updated
  - File: `src/components/home/AQIPredictionCard.tsx`
  - Line: ~33
  - Updated: `fetch('YOUR_ACTUAL_URL')`

- [ ] Frontend builds without errors
  ```bash
  npm run build
  ```

- [ ] No TypeScript errors
  ```bash
  npm run type-check
  ```

---

## 🚀 Deployment

- [ ] Frontend deployed
  ```bash
  firebase deploy --only hosting
  ```

- [ ] Deployment successful
  - Check: Firebase Console → Hosting
  - Visit: Your deployed URL

- [ ] Prediction card visible on home page
  - Navigate to home page
  - Scroll to "AI-Powered AQI Predictions"

- [ ] Predictions loading correctly
  - Check: Browser console for errors
  - Verify: Data displays in all three tabs

---

## 🔍 Verification

- [ ] Daily predictions show 7 days
  - Each with date, AQI, category, confidence

- [ ] Weekly predictions show 4 weeks
  - Each with week number, date range, AQI

- [ ] Monthly predictions show 3 months
  - Each with month name, year, AQI

- [ ] Confidence intervals display
  - Lower bound < prediction < upper bound

- [ ] AQI categories color-coded
  - Good: Green
  - Moderate: Yellow
  - Unhealthy: Orange/Red
  - Hazardous: Purple/Maroon

- [ ] Auto-refresh works
  - Wait 30 minutes
  - Check if data refreshes

- [ ] Manual refresh works
  - Click refresh button
  - Verify data updates

- [ ] Responsive on mobile
  - Test on mobile device or browser dev tools
  - All tabs accessible
  - Cards display correctly

---

## 🔐 Security

- [ ] Service account key NOT in git
  ```bash
  git status
  # Should NOT show serviceAccountKey.json
  ```

- [ ] Model files NOT in git (optional)
  ```bash
  git status
  # Should NOT show .h5 or .pkl files
  ```

- [ ] .gitignore configured
  ```bash
  cat functions/ml/.gitignore
  # Should include:
  # - serviceAccountKey.json
  # - models/*.h5
  # - models/*.pkl
  ```

- [ ] Firebase security rules set
  - Check: Firebase Console → Realtime Database → Rules

- [ ] Cloud Functions have proper permissions
  - Check: Firebase Console → Functions → Permissions

---

## 📊 Performance

- [ ] Predictions load in < 5 seconds
  - Test: Network tab in browser dev tools

- [ ] No console errors
  - Check: Browser console

- [ ] No memory leaks
  - Test: Leave page open for 30+ minutes
  - Check: Browser task manager

- [ ] Model size reasonable
  - Check: `ls -lh models/aqi_lstm_model.h5`
  - Should be: 5-10 MB

---

## 📚 Documentation

- [ ] README files present
  - `ML_SETUP_GUIDE.md` ✅
  - `LSTM_PREDICTION_SYSTEM.md` ✅
  - `QUICK_START.md` ✅
  - `functions/ml/README.md` ✅

- [ ] Documentation reviewed
  - Understand training process
  - Understand prediction types
  - Know how to retrain model

- [ ] Team members trained
  - Share documentation
  - Explain system architecture
  - Show how to retrain model

---

## 🎯 Final Checks

- [ ] System works end-to-end
  1. User visits home page
  2. Prediction card loads
  3. Predictions display correctly
  4. All tabs work
  5. Refresh works

- [ ] No errors in logs
  - Firebase Console → Functions → Logs
  - Browser console
  - Terminal output

- [ ] Performance acceptable
  - Page load time < 3 seconds
  - Predictions load < 5 seconds
  - No lag or freezing

- [ ] Backup created
  - Model files backed up
  - Service account key backed up (securely!)
  - Database exported

---

## 🎉 Success!

If all items are checked, congratulations! 🎊

Your AQI LSTM prediction system is fully operational!

### Next Steps

1. **Monitor**: Check Firebase Console regularly
2. **Retrain**: Monthly or after major events
3. **Optimize**: Tune hyperparameters if needed
4. **Expand**: Add more features (weather, multi-pollutant)

### Maintenance Schedule

- **Daily**: Check for errors in logs
- **Weekly**: Review prediction accuracy
- **Monthly**: Retrain model with new data
- **Quarterly**: Review and optimize system

---

## 📞 Support

If any items are unchecked:

1. Review the relevant documentation section
2. Check the troubleshooting guide
3. Run `python test_system.py` for diagnostics
4. Review Firebase Console logs
5. Check browser console for errors

---

**Date Completed**: _______________

**Completed By**: _______________

**Notes**: _______________________________________________

_____________________________________________________

_____________________________________________________
