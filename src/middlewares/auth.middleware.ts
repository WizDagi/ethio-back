import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ status: 'fail', message: 'Unauthorized, token missing' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'supersecretfallback';
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: 'fail', message: 'Unauthorized, token invalid' });
  }
};
