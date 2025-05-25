import { Company } from '../../domain/entity/company.entity';

export interface CompanyRepositoryPort {
  save(company: Company): Promise<Company>;
  findAdheredBetween(start: Date, end: Date): Promise<Company[]>;
  findByCuits(cuits: string[]): Promise<Company[]>;
}
