import { GetCompaniesLastMonthUseCase } from './get-new-companies-last-month.use-case';
import { CompanyRepositoryPort } from '../ports/company.repository.port';
import { Company } from '../../domain/entity/company.entity';

describe('GetCompaniesLastMonthUseCase', () => {
  let useCase: GetCompaniesLastMonthUseCase;
  let companyRepository: jest.Mocked<CompanyRepositoryPort>;

  beforeEach(() => {
    companyRepository = {
      save: jest.fn(),
      findAdheredBetween: jest.fn(),
      findByCuits: jest.fn(),
    } as jest.Mocked<CompanyRepositoryPort>;
    useCase = new GetCompaniesLastMonthUseCase(companyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call companyRepository.findAdheredBetween with correct dates', async () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    companyRepository.findAdheredBetween.mockResolvedValue([]);

    await useCase.execute();

    expect(companyRepository.findAdheredBetween).toHaveBeenCalledWith(
      start,
      expect.any(Date),
    );
  });

  it('should return companies from repository', async () => {
    const companies: Company[] = [
      {
        id: '1',
        name: 'Company 1',
        cuit: '20123456781',
        businessName: 'Company 1 S.A.',
        adhesionDate: new Date('2023-01-01'),
      } as Company,
      {
        id: '2',
        name: 'Company 2',
        cuit: '20987654321',
        businessName: 'Company 2 S.A.',
        adhesionDate: new Date('2023-01-02'),
      } as Company,
    ];
    companyRepository.findAdheredBetween.mockResolvedValue(companies);

    const result = await useCase.execute();

    expect(result).toEqual(companies);
  });

  it('should handle empty result', async () => {
    companyRepository.findAdheredBetween.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
  });

  it('should propagate errors from repository', async () => {
    companyRepository.findAdheredBetween.mockRejectedValue(
      new Error('DB error'),
    );

    await expect(useCase.execute()).rejects.toThrow('DB error');
  });
});
