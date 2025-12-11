import firebase_admin
from firebase_admin import credentials, db
import numpy as np
from datetime import datetime, timedelta
from aqi_lstm_model import AQILSTMPredictor
import json
import os

class AQIPredictionService:
    def __init__(self):
        self.predictor = AQILSTMPredictor(lookback=30)
        self.load_model()
    
    def load_model(self):
        """Load trained model"""
        model_path = 'models/aqi_lstm_model.h5'
        scaler_path = 'models/aqi_scaler.pkl'
        
        if os.path.exists(model_path) and os.path.exists(scaler_path):
            self.predictor.load_model(model_path, scaler_path)
            print("Model loaded successfully")
        else:
            print("Warning: Model files not found. Please train the model first.")
    
    def fetch_recent_data(self, hours=30):
        """Fetch recent AQI data from Firebase"""
        ref = db.reference('/')
        data = ref.get()
        
        if not data or 'aqi' not in data:
            return None
        
        # For real implementation, fetch historical hourly data
        # For now, simulate with current AQI
        current_aqi = data['aqi']
        
        # Generate recent data (in production, fetch from database)
        recent_data = []
        for i in range(hours):
            noise = np.random.normal(0, 5)
            recent_data.append(max(0, current_aqi + noise))
        
        return np.array(recent_data)
    
    def get_aqi_category(self, aqi):
        """Get AQI category and color"""
        if aqi <= 50:
            return {'category': 'Good', 'color': '#00e400', 'description': 'Air quality is satisfactory'}
        elif aqi <= 100:
            return {'category': 'Moderate', 'color': '#ffff00', 'description': 'Air quality is acceptable'}
        elif aqi <= 150:
            return {'category': 'Unhealthy for Sensitive Groups', 'color': '#ff7e00', 'description': 'Sensitive groups may experience health effects'}
        elif aqi <= 200:
            return {'category': 'Unhealthy', 'color': '#ff0000', 'description': 'Everyone may begin to experience health effects'}
        elif aqi <= 300:
            return {'category': 'Very Unhealthy', 'color': '#8f3f97', 'description': 'Health alert: everyone may experience serious effects'}
        else:
            return {'category': 'Hazardous', 'color': '#7e0023', 'description': 'Health warnings of emergency conditions'}
    
    def predict_all(self):
        """Generate all predictions (daily, weekly, monthly)"""
        recent_data = self.fetch_recent_data(hours=30)
        
        if recent_data is None:
            return {'error': 'Unable to fetch recent data'}
        
        try:
            # Daily predictions (next 7 days)
            daily_predictions = self.predictor.predict_daily(recent_data, days=7)
            daily_confidence = self.predictor.get_prediction_confidence(daily_predictions)
            
            # Weekly predictions (next 4 weeks)
            weekly_predictions = self.predictor.predict_weekly(recent_data, weeks=4)
            weekly_confidence = self.predictor.get_prediction_confidence(weekly_predictions)
            
            # Monthly predictions (next 3 months)
            monthly_predictions = self.predictor.predict_monthly(recent_data, months=3)
            monthly_confidence = self.predictor.get_prediction_confidence(monthly_predictions)
            
            # Format results
            current_date = datetime.now()
            
            daily_results = []
            for i, (pred, conf) in enumerate(zip(daily_predictions, daily_confidence)):
                date = current_date + timedelta(days=i+1)
                category = self.get_aqi_category(pred)
                daily_results.append({
                    'date': date.strftime('%Y-%m-%d'),
                    'day': date.strftime('%A'),
                    'aqi': round(float(pred), 1),
                    'confidence': conf,
                    'category': category['category'],
                    'color': category['color'],
                    'description': category['description']
                })
            
            weekly_results = []
            for i, (pred, conf) in enumerate(zip(weekly_predictions, weekly_confidence)):
                start_date = current_date + timedelta(weeks=i+1)
                end_date = start_date + timedelta(days=6)
                category = self.get_aqi_category(pred)
                weekly_results.append({
                    'week': i + 1,
                    'start_date': start_date.strftime('%Y-%m-%d'),
                    'end_date': end_date.strftime('%Y-%m-%d'),
                    'aqi': round(float(pred), 1),
                    'confidence': conf,
                    'category': category['category'],
                    'color': category['color'],
                    'description': category['description']
                })
            
            monthly_results = []
            month_names = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December']
            for i, (pred, conf) in enumerate(zip(monthly_predictions, monthly_confidence)):
                future_date = current_date + timedelta(days=30*(i+1))
                category = self.get_aqi_category(pred)
                monthly_results.append({
                    'month': month_names[future_date.month - 1],
                    'year': future_date.year,
                    'aqi': round(float(pred), 1),
                    'confidence': conf,
                    'category': category['category'],
                    'color': category['color'],
                    'description': category['description']
                })
            
            return {
                'success': True,
                'timestamp': datetime.now().isoformat(),
                'predictions': {
                    'daily': daily_results,
                    'weekly': weekly_results,
                    'monthly': monthly_results
                }
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

# For testing
if __name__ == '__main__':
    # Initialize Firebase
    if not firebase_admin._apps:
        cred = credentials.Certificate('serviceAccountKey.json')
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://delhibreathe-default-rtdb.firebaseio.com'
        })
    
    service = AQIPredictionService()
    predictions = service.predict_all()
    print(json.dumps(predictions, indent=2))
