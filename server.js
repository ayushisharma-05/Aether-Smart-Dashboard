import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aether')
  .then(() => console.log('Connected to MongoDB - AETHER Database'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic Route for Analytics Data
app.get('/api/analytics', (req, res) => {
  res.json({
    metrics: [
      { name: 'Global Reach', value: '1.2M+' },
      { name: 'Brand Value', value: '$850K' },
      { name: 'Engagement', value: '94.2%' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
