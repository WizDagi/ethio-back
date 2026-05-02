import prisma from '../lib/prisma';

export const createBooking = async (userId: string, data: { destinationId: string, startDate: Date, endDate: Date }) => {
  // Prevent duplicate exact booking
  const existing = await prisma.booking.findFirst({
    where: {
      userId,
      destinationId: data.destinationId,
      startDate: data.startDate,
      endDate: data.endDate
    }
  });

  if (existing) {
    throw new Error('Duplicate booking: You already have this trip booked for these exact dates.');
  }

  return await prisma.booking.create({
    data: {
      userId,
      destinationId: data.destinationId,
      startDate: data.startDate,
      endDate: data.endDate
    },
    include: {
      destination: true
    }
  });
};

export const getUserBookings = async (userId: string) => {
  return await prisma.booking.findMany({
    where: { userId },
    include: {
      destination: true
    },
    orderBy: {
      startDate: 'asc'
    }
  });
};
