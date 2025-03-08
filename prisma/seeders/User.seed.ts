import { BcryptHasherRepository } from '../../src/infra/modules/cryptography/bcrypt/repositories/BcryptHasher.repository';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const UserSeed = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
) => {
  const passwordHash = await new BcryptHasherRepository().hash('123456');

  const USERS = [
    {
      id: '13c3b49f-e80b-4d84-8f98-2d5f2be8b1ba',
      nome: 'Administrador',
      sobrenome: 'do Sistema',
      cpf: '00000000000',
      dataNascimento: '2021-01-01',
      sexo: 'M',
      telefone: '00000000000',
      email: 'admin@admin.com',
      user: '00000000000',
      password: passwordHash,
      idPerfil: '63648f3a-df09-4ebc-a9bb-b6b9238bb12f',
    },
  ];

  for (const user of USERS) {
    await prisma.pacientes.upsert({
      where: {
        id: user.id,
      },
      update: {},
      create: {
        ...user,
      },
    });
  }
};
