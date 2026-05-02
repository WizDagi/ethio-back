import { z } from 'zod';

export const createDestinationSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    image: z.string().url('Must be a valid URL'),
    location: z.string().min(2, 'Location is required'),
    category: z.string().min(2, 'Category is required')
  })
});

export const updateDestinationSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    description: z.string().min(10).optional(),
    image: z.string().url().optional(),
    location: z.string().min(2).optional(),
    category: z.string().min(2).optional()
  })
});
