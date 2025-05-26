import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { GetCompaniesWithTransfersLastMonthUseCase } from '../../../application/use-cases/get-transfers-last-month.use-case';
import { GetCompaniesLastMonthUseCase } from '../../../application/use-cases/get-new-companies-last-month.use-case';
import { AdhereCompanyUseCase } from '../../../application/use-cases/adhere-company.use-case';
import { AdhereCompanyDto } from '../dtos/company.dto';
import { Company } from '../../../domain/entity/company.entity';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  private readonly logger = new Logger(CompanyController.name);

  constructor(
    private readonly getCompaniesWithTransfersLastMonthUseCase: GetCompaniesWithTransfersLastMonthUseCase,
    private readonly getCompaniesLastMonthUseCase: GetCompaniesLastMonthUseCase,
    private readonly adhereCompanyUseCase: AdhereCompanyUseCase,
  ) {}

  @Get('with-transfers-last-month')
  @ApiOperation({
    summary: 'Obtener empresas con transferencias en el último mes',
    description:
      'Devuelve las empresas que realizaron transferencias en el último mes.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de empresas con transferencias',
  })
  async getWithTransfers(): Promise<Company[]> {
    try {
      return await this.getCompaniesWithTransfersLastMonthUseCase.execute();
    } catch (err) {
      if (err instanceof HttpException) throw err;
      this.logger.error('Unexpected error in getWithTransfers', err);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('new-last-month')
  @ApiOperation({
    summary: 'Obtener nuevas empresas adheridas en el último mes',
    description: 'Devuelve las empresas que se adhirieron en el último mes.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de nuevas empresas adheridas',
  })
  async getNewAdhered(): Promise<Company[]> {
    try {
      return await this.getCompaniesLastMonthUseCase.execute();
    } catch (err) {
      if (err instanceof HttpException) throw err;
      this.logger.error('Unexpected error in getNewAdhered', err);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('adhere')
  @ApiOperation({
    summary: 'Adherir una nueva empresa',
    description: 'Adhiere una nueva empresa al sistema.',
  })
  @ApiBody({ type: AdhereCompanyDto })
  @ApiResponse({
    status: 201,
    description: 'Empresa adherida correctamente',
  })
  async adhere(@Body() dto: AdhereCompanyDto): Promise<Company> {
    try {
      return await this.adhereCompanyUseCase.execute(
        dto.cuit,
        dto.businessName,
        new Date(dto.adhesionDate),
      );
    } catch (err) {
      if (err instanceof HttpException) throw err;
      this.logger.error('Unexpected error in adhere', err);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
