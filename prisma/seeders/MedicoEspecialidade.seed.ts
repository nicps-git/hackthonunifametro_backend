import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const MedicoEspecialidadeSeed = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
) => {
  const MEDICOESPECIALIDADE = [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      nome: 'Clínica Médica',
      descricao: 'Atendimento geral adulto',
    },
    {
      id: '6f9619ff-8b86-d011-b42d-00cf4fc964ff',
      nome: 'Medicina de Família',
      descricao: 'Cuidados contínuos gerais',
    },
    {
      id: 'b4d0c01a-8c42-4e9d-91a2-49d1f4b79e05',
      nome: 'Geriatria',
      descricao: 'Saúde do idoso',
    },
    {
      id: '73dd5e57-3f05-4b24-9974-334e1f5b21f2',
      nome: 'Cirurgia Geral',
      descricao: 'Procedimentos cirúrgicos',
    },
    {
      id: '81c4e7e8-6e7e-4d9a-91e9-2e74f48f3dcb',
      nome: 'Ortopedia',
      descricao: 'Ossos e articulações',
    },
    {
      id: '3c2f4101-4e0a-4b2b-94da-ff3f9f9e2aaf',
      nome: 'Cardiologia',
      descricao: 'Coração e circulação',
    },
    {
      id: '912ec803-bb2c-4c9d-89e6-87294b95d769',
      nome: 'Endocrinologia',
      descricao: 'Hormônios e metabolismo',
    },
    {
      id: 'aaf4c61d-dcc5-4c3c-a6e8-2c4a7e57c9f3',
      nome: 'Gastroenterologia',
      descricao: 'Sistema digestivo',
    },
    {
      id: '3b9d3e3b-30b1-4c34-b467-c5793f45f27c',
      nome: 'Pediatria',
      descricao: 'Saúde infantil',
    },
    {
      id: '9e107d9d-372b-4b6f-94e0-9677f8b17af3',
      nome: 'Ginecologia',
      descricao: 'Saúde da mulher',
    },
    {
      id: '24b2e0c5-53c5-45a8-bf14-69fd29363b4e',
      nome: 'Psiquiatria',
      descricao: 'Saúde mental',
    },
    {
      id: '2fd4e1c6-99a6-4a4a-bf34-6c8c0ab5edc3',
      nome: 'Dermatologia',
      descricao: 'Pele e anexos',
    },
    {
      id: 'c1dfd96e-29e1-4b35-99f1-6d0dfb8b2f3f',
      nome: 'Oftalmologia',
      descricao: 'Olhos e visão',
    },
    {
      id: 'a87ff679-a2f3-4f2b-906f-2c6c4b71edc3',
      nome: 'Otorrinolaringologia',
      descricao: 'Ouvido, nariz e garganta',
    },
    {
      id: 'e4da3b7f-bbce-4a35-a127-8a6f18b2b9e5',
      nome: 'Urologia',
      descricao: 'Aparelho urinário',
    },
  ];

  for (const medicoEspecialidade of MEDICOESPECIALIDADE) {
    await prisma.medicoEspecialidade.upsert({
      where: {
        id: medicoEspecialidade.id,
      },
      update: {},
      create: {
        ...medicoEspecialidade,
      },
    });
  }
};
