import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiRoutes } from './routes/api';
import { errorHandler } from './middleware/errorHandler';
import { testConnection, initializeDatabase } from './config/database';

// Load environment variables - support both .env.local (dev) and .env (production)
dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Honda Bolinao Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

app.listen(PORT, async () => {
  console.log(`🚗 Honda Bolinao Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
  
  // Test database connection and initialize tables
  const connected = await testConnection();
  if (connected) {
    try {
      await initializeDatabase();
      console.log('🗄️ Database ready for operations');
    } catch (error) {
      console.error('⚠️ Database initialization failed:', error);
    }
  } else {
    console.error('⚠️ Starting server without database connection');
  }
});

export default app;