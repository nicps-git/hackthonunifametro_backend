import { ApiProperty } from '@nestjs/swagger';

export class ListarAgendamentosMedicoDTO {
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
        paciente: {
          nome: 'Nome',
          sobrenome: 'Sobrenome',
          cpf: '000.000.000-00',
          dataNascimento: '2021-01-01',
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
    paciente: {
      nome: string;
      sobrenome: string;
      cpf: string;
      dataNascimento: string;
    };
    consulta?: {
      laudoMedico: string;
      prescricaoMedica: string;
      afastamento: Date;
      retorno: Date;
    };
  }>;
}
