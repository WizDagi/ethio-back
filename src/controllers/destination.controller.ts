import { Request, Response, NextFunction } from 'express';
import * as destinationService from '../services/destination.service';

export const getAllDestinations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const destinations = await destinationService.getAllDestinations();
    res.status(200).json({
      status: 'success',
      data: { destinations }
    });
  } catch (error) {
    next(error);
  }
};

export const getDestinationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const destination = await destinationService.getDestinationById(id);
    if (!destination) {
      return res.status(404).json({ status: 'fail', message: 'Destination not found' });
    }
    res.status(200).json({
      status: 'success',
      data: { destination }
    });
  } catch (error) {
    next(error);
  }
};

export const createDestination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newDestination = await destinationService.createDestination(req.body);
    res.status(201).json({
      status: 'success',
      data: { destination: newDestination }
    });
  } catch (error) {
    next(error);
  }
};

export const updateDestination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const target = await destinationService.getDestinationById(id);
    if (!target) {
      return res.status(404).json({ status: 'fail', message: 'Destination not found' });
    }
    const updated = await destinationService.updateDestination(id, req.body);
    res.status(200).json({
      status: 'success',
      data: { destination: updated }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDestination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const target = await destinationService.getDestinationById(id);
    if (!target) {
      return res.status(404).json({ status: 'fail', message: 'Destination not found' });
    }
    await destinationService.deleteDestination(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
