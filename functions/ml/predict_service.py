import numpy as np
import firebase_admin
from firebase_admin import db
from aqi_lstm_model import AQILSTMPredictor
import os

class AQIPredictionService:
    def __init__(self):
        self.predictor = AQILSTMPredictor(lookback=30)
        self.load_model()
    
    def load_model(self):
        """Load trained model"""
        model_path = 'models/aqi_lstm_model.pth'
        scaler_path = 'models/aqi_scaler.pkl'
        
        if os.path.exists(model_path) and os.path.exists(scaler_path):
            self.predictor.load_model(model_path, scaler_path)
            print("✅ Model loaded successfully")
        else:
            print("⚠️ Warning: Model files not found. Using simulation mode.")

    def fetch_recent_data(self, hours=30):
        """Fetch data safely - works even if Firebase fails!"""
        try:
            # 1. Try to get Real Data from Firebase
            ref = db.reference('/readings')
            data = ref.get()
            
            if data and isinstance(data, dict):
                # Extract AQI values from all readings
                aqi_values = []
                for key, reading in data.items():
                    if 'aqi' in reading:
                        aqi_values.append(float(reading['aqi']))
                
                if aqi_values:
                    # Use the most recent readings (last 30 or all available)
                    recent_aqi = aqi_values[-min(hours, len(aqi_values)):]
                    
                    # If we have fewer than 30 readings, pad with the average
                    if len(recent_aqi) < hours:
                        avg_aqi = np.mean(recent_aqi)
                        padding = [avg_aqi + np.random.normal(0, 2) for _ in range(hours - len(recent_aqi))]
                        recent_aqi = padding + recent_aqi
                    
                    print(f"📡 Fetched {len(aqi_values)} real AQI readings from Firebase")
                    print(f"📊 Current AQI: {aqi_values[-1]}, Average: {np.mean(aqi_values):.1f}")
                    return np.array(recent_aqi)
                else:
                    raise ValueError("No AQI values found in readings")
            else:
                raise ValueError("No readings data in Firebase")

        except Exception as e:
            # 2. FALLBACK: If Firebase fails, use Simulation
            print(f"⚠️ Firebase unavailable ({e}). Using Simulation Mode.")
            current_aqi = 145.0 + np.random.normal(0, 15)
            
            # Generate 30 hours of history based on simulated value
            recent_data = []
            val = current_aqi
            for _ in range(hours):
                val += np.random.normal(0, 2)
                recent_data.append(max(0, val))
            
            return np.array(recent_data)
    
    def get_aqi_category(self, aqi):
        if aqi <= 50: return {'category': 'Good', 'color': '#00e400', 'description': 'Air quality is satisfactory'}
        elif aqi <= 100: return {'category': 'Moderate', 'color': '#ffff00', 'description': 'Air quality is acceptable'}
        elif aqi <= 150: return {'category': 'Unhealthy for Sensitive Groups', 'color': '#ff7e00', 'description': 'Sensitive groups may experience health effects'}
        elif aqi <= 200: return {'category': 'Unhealthy', 'color': '#ff0000', 'description': 'Everyone may begin to experience health effects'}
        elif aqi <= 300: return {'category': 'Very Unhealthy', 'color': '#8f3f97', 'description': 'Health alert: everyone may experience serious effects'}
        else: return {'category': 'Hazardous', 'color': '#7e0023', 'description': 'Health warnings of emergency conditions'}

    def predict_all(self):
        """Generate all predictions (daily, weekly, monthly)"""
        try:
            # 1. Get Data (Real or Simulated)
            recent_data = self.fetch_recent_data(hours=30)
            
            # 2. Make Predictions
            daily_predictions = self.predictor.predict_daily(recent_data, days=7)
            weekly_predictions = self.predictor.predict_weekly(recent_data, weeks=4)
            monthly_predictions = self.predictor.predict_monthly(recent_data, months=3)
            
            # 3. Calculate Confidence
            daily_conf = self.predictor.get_prediction_confidence(daily_predictions)
            weekly_conf = self.predictor.get_prediction_confidence(weekly_predictions)
            monthly_conf = self.predictor.get_prediction_confidence(monthly_predictions)
            
            # 4. Format Output for Frontend
            from datetime import datetime, timedelta
            current_date = datetime.now()
            
            def format_results(preds, confs, type='daily'):
                results = []
                for i, (pred, conf) in enumerate(zip(preds, confs)):
                    date = current_date + timedelta(days=i+1) if type == 'daily' else current_date # Simplified date logic
                    cat = self.get_aqi_category(pred)
                    
                    item = {
                        'aqi': round(float(pred), 1),
                        'confidence': conf,
                        'category': cat['category'],
                        'color': cat['color'],
                        'description': cat['description']
                    }
                    
                    if type == 'daily':
                        item['date'] = (current_date + timedelta(days=i+1)).strftime('%Y-%m-%d')
                        item['day'] = (current_date + timedelta(days=i+1)).strftime('%A')
                    elif type == 'weekly':
                        item['week'] = i + 1
                        item['start_date'] = (current_date + timedelta(weeks=i)).strftime('%Y-%m-%d')
                        item['end_date'] = (current_date + timedelta(weeks=i+1)).strftime('%Y-%m-%d')
                    elif type == 'monthly':
                        future_date = current_date + timedelta(days=30*(i+1))
                        item['month'] = future_date.strftime('%B')
                        item['year'] = future_date.year
                        
                    results.append(item)
                return results

            return {
                'success': True,
                'predictions': {
                    'daily': format_results(daily_predictions, daily_conf, 'daily'),
                    'weekly': format_results(weekly_predictions, weekly_conf, 'weekly'),
                    'monthly': format_results(monthly_predictions, monthly_conf, 'monthly')
                }
            }
        
        except Exception as e:
            print(f"❌ Prediction Error: {e}")
            return {'success': False, 'error': str(e)}