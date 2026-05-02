import prisma from '../lib/prisma';

export const addFavorite = async (userId: string, destinationId: string) => {
  // Utilizing the @@unique([userId, destinationId]) constraint under the hood
  // But we can check first to return a clean error
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_destinationId: {
        userId,
        destinationId
      }
    }
  });

  if (existing) {
    throw new Error('Already in favorites');
  }

  return await prisma.favorite.create({
    data: { userId, destinationId }
  });
};

export const removeFavorite = async (userId: string, destinationId: string) => {
  // Prisma unique compound delete
  return await prisma.favorite.delete({
    where: {
      userId_destinationId: {
        userId,
        destinationId
      }
    }
  });
};

export const getUserFavorites = async (userId: string) => {
  return await prisma.favorite.findMany({
    where: { userId },
    include: {
      destination: true
    }
  });
};
