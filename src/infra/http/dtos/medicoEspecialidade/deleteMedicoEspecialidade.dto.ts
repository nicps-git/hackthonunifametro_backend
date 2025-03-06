import { ApiProperty } from '@nestjs/swagger';

export class DeleteMedicoEspecialidadeDTO {
  @ApiProperty({ description: 'Id do medicoEspecialidade', example: '123456' })
  id: string;
}
