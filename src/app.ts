import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Safe Mode: All routes are disabled. If you see this, the core app is fine!' 
  });
});

/* 
Temporarily disabled to find the "Import Bomb":
import authRoutes from './routes/auth.routes';
import destinationRoutes from './routes/destination.routes';
import bookingRoutes from './routes/booking.routes';
import favoriteRoutes from './routes/favorite.routes';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/destinations', destinationRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/favorites', favoriteRoutes);
*/

export default app;
