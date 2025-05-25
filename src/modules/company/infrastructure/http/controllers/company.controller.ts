import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GetCompaniesWithTransfersLastMonthUseCase } from '../../../application/use-cases/get-transfers-last-month.use-case';
import { GetCompaniesLastMonthUseCase } from '../../../application/use-cases/get-new-companies-last-month.use-case';
import { AdhereCompanyUseCase } from '../../../application/use-cases/adhere-company.use-case';
import { AdhereCompanyDto } from '../dtos/company.dto';
import { Company } from '../../../domain/entity/company.entity';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly getCompaniesWithTransfersLastMonthUseCase: GetCompaniesWithTransfersLastMonthUseCase,
    private readonly getCompaniesLastMonthUseCase: GetCompaniesLastMonthUseCase,
    private readonly adhereCompanyUseCase: AdhereCompanyUseCase,
  ) {}

  @Get('transfers-last-month')
  async getWithTransfers(): Promise<any> {
    try {
      return await this.getCompaniesWithTransfersLastMonthUseCase.execute();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('new-last-month')
  async getNewAdhered(): Promise<Company[]> {
    try {
      return await this.getCompaniesLastMonthUseCase.execute();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
