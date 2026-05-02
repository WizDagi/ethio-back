import prisma from '../src/lib/prisma';

const destinations = [
  {
    title: 'Gheralta Mountains',
    description: 'Explore the spectacular red-rock mountains of Gheralta, famous for their steep cliffs and ancient rock-hewn churches carved deep into the stone, offering breathtaking views of the Tigray region.',
    image: '/images/destinations/gheralta.jpg',
    location: 'Tigray Region',
    category: 'Nature & History'
  },
  {
    title: 'Fasil Ghebbi, Gondar',
    description: 'Walk through the royal enclosure of Fasil Ghebbi, a fortress city that served as the home of Ethiopia\'s emperors in the 17th and 18th centuries. Known as the "Camelot of Africa," it features stunning medieval castles.',
    image: '/images/destinations/Gonder castle.jpg',
    location: 'Gondar, Amhara Region',
    category: 'Historical'
  },
  {
    title: 'The Obelisk of Axum',
    description: 'Stand before the towering Obelisk of Axum, an ancient stela carved from a single piece of granite. This UNESCO World Heritage site is a testament to the engineering brilliance of the Aksumite Empire.',
    image: '/images/destinations/axum.jpg',
    location: 'Axum, Tigray Region',
    category: 'Historical'
  },
  {
    title: 'Danakil Depression',
    description: 'Witness the otherworldly volcanic landscape of Dallol in the Danakil Depression. Featuring surreal neon green lakes, bubbling sulfur springs, and active volcanoes, it is one of the hottest and lowest places on Earth.',
    image: '/images/destinations/Danakil.jpg',
    location: 'Afar Region',
    category: 'Adventure'
  },
  {
    title: 'Rock-Hewn Churches of Lalibela',
    description: 'Discover the legendary Church of Saint George (Bete Giyorgis), one of eleven monolithic churches carved directly downwards into the volcanic bedrock in the 12th century, known as the "New Jerusalem".',
    image: '/images/destinations/lalibela.jpg',
    location: 'Lalibela, Amhara Region',
    category: 'Historical & Religious'
  },
  {
    title: 'Blue Nile Falls (Tis Abay)',
    description: 'Witness the awesome power of the Blue Nile Falls, locally known as Tis Abay or "Smoking Water," rushing down majestically near Bahir Dar before plunging into the gorge below.',
    image: '/images/destinations/bluenile.jpg',
    location: 'Bahir Dar, Amhara Region',
    category: 'Nature & Landscape'
  }
];

async function main() {
  console.log('Start seeding...');
  
  // Clean existing (optional, but good for resetting)
  await (prisma as any).destination.deleteMany();

  for (const dest of destinations) {
    const destination = await (prisma as any).destination.create({
      data: dest
    });
    console.log(`Created destination with id: ${destination.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
