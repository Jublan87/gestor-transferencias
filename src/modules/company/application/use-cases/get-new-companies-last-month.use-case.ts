import { Inject } from '@nestjs/common';
import { CompanyRepositoryPort } from '../ports/company.repository.port';
import { Company } from '../../domain/entity/company.entity';

export class GetCompaniesLastMonthUseCase {
  constructor(
    @Inject('CompanyRepositoryPort')
    private readonly companyRepository: CompanyRepositoryPort,
  ) {}

  async execute(): Promise<Company[]> {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return await this.companyRepository.findAdheredBetween(start, now);
  }
}
