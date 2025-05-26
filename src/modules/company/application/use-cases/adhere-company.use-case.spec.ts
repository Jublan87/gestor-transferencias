import { AdhereCompanyUseCase } from './adhere-company.use-case';
import { Company } from '../../domain/entity/company.entity';
import { CompanyRepositoryPort } from '../ports/company.repository.port';

describe('AdhereCompanyUseCase', () => {
  let useCase: AdhereCompanyUseCase;
  let companyRepository: jest.Mocked<CompanyRepositoryPort>;

  beforeEach(() => {
    companyRepository = {
      save: jest.fn(),
      findAdheredBetween: jest.fn(),
      findByCuits: jest.fn(),
    } as jest.Mocked<CompanyRepositoryPort>;
    useCase = new AdhereCompanyUseCase(companyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should create and save a company', async () => {
    const cuit = '12345678901';
    const businessName = 'Test Company';
    const adhesionDate = new Date('2024-01-01');
    const company = new Company(cuit, businessName, adhesionDate);

    companyRepository.save.mockResolvedValue(company);

    const result = await useCase.execute(cuit, businessName, adhesionDate);

    expect(result).toBe(company);
    expect(result.cuit).toBe(cuit);
    expect(result.businessName).toBe(businessName);
    expect(result.adhesionDate).toEqual(adhesionDate);
  });

  it('should propagate errors from the repository', async () => {
    const cuit = '12345678901';
    const businessName = 'Test Company';
    const adhesionDate = new Date('2024-01-01');
    const error = new Error('Repository error');

    companyRepository.save.mockRejectedValue(error);

    await expect(
      useCase.execute(cuit, businessName, adhesionDate),
    ).rejects.toThrow('Repository error');
  });
});
