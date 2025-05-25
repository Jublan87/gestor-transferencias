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

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  adhesionDate: string;
}
