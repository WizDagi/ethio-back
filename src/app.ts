import express from 'express';

const app = express();

// TOTAL ISOLATION MODE
// We are disabling ALL imports to find the crash point
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Total Isolation Mode: The core app is working!' 
  });
});

/* 
Temporarily disabled to find the crash point:
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import destinationRoutes from './routes/destination.routes';
import bookingRoutes from './routes/booking.routes';
import favoriteRoutes from './routes/favorite.routes';
*/

export default app;
