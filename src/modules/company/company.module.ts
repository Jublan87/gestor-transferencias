import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdhereCompanyUseCase } from './application/use-cases/adhere-company.use-case';
import { GetCompaniesLastMonthUseCase } from './application/use-cases/get-new-companies-last-month.use-case';
import { GetCompaniesWithTransfersLastMonthUseCase } from './application/use-cases/get-transfers-last-month.use-case';
import { CompanyController } from './infrastructure/http/controllers/company.controller';
import { MongoCompanyRepository } from './infrastructure/repositories/company.repository';
import { MongoTransferRepository } from './infrastructure/repositories/transfer.repository';
import { CompanySchema } from './infrastructure/schemas/company.schema';
import { TransferSchema } from './infrastructure/schemas/transfer.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'Company', schema: CompanySchema },
      { name: 'Transfer', schema: TransferSchema },
    ]),
  ],
  controllers: [CompanyController],
  providers: [
    {
      provide: 'CompanyRepositoryPort',
      useClass: MongoCompanyRepository,
    },
    {
      provide: 'TransferRepositoryPort',
      useClass: MongoTransferRepository,
    },
    MongoTransferRepository,
    GetCompaniesWithTransfersLastMonthUseCase,
    GetCompaniesLastMonthUseCase,
    AdhereCompanyUseCase,
  ],
  exports: [],
})
export class CompanyModule {}
