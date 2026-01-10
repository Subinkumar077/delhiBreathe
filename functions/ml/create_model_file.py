#!/usr/bin/env python3
# Script to create the aqi_lstm_model.py file

code = '''import torch
import torch.nn as nn
import numpy as np
import pickle

class LSTMModel(nn.Module):
    def __init__(self, input_size=1, hidden_size=64, num_layers=2, dropout=0.2):
        super(LSTMModel, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True, dropout=dropout if num_layers > 1 else 0)
        self.fc = nn.Linear(hidden_size, 1)
    
    def forward(self, x):
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)
        c0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)
        out, _ = self.lstm(x, (h0, c0))
        out = self.fc(out[:, -1, :])
        return out

class AQILSTMPredictor:
    def __init__(self, lookback=30):
        self.lookback = lookback
        self.model = None
        self.scaler = None
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    def create_model(self):
        self.model = LSTMModel(input_size=1, hidden_size=64, num_layers=2, dropout=0.2)
        self.model = self.model.to(self.device)
        return self.model
    
    def prepare_data(self, data, lookback=30):
        X, y = [], []
        for i in range(len(data) - lookback):
            X.append(data[i:i+lookback])
            y.append(data[i+lookback])
        return np.array(X), np.array(y)
    
    def train(self, data, epochs=50, batch_size=32, learning_rate=0.001):
        from sklearn.preprocessing import MinMaxScaler
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        data_normalized = self.scaler.fit_transform(data.reshape(-1, 1)).flatten()
        X, y = self.prepare_data(data_normalized, self.lookback)
        X = torch.FloatTensor(X).unsqueeze(-1).to(self.device)
        y = torch.FloatTensor(y).unsqueeze(-1).to(self.device)
        if self.model is None:
            self.create_model()
        criterion = nn.MSELoss()
        optimizer = torch.optim.Adam(self.model.parameters(), lr=learning_rate)
        self.model.train()
        for epoch in range(epochs):
            outputs = self.model(X)
            loss = criterion(outputs, y)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            if (epoch + 1) % 10 == 0:
                print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.4f}')
        print("✅ Model training completed!")
        return loss.item()
    
    def predict_sequence(self, recent_data, steps=7):
        if self.model is None or self.scaler is None:
            raise ValueError("Model not trained or loaded!")
        self.model.eval()
        predictions = []
        current_sequence = self.scaler.transform(recent_data.reshape(-1, 1)).flatten()
        current_sequence = current_sequence[-self.lookback:]
        with torch.no_grad():
            for _ in range(steps):
                x = torch.FloatTensor(current_sequence[-self.lookback:]).unsqueeze(0).unsqueeze(-1).to(self.device)
                pred = self.model(x)
                pred_value = pred.cpu().numpy()[0, 0]
                predictions.append(pred_value)
                current_sequence = np.append(current_sequence, pred_value)
        predictions = self.scaler.inverse_transform(np.array(predictions).reshape(-1, 1)).flatten()
        return predictions
    
    def predict_daily(self, recent_data, days=7):
        return self.predict_sequence(recent_data, steps=days)
    
    def predict_weekly(self, recent_data, weeks=4):
        daily_predictions = self.predict_sequence(recent_data, steps=weeks*7)
        weekly_predictions = []
        for i in range(weeks):
            week_avg = np.mean(daily_predictions[i*7:(i+1)*7])
            weekly_predictions.append(week_avg)
        return np.array(weekly_predictions)
    
    def predict_monthly(self, recent_data, months=3):
        daily_predictions = self.predict_sequence(recent_data, steps=months*30)
        monthly_predictions = []
        for i in range(months):
            month_avg = np.mean(daily_predictions[i*30:(i+1)*30])
            monthly_predictions.append(month_avg)
        return np.array(monthly_predictions)
    
    def get_prediction_confidence(self, predictions, confidence_level=0.95):
        std = np.std(predictions)
        margin = std * 1.96
        confidences = []
        for pred in predictions:
            confidences.append({
                'prediction': float(pred),
                'lower_bound': float(max(0, pred - margin)),
                'upper_bound': float(pred + margin)
            })
        return confidences
    
    def save_model(self, model_path='models/aqi_lstm_model.pth', scaler_path='models/aqi_scaler.pkl'):
        import os
        os.makedirs('models', exist_ok=True)
        torch.save(self.model.state_dict(), model_path)
        with open(scaler_path, 'wb') as f:
            pickle.dump(self.scaler, f)
        print(f"✅ Model saved to {model_path}")
        print(f"✅ Scaler saved to {scaler_path}")
    
    def load_model(self, model_path='models/aqi_lstm_model.pth', scaler_path='models/aqi_scaler.pkl'):
        with open(scaler_path, 'rb') as f:
            self.scaler = pickle.load(f)
        self.create_model()
        self.model.load_state_dict(torch.load(model_path, map_location=self.device, weights_only=True))
        self.model.eval()
        print(f"✅ Model loaded from {model_path}")
        print(f"✅ Scaler loaded from {scaler_path}")
'''

with open('aqi_lstm_model.py', 'w', encoding='utf-8') as f:
    f.write(code)

print("✅ aqi_lstm_model.py created successfully!")
