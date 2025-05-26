import { Inject } from '@nestjs/common';
import { TransferRepositoryPort } from '../ports/transfer.repository.port';
import { CompanyRepositoryPort } from '../ports/company.repository.port';
import { Company } from '../../domain/entity/company.entity';

export class GetCompaniesWithTransfersLastMonthUseCase {
  constructor(
    @Inject('TransferRepositoryPort')
    private readonly transferRepository: TransferRepositoryPort,
    @Inject('CompanyRepositoryPort')
    private readonly companyRepository: CompanyRepositoryPort,
  ) {}

  async execute(): Promise<Company[]> {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);

    const companyCuits =
      await this.transferRepository.findCompaniesWithTransfersBetween(
        start,
        now,
      );

    const companies = await this.companyRepository.findByCuits(companyCuits);

    return companies;
  }
}
