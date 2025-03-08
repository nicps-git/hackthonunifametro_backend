import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const StatusAgendamentoSeed = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
) => {
  const STATUSAGENDAMENTO = [
    {
      id: '8694e5ab-44cd-47bf-9050-51b53ba7b816',
      nome: 'Agendado',
      descricao: 'Agendamento realizado',
    },
    {
      id: '6fee2d61-0a60-4f60-b3b0-17265a453bc5',
      nome: 'Cancelado',
      descricao: 'Agendamento cancelado',
    },
    {
      id: '2f526b2d-455b-459f-a7b0-89a2c28e9b64',
      nome: 'Em andamento',
      descricao: 'Agendamento em andamento',
    },
    {
      id: 'e23c0643-5133-43dc-a75f-5ec6dfc9a233',
      nome: 'Finalizado',
      descricao: 'Agendamento finalizado',
    },
  ];

  for (const statusAgendamento of STATUSAGENDAMENTO) {
    await prisma.statusAgendamento.upsert({
      where: {
        id: statusAgendamento.id,
      },
      update: {},
      create: {
        ...statusAgendamento,
      },
    });
  }
};
