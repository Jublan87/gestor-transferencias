import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GetCompaniesWithTransfersLastMonthUseCase } from '../../../application/use-cases/get-transfers-last-month.use-case';
import { GetCompaniesLastMonthUseCase } from '../../../application/use-cases/get-new-companies-last-month.use-case';
import { AdhereCompanyUseCase } from '../../../application/use-cases/adhere-company.use-case';
import { AdhereCompanyDto } from '../dtos/company.dto';
import { Company } from '../../../domain/entity/company.entity';

@Controller('companies')
export class CompanyController {
  private readonly logger = new Logger(CompanyController.name);

  constructor(
    private readonly getCompaniesWithTransfersLastMonthUseCase: GetCompaniesWithTransfersLastMonthUseCase,
    private readonly getCompaniesLastMonthUseCase: GetCompaniesLastMonthUseCase,
    private readonly adhereCompanyUseCase: AdhereCompanyUseCase,
  ) {}

  @Get('with-transfers-last-month')
  async getWithTransfers(): Promise<any> {
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
