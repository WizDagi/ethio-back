import prisma from '../lib/prisma';

export const getAllDestinations = async () => {
  return await prisma.destination.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

export const getDestinationById = async (id: string) => {
  return await prisma.destination.findUnique({
    where: { id }
  });
};

export const createDestination = async (data: any) => {
  return await prisma.destination.create({
    data: {
      title: data.title,
      description: data.description,
      image: data.image,
      location: data.location,
      category: data.category
    }
  });
};

export const updateDestination = async (id: string, data: any) => {
  return await prisma.destination.update({
    where: { id },
    data
  });
};

export const deleteDestination = async (id: string) => {
  return await prisma.destination.delete({
    where: { id }
  });
};
