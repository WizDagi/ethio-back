import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import destinationRoutes from './routes/destination.routes';
import bookingRoutes from './routes/booking.routes';
import favoriteRoutes from './routes/favorite.routes';

const app = express();

// 1. CORS Configuration
app.use(cors({
  origin: ['https://ethio-tour-7fcj.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(cookieParser());

// 2. Health check (Verify app is alive)
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Backend is fully operational!' 
  });
});

// 3. Routes (Re-enabling all features)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/destinations', destinationRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/favorites', favoriteRoutes);

// 4. Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

export default app;
