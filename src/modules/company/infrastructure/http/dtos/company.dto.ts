import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class AdhereCompanyDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  cuit: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @ApiProperty({ type: String, example: '2023-10-01' })
  @IsString()
  @IsNotEmpty()
  @IsDateString(
    {},
    { message: 'adhesionDate must be an ISO date string (YYYY-MM-DD)' },
  )
  adhesionDate: string;
}
