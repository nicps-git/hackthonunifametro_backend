import { ApiProperty } from '@nestjs/swagger';

export class ListarAgendamentosPacienteDTO {
  @ApiProperty({
    example: [
      {
        id: '1',
        data: '2021-01-01',
        horario: '08:00',
        situacao: 'Aguardando',
        observacao: 'Observação',
        createdAt: '2021-01-01T00:00:00',
        updatedAt: '2021-01-01T00:00:00',
        status: 'Agendado',
        medico: {
          nome: 'Nome',
          sobrenome: 'Sobrenome',
          crm: '123456',
          cnpj: '12345678901234',
          especialidade: 'Especialidade',
        },
        consulta: {
          laudoMedico: 'Laudo médico',
          prescricaoMedica: 'Prescrição médica',
          afastamento: '2021-01-01',
          retorno: '2021-01-01',
        },
      },
    ],
  })
  data: Array<{
    id: string;
    data: Date;
    horario: string;
    situacao: string;
    observacao: string | null;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    medico: {
      nome: string;
      sobrenome: string;
      crm: string;
      cnpj: string;
      especialidade: string;
    };
    consulta?: {
      laudoMedico: string;
      prescricaoMedica: string;
      afastamento: Date;
      retorno: Date;
    };
  }>;
}
