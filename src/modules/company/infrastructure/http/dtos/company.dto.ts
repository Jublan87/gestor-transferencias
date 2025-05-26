import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

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
  @Matches(/^\d{4}\/\d{2}\/\d{2}$/, {
    message: 'adhesionDate must be in the format AAAA/MM/DD',
  })
  adhesionDate: string;
}
