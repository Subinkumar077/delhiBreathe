# Delhi Breathe - Project Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🤖 AQI Prediction System

### Current Status: ✅ Working with Mock Predictions

The app includes an AI-powered AQI prediction system that currently uses **client-side mock predictions**. This works immediately without any setup.

### Features
- **Daily Predictions**: Next 7 days
- **Weekly Predictions**: Next 4 weeks
- **Monthly Predictions**: Next 3 months
- Confidence intervals
- Color-coded AQI categories
- Auto-refresh every 30 minutes

### Files
- `src/components/home/AQIPredictionCard.tsx` - UI component
- `src/services/mockPredictions.ts` - Mock prediction service

---

## 🔄 Upgrading to Real ML Predictions (Optional)

If you want to use actual LSTM neural network predictions:

### Requirements
- Python 3.8+
- Firebase Blaze plan (pay-as-you-go)

### Setup Steps

1. **Install Python dependencies**
   ```bash
   cd functions/ml
   pip install -r requirements.txt
   ```

2. **Add Firebase service account key**
   - Go to Firebase Console → Settings → Service Accounts
   - Generate New Private Key
   - Save as `functions/ml/serviceAccountKey.json`

3. **Train the model**
   ```bash
   python train_model.py
   ```
   (Takes 10-30 minutes)

4. **Deploy Cloud Functions**
   ```bash
   firebase deploy --only functions
   ```

5. **Update frontend**
   - Edit `src/components/home/AQIPredictionCard.tsx`
   - Replace mock service with Cloud Function URL

For detailed instructions, see `ML_SETUP_GUIDE.md`

---

## 📁 Project Structure

```
delhibreathe-vite/
├── src/
│   ├── components/
│   │   ├── home/          # Home page components
│   │   ├── map/           # Map components
│   │   ├── layout/        # Layout components
│   │   └── shared/        # Shared components
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript types
│   └── data/              # Static data
├── functions/
│   ├── ml/                # ML system (Python)
│   └── index.js           # Cloud Functions
└── public/                # Static assets
```

---

## 🔥 Firebase Configuration

Your Firebase config is already set up in the code:
- Project: `delhibreathe`
- Database: Realtime Database
- Hosting: Enabled

---

## 🎨 Key Features

- **Real-time AQI monitoring**
- **AI-powered predictions** (daily/weekly/monthly)
- **Interactive map** with multiple cities
- **Pollutant details** with health information
- **AQI trends** and historical data
- **Filter maintenance** tracking
- **Responsive design** for all devices

---

## 📚 Documentation

- `QUICK_START.md` - Quick setup for ML system
- `ML_SETUP_GUIDE.md` - Detailed ML setup guide
- `SETUP_COMPLETE.md` - Current system status
- `functions/ml/README.md` - ML system documentation
- `functions/ml/CHECKLIST.md` - Setup verification

---

## 🐛 Troubleshooting

### Predictions not loading?
- Currently using mock predictions (works offline)
- No setup required
- See `SETUP_COMPLETE.md` for details

### Want real ML predictions?
- Follow steps in "Upgrading to Real ML Predictions"
- See `ML_SETUP_GUIDE.md` for detailed instructions

---

## 🔐 Security

- Never commit `serviceAccountKey.json`
- Keep `.env` files private
- Use Firebase Security Rules

---

## 📝 License

Part of the Delhi Breathe air quality monitoring project.
