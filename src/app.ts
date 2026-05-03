import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import destinationRoutes from './routes/destination.routes';

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
    message: 'Safe Mode: Destinations are enabled and working!' 
  });
});

app.use('/api/v1/destinations', destinationRoutes);

/* 
Still disabled to isolate the crash:
import authRoutes from './routes/auth.routes';
import bookingRoutes from './routes/booking.routes';
import favoriteRoutes from './routes/favorite.routes';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/favorites', favoriteRoutes);
*/

export default app;
