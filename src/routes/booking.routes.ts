import { Router } from 'express';
import * as bookingController from '../controllers/booking.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';
import { createBookingSchema } from '../validations/booking.validation';

const router = Router();

router.use(requireAuth);

router.post('/', validate(createBookingSchema), bookingController.createBooking);
router.get('/', bookingController.getUserBookings);

export default router;
