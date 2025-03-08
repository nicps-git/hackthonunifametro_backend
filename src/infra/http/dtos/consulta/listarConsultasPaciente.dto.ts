import { ApiProperty } from '@nestjs/swagger';

export class ListarConsultasPacienteDTO {
  @ApiProperty({
    example: [
      {
        id: '1',
        data: '2021-01-01',
        horario: '08:00',
        laudoMedico: 'Laudo médico',
        prescricaoMedica: 'Prescrição médica',
        afastamento: '2021-01-01',
        retorno: '2021-01-01',
        medico: {
          nome: 'Nome',
          sobrenome: 'Sobrenome',
          crm: '123456',
          cnpj: '12345678901234',
          especialidade: 'Especialidade',
        },
      },
    ],
  })
  data: Array<{
    id: string;
    data: Date;
    horario: string;
    laudoMedico: string;
    prescricaoMedica: string;
    afastamento: Date | null;
    retorno: Date | null;
    medico: {
      nome: string;
      sobrenome: string;
      crm: string;
      cnpj: string;
      especialidade: string;
    };
  }>;
}
