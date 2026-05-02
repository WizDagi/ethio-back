import { Router } from 'express';
import * as favoriteController from '../controllers/favorite.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.use(requireAuth);

router.post('/:destinationId', favoriteController.addFavorite);
router.delete('/:destinationId', favoriteController.removeFavorite);
router.get('/', favoriteController.getUserFavorites);

export default router;
