# Deploy to Render

This guide will help you deploy your Delhi Breathe application to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. Firebase project credentials

## Deployment Options

### Option 1: Using render.yaml (Recommended)

1. **Push your code to Git**
   ```bash
   git add .
   git commit -m "Add Render configuration"
   git push
   ```

2. **Create a new Blueprint on Render**
   - Go to https://dashboard.render.com
   - Click "New" → "Blueprint"
   - Connect your Git repository
   - Render will automatically detect `render.yaml` and create all services

3. **Configure Environment Variables**
   
   For the **Frontend** service:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   
   For the **API** service:
   - `FIREBASE_SERVICE_ACCOUNT` (JSON string of your service account)
   
   For the **ML** service:
   - Any ML-specific configuration

### Option 2: Manual Deployment

#### Deploy Frontend (Static Site)

1. Go to Render Dashboard → New → Static Site
2. Connect your repository
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add environment variables (Firebase config)
5. Click "Create Static Site"

#### Deploy Backend API (Web Service)

1. Go to Render Dashboard → New → Web Service
2. Connect your repository
3. Configure:
   - **Root Directory**: `functions`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Environment**: Node
4. Add environment variables
5. Click "Create Web Service"

#### Deploy ML Service (Web Service)

1. Go to Render Dashboard → New → Web Service
2. Connect your repository
3. Configure:
   - **Root Directory**: `functions/ml`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python main.py`
   - **Environment**: Python 3.11
4. Add environment variables
5. Click "Create Web Service"

## Post-Deployment

1. **Get Service URLs**: Note the URLs for your API and ML services
2. **Update Frontend**: Update your frontend code to use the Render API URLs
3. **Test**: Visit your frontend URL and test all functionality

## Environment Variables Setup

Create a `.env` file locally (don't commit) with:

```env
# Frontend
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}

# API URLs (after deployment)
VITE_API_URL=https://your-api.onrender.com
VITE_ML_URL=https://your-ml.onrender.com
```

## Troubleshooting

- **Build fails**: Check the build logs in Render dashboard
- **Service won't start**: Verify environment variables are set correctly
- **CORS errors**: Ensure CORS is configured in your API
- **ML model not loading**: Check file paths and model file is included in repo

## Cost Considerations

- Free tier includes 750 hours/month per service
- Static sites are free
- Web services sleep after 15 minutes of inactivity (free tier)
- Consider upgrading to paid plans for production use

## Support

For issues, check:
- Render documentation: https://render.com/docs
- Render community: https://community.render.com
