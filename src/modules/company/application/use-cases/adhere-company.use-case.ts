import { Inject } from '@nestjs/common';
import { Company } from '../../domain/entity/company.entity';
import { CompanyRepositoryPort } from '../ports/company.repository.port';

export class AdhereCompanyUseCase {
  constructor(
    @Inject('CompanyRepositoryPort')
    private readonly companyRepository: CompanyRepositoryPort,
  ) {}

  async execute(
    cuit: string,
    businessName: string,
    adhesionDate: Date,
  ): Promise<Company> {
    const company = new Company(cuit, businessName, adhesionDate);
    return await this.companyRepository.save(company);
  }
}
