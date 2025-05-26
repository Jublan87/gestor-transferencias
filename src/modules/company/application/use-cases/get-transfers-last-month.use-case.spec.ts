import { GetCompaniesWithTransfersLastMonthUseCase } from './get-transfers-last-month.use-case';
import { TransferRepositoryPort } from '../ports/transfer.repository.port';
import { CompanyRepositoryPort } from '../ports/company.repository.port';
import { Company } from '../../domain/entity/company.entity';

describe('GetCompaniesWithTransfersLastMonthUseCase', () => {
  let transferRepository: jest.Mocked<TransferRepositoryPort>;
  let companyRepository: jest.Mocked<CompanyRepositoryPort>;
  let useCase: GetCompaniesWithTransfersLastMonthUseCase;

  beforeEach(() => {
    transferRepository = {
      findCompaniesWithTransfersBetween: jest.fn(),
    } as jest.Mocked<TransferRepositoryPort>;

    companyRepository = {
      save: jest.fn(),
      findAdheredBetween: jest.fn(),
      findByCuits: jest.fn(),
    } as jest.Mocked<CompanyRepositoryPort>;

    useCase = new GetCompaniesWithTransfersLastMonthUseCase(
      transferRepository,
      companyRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should return companies with transfers in the last month', async () => {
    const cuits = ['123', '456'];
    const companies: Company[] = [
      {
        cuit: '123',
        businessName: 'Company A',
        adhesionDate: new Date(),
      } as Company,
      {
        cuit: '456',
        businessName: 'Company B',
        adhesionDate: new Date(),
      } as Company,
    ];

    transferRepository.findCompaniesWithTransfersBetween.mockResolvedValue(
      cuits,
    );
    companyRepository.findByCuits.mockResolvedValue(companies);

    const result = await useCase.execute();

    expect(
      transferRepository.findCompaniesWithTransfersBetween,
    ).toHaveBeenCalledTimes(1);
    expect(companyRepository.findByCuits).toHaveBeenCalledWith(cuits);
    expect(result).toEqual(companies);
  });

  it('should return empty array if no companies have transfers', async () => {
    transferRepository.findCompaniesWithTransfersBetween.mockResolvedValue([]);
    companyRepository.findByCuits.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(companyRepository.findByCuits).toHaveBeenCalledWith([]);
  });

  it('should call findCompaniesWithTransfersBetween with correct dates', async () => {
    const now = new Date();
    jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => now as unknown as Date);

    transferRepository.findCompaniesWithTransfersBetween.mockResolvedValue([]);
    companyRepository.findByCuits.mockResolvedValue([]);

    await useCase.execute();

    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    expect(
      transferRepository.findCompaniesWithTransfersBetween,
    ).toHaveBeenCalledWith(start, now);
  });

  it('should propagate errors from transferRepository', async () => {
    transferRepository.findCompaniesWithTransfersBetween.mockRejectedValue(
      new Error('DB error'),
    );

    await expect(useCase.execute()).rejects.toThrow('DB error');
  });

  it('should propagate errors from companyRepository', async () => {
    transferRepository.findCompaniesWithTransfersBetween.mockResolvedValue([
      '123',
    ]);
    companyRepository.findByCuits.mockRejectedValue(new Error('Repo error'));

    await expect(useCase.execute()).rejects.toThrow('Repo error');
  });
});
