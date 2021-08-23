import { levels } from './parkingLevel';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  for (const data of levels) {
    await prisma.parkingLevel.upsert({
      where: { level: data.level },
      update: {},
      create: data,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
