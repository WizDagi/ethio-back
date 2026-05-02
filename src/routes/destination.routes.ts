import { Router } from 'express';
import * as destinationController from '../controllers/destination.controller';
import { validate } from '../middlewares/validate';
import { requireAuth } from '../middlewares/auth.middleware';
import { createDestinationSchema, updateDestinationSchema } from '../validations/destination.validation';

const router = Router();

router.get('/', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);

// Protected routes (No admin check as requested, just auth)
router.post('/', requireAuth, validate(createDestinationSchema), destinationController.createDestination);
router.put('/:id', requireAuth, validate(updateDestinationSchema), destinationController.updateDestination);
router.delete('/:id', requireAuth, destinationController.deleteDestination);

export default router;
