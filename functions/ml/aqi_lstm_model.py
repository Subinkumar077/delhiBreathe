import numpy as np
import pandas as pd
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.preprocessing import MinMaxScaler
import pickle
import json
from datetime import datetime, timedelta

class AQILSTMPredictor:
    def __init__(self, lookback=30):
        self.lookback = lookback
        self.model = None
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        
    def create_model(self, input_shape):
        """Create LSTM model architecture"""
        model = Sequential([
            LSTM(128, return_sequences=True, input_shape=input_shape),
            Dropout(0.2),
            LSTM(64, return_sequences=True),
            Dropout(0.2),
            LSTM(32, return_sequences=False),
            Dropout(0.2),
            Dense(16, activation='relu'),
            Dense(1)
        ])
        
        model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=0.001),
            loss='mse',
            metrics=['mae']
        )
        
        return model
    
    def prepare_sequences(self, data, lookback):
        """Prepare sequences for LSTM training"""
        X, y = [], []
        for i in range(len(data) - lookback):
            X.append(data[i:i + lookback])
            y.append(data[i + lookback])
        return np.array(X), np.array(y)
    
    def train(self, historical_data, epochs=100, batch_size=32, validation_split=0.2):
        """Train the LSTM model on historical AQI data"""
        # Prepare data
        aqi_values = np.array(historical_data['aqi']).reshape(-1, 1)
        scaled_data = self.scaler.fit_transform(aqi_values)
        
        # Create sequences
        X, y = self.prepare_sequences(scaled_data, self.lookback)
        X = X.reshape((X.shape[0], X.shape[1], 1))
        
        # Create model
        self.model = self.create_model((self.lookback, 1))
        
        # Callbacks
        early_stop = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)
        checkpoint = ModelCheckpoint('aqi_lstm_best.h5', save_best_only=True, monitor='val_loss')
        
        # Train
        history = self.model.fit(
            X, y,
            epochs=epochs,
            batch_size=batch_size,
            validation_split=validation_split,
            callbacks=[early_stop, checkpoint],
            verbose=1
        )
        
        return history
    
    def predict_future(self, recent_data, steps=1): 
        """Predict future AQI values"""
        if self.model is None:
            raise ValueError("Model not trained or loaded")
        
        # Prepare input
        recent_values = np.array(recent_data[-self.lookback:]).reshape(-1, 1)
        scaled_input = self.scaler.transform(recent_values)
        
        predictions = []
        current_sequence = scaled_input.copy()
        
        for _ in range(steps):
            # Reshape for prediction
            X_pred = current_sequence.reshape(1, self.lookback, 1)
            
            # Predict next value
            next_pred = self.model.predict(X_pred, verbose=0)
            predictions.append(next_pred[0, 0])
            
            # Update sequence
            current_sequence = np.append(current_sequence[1:], next_pred).reshape(-1, 1)
        
        # Inverse transform predictions
        predictions = np.array(predictions).reshape(-1, 1)
        predictions = self.scaler.inverse_transform(predictions)
        
        return predictions.flatten()
    
    def predict_daily(self, recent_data, days=7):
        """Predict daily AQI for next N days"""
        return self.predict_future(recent_data, steps=days)
    
    def predict_weekly(self, recent_data, weeks=4):
        """Predict weekly average AQI for next N weeks"""
        daily_predictions = self.predict_future(recent_data, steps=weeks * 7)
        
        # Calculate weekly averages
        weekly_predictions = []
        for i in range(0, len(daily_predictions), 7):
            week_data = daily_predictions[i:i+7]
            weekly_predictions.append(np.mean(week_data))
        
        return np.array(weekly_predictions)
    
    def predict_monthly(self, recent_data, months=3):
        """Predict monthly average AQI for next N months"""
        daily_predictions = self.predict_future(recent_data, steps=months * 30)
        
        # Calculate monthly averages
        monthly_predictions = []
        for i in range(0, len(daily_predictions), 30):
            month_data = daily_predictions[i:i+30]
            monthly_predictions.append(np.mean(month_data))
        
        return np.array(monthly_predictions)
    
    def save_model(self, model_path='aqi_lstm_model.h5', scaler_path='aqi_scaler.pkl'):
        """Save model and scaler"""
        if self.model:
            self.model.save(model_path)
        with open(scaler_path, 'wb') as f:
            pickle.dump(self.scaler, f)
    
    def load_model(self, model_path='aqi_lstm_model.h5', scaler_path='aqi_scaler.pkl'):
        """Load model and scaler"""
        self.model = keras.models.load_model(model_path)
        with open(scaler_path, 'rb') as f:
            self.scaler = pickle.load(f)
    
    def get_prediction_confidence(self, predictions):
        """Calculate confidence intervals for predictions"""
        std_dev = np.std(predictions)
        confidence_intervals = []
        
        for pred in predictions:
            confidence_intervals.append({
                'prediction': float(pred),
                'lower_bound': float(max(0, pred - 1.96 * std_dev)),
                'upper_bound': float(pred + 1.96 * std_dev)
            })
        
        return confidence_intervals
