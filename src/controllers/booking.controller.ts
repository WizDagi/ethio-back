import { Request, Response, NextFunction } from 'express';
import * as bookingService from '../services/booking.service';

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const booking = await bookingService.createBooking(userId, req.body);
    res.status(201).json({
      status: 'success',
      data: { booking }
    });
  } catch (error: any) {
    if (error.message && error.message.includes('Duplicate booking')) {
      return res.status(400).json({ status: 'fail', message: error.message });
    }
    next(error);
  }
};

export const getUserBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const bookings = await bookingService.getUserBookings(userId);
    res.status(200).json({
      status: 'success',
      data: { bookings }
    });
  } catch (error) {
    next(error);
  }
};
