import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const PerfisSeed = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
) => {
  const PERFIS = [
    {
      id: '63648f3a-df09-4ebc-a9bb-b6b9238bb12f',
      nome: 'Admin',
      descricao: 'Perfil com permissão total ao sistema',
    },
    {
      id: '29edbfd2-f4b0-4700-afca-e613985ebee5',
      nome: 'Gerente',
      descricao: 'Perfil de permissão parcial ao sistema',
    },
    {
      id: 'c3b2a0f7-5b7c-4d7f-8a1c-2b6b3f1e0b3b',
      nome: 'Atendente',
      descricao: 'Perfil de permissão de atendimento ao paciente',
    },
    {
      id: 'e3b2a0f7-5b7c-4d7f-8a1c-2b6b3f1e0b3b',
      nome: 'Médico',
      descricao: 'Perfil de permissão de mpedico ao sistema',
    },
    {
      id: 'f3b2a0f7-5b7c-4d7f-8a1c-2b6b3f1e0b3b',
      nome: 'Paciente',
      descricao: 'Perfil de permissão de paciente ao sistema',
    },
  ];

  for (const profile of PERFIS) {
    await prisma.perfis.upsert({
      where: {
        id: profile.id,
      },
      update: {},
      create: {
        ...profile,
      },
    });
  }
};
