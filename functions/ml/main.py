"""
Main entry point for ML prediction service on Render
"""
import os
from flask import Flask, request, jsonify
from predict_service import predict_aqi

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'ml-prediction'}), 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract required parameters
        location = data.get('location')
        historical_data = data.get('historical_data')
        
        if not location or not historical_data:
            return jsonify({'error': 'Missing required parameters'}), 400
        
        # Make prediction
        prediction = predict_aqi(historical_data)
        
        return jsonify({
            'location': location,
            'prediction': prediction,
            'status': 'success'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
