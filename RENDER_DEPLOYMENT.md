# Render.com Deployment Guide

This guide will help you deploy the Delhi Breathe application on Render.com.

## Project Structure

This project consists of:
1. **Frontend**: React + Vite static site
2. **ML Service**: Python FastAPI service for AQI predictions

## Prerequisites

- GitHub account (Render deploys from Git repositories)
- Firebase project with Realtime Database
- Firebase service account key JSON

## Deployment Steps

### 1. Prepare Your Repository

Push your code to GitHub:
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Deploy on Render

#### Option A: Using render.yaml (Recommended - Blueprint)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and create both services

#### Option B: Manual Setup

**Deploy Frontend:**
1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `delhibreathe-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add environment variables (see below)

**Deploy ML Service:**
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `delhibreathe-ml-service`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r functions/ml/requirements.txt`
   - **Start Command**: `cd functions/ml && uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables (see below)

### 3. Configure Environment Variables

#### Frontend Environment Variables

Add these in the Render dashboard for your static site:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

#### ML Service Environment Variables

Add these in the Render dashboard for your Python web service:

```
FIREBASE_DATABASE_URL=https://delhibreathe-default-rtdb.firebaseio.com
FIREBASE_SERVICE_ACCOUNT=<paste your entire serviceAccountKey.json content here as a single line>
```

**To get FIREBASE_SERVICE_ACCOUNT value:**
1. Download your Firebase service account key from Firebase Console
2. Open the JSON file
3. Copy the entire JSON content (minified, no line breaks)
4. Paste it as the value for `FIREBASE_SERVICE_ACCOUNT`

### 4. Update Frontend to Use ML Service

After deployment, update your frontend code to use the ML service URL:

1. Get your ML service URL from Render (e.g., `https://delhibreathe-ml-service.onrender.com`)
2. Update API calls in your frontend to point to this URL instead of `http://localhost:8000`

### 5. Verify Deployment

- **Frontend**: Visit your static site URL (e.g., `https://delhibreathe-frontend.onrender.com`)
- **ML Service**: Visit `https://your-ml-service.onrender.com/predict` to test the API

## Important Notes

### Free Tier Limitations

- **Static Sites**: Free with 100GB bandwidth/month
- **Web Services**: Free tier spins down after 15 minutes of inactivity
  - First request after spin-down may take 30-60 seconds
  - Consider upgrading to paid plan for production use

### Firebase Functions

Note: Firebase Cloud Functions are NOT deployed to Render. They remain on Firebase:
- Keep using `firebase deploy --only functions` for Firebase Functions
- The ML service on Render is separate from Firebase Functions

### Model Files

Ensure your ML model file (`aqi_lstm_best.h5`) is:
- Committed to your repository (not in `.gitignore`)
- Located at `functions/ml/aqi_lstm_best.h5`

### CORS Configuration

The ML service is configured to allow all origins. For production, update `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-url.onrender.com"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Troubleshooting

### Build Fails

- Check build logs in Render dashboard
- Verify all dependencies are in `package.json` or `requirements.txt`
- Ensure Node.js/Python versions are compatible

### ML Service Returns 500 Error

- Check if `FIREBASE_SERVICE_ACCOUNT` is properly set
- Verify the JSON is valid (use a JSON validator)
- Check service logs in Render dashboard

### Frontend Shows Blank Page

- Check browser console for errors
- Verify all environment variables are set
- Ensure build completed successfully

## Cost Optimization

For production deployment:
- Use Render's **Starter** plan ($7/month) for ML service to avoid cold starts
- Static site remains free
- Total cost: ~$7/month

## Alternative: Deploy Everything on Render

If you want to move away from Firebase Functions entirely:
1. Convert Firebase Functions to Express.js API
2. Deploy as a separate Node.js web service on Render
3. Update frontend to use the new API URL

## Support

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com/)
