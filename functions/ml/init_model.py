import os
import pandas as pd
import numpy as np
from aqi_lstm_model import AQILSTMPredictor

# Create models directory if it doesn't exist
if not os.path.exists('models'):
    os.makedirs('models')

# Create dummy data just to initialize the file structure
print("Generating initial model files...")
data = {'aqi': np.random.randint(50, 150, 100)} 
df = pd.DataFrame(data)

# Train quickly and save
predictor = AQILSTMPredictor(lookback=30)
predictor.train(df, epochs=1) 
predictor.save_model('models/aqi_lstm_model.h5', 'models/aqi_scaler.pkl')
print("✅ Model files created successfully.")