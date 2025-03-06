import { PrismaClient } from '@prisma/client';
import { PerfisSeed } from './seeders/Perfis.seed';
import { MedicoEspecialidadeSeed } from './seeders/MedicoEspecialidade.seed';

const prisma = new PrismaClient();

const main = async () => {
  await PerfisSeed(prisma);
  await MedicoEspecialidadeSeed(prisma);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
