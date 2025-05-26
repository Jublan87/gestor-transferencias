import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { GetCompaniesWithTransfersLastMonthUseCase } from '../../../application/use-cases/get-transfers-last-month.use-case';
import { GetCompaniesLastMonthUseCase } from '../../../application/use-cases/get-new-companies-last-month.use-case';
import { AdhereCompanyUseCase } from '../../../application/use-cases/adhere-company.use-case';
import { AdhereCompanyDto } from '../dtos/company.dto';
import { Company } from '../../../domain/entity/company.entity';
import { HttpException } from '@nestjs/common';

describe('CompanyController', () => {
  let controller: CompanyController;
  let getCompaniesWithTransfersLastMonthUseCase: GetCompaniesWithTransfersLastMonthUseCase;
  let getCompaniesLastMonthUseCase: GetCompaniesLastMonthUseCase;
  let adhereCompanyUseCase: AdhereCompanyUseCase;

  beforeEach(async () => {
    getCompaniesWithTransfersLastMonthUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetCompaniesWithTransfersLastMonthUseCase>;

    getCompaniesLastMonthUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetCompaniesLastMonthUseCase>;

    adhereCompanyUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<AdhereCompanyUseCase>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: GetCompaniesWithTransfersLastMonthUseCase,
          useValue: getCompaniesWithTransfersLastMonthUseCase,
        },
        {
          provide: GetCompaniesLastMonthUseCase,
          useValue: getCompaniesLastMonthUseCase,
        },
        { provide: AdhereCompanyUseCase, useValue: adhereCompanyUseCase },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('getWithTransfers', () => {
    it('should return companies with transfers', async () => {
      const result = [{ id: 1 }];
      (
        getCompaniesWithTransfersLastMonthUseCase.execute as jest.Mock
      ).mockResolvedValue(result);
      expect(await controller.getWithTransfers()).toBe(result);
    });

    it('should throw HttpException on error', async () => {
      (
        getCompaniesWithTransfersLastMonthUseCase.execute as jest.Mock
      ).mockRejectedValue(new Error('fail'));
      await expect(controller.getWithTransfers()).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('getNewAdhered', () => {
    it('should return new companies', async () => {
      const companies: Company[] = [
        {
          cuit: '123456789',
          businessName: 'Test Company',
          adhesionDate: new Date(),
        },
      ];
      (getCompaniesLastMonthUseCase.execute as jest.Mock).mockResolvedValue(
        companies,
      );
      expect(await controller.getNewAdhered()).toBe(companies);
    });

    it('should throw HttpException on error', async () => {
      (getCompaniesLastMonthUseCase.execute as jest.Mock).mockRejectedValue(
        new Error('fail'),
      );
      await expect(controller.getNewAdhered()).rejects.toThrow(HttpException);
    });
  });

  describe('adhere', () => {
    it('should adhere a company', async () => {
      const dto: AdhereCompanyDto = {
        cuit: '123',
        businessName: 'Test',
        adhesionDate: new Date().toISOString(),
      };
      const company: Company = {
        cuit: '123',
        businessName: 'Test',
        adhesionDate: new Date(),
      };
      (adhereCompanyUseCase.execute as jest.Mock).mockResolvedValue(company);
      expect(await controller.adhere(dto)).toBe(company);
      expect(adhereCompanyUseCase.execute).toHaveBeenCalledWith(
        dto.cuit,
        dto.businessName,
        expect.any(Date),
      );
    });

    it('should throw HttpException on error', async () => {
      (adhereCompanyUseCase.execute as jest.Mock).mockRejectedValue(
        new Error('fail'),
      );
      const dto: AdhereCompanyDto = {
        cuit: '123',
        businessName: 'Test',
        adhesionDate: new Date().toISOString(),
      };
      await expect(controller.adhere(dto)).rejects.toThrow(HttpException);
    });
  });
});
