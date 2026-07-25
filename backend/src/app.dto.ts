import { ApiProperty } from '@nestjs/swagger';

export class ApiRootResponseDto {
  @ApiProperty({ example: 'Biotech TTU API' })
  name: string;

  @ApiProperty({ example: 'ok' })
  status: string;

  @ApiProperty({ example: '/api/v1' })
  api: string;

  @ApiProperty({ example: '/api/docs' })
  documentation: string;
}
