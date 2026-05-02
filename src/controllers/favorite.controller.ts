import { Request, Response, NextFunction } from 'express';
import * as favoriteService from '../services/favorite.service';

export const addFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const destinationId = req.params.destinationId as string;
    
    await favoriteService.addFavorite(userId, destinationId);
    
    res.status(201).json({
      status: 'success',
      data: { message: 'Added to favorites' }
    });
  } catch (error: any) {
    if (error.message === 'Already in favorites') {
      return res.status(400).json({ status: 'fail', message: error.message });
    }
    next(error);
  }
};

export const removeFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const destinationId = req.params.destinationId as string;

    await favoriteService.removeFavorite(userId, destinationId);

    // According to REST specs, 204 No Content or 200 OK
    res.status(200).json({
      status: 'success',
      data: { message: 'Removed from favorites' }
    });
  } catch (error: any) {
    // If it doesn't exist, prisma throws a P2025 error on delete
    if (error.code === 'P2025') {
      return res.status(404).json({ status: 'fail', message: 'Favorite not found' });
    }
    next(error);
  }
};

export const getUserFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    
    const favorites = await favoriteService.getUserFavorites(userId);
    
    res.status(200).json({
      status: 'success',
      data: { favorites }
    });
  } catch (error) {
    next(error);
  }
};
