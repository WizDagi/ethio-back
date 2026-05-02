import { z } from 'zod';

export const createBookingSchema = z.object({
  body: z.object({
    destinationId: z.string().uuid('Invalid destination ID'),
    startDate: z.string().datetime()
      .or(z.date())
      .transform(val => new Date(val)),
    endDate: z.string().datetime()
      .or(z.date())
      .transform(val => new Date(val))
  }).superRefine((data, ctx) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (data.startDate < today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Cannot book past dates',
        path: ['startDate']
      });
    }

    if (data.endDate <= data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid date range: End date must be after start date',
        path: ['endDate']
      });
    }
  })
});
