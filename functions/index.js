const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'api' });
});

// Your API endpoints here
app.get('/api/aqi', (req, res) => {
  // Add your AQI data logic
  res.json({ message: 'AQI endpoint' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
