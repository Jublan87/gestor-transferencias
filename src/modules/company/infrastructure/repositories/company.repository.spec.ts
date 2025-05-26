import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Company } from '../../domain/entity/company.entity';
import { MongoCompanyRepository } from './company.repository';

type MockModel<T = any> = Partial<Record<keyof Model<T>, jest.Mock>>;

describe('MongoCompanyRepository', () => {
  let repository: MongoCompanyRepository;
  let mockModel: MockModel;

  beforeEach(async () => {
    mockModel = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongoCompanyRepository,
        {
          provide: 'CompanyModel',
          useValue: function (dto: any) {
            return { save: jest.fn().mockResolvedValue(dto) };
          },
        },
        {
          provide: Model,
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<MongoCompanyRepository>(MongoCompanyRepository);
    (repository as any).companyModel = mockModel;
  });

  describe('save', () => {
    it('should create and return a Company', async () => {
      const input = new Company(
        '20-12345678-9',
        'ACME S.A.',
        new Date('2025-05-01'),
      );
      (repository as any).companyModel = jest
        .fn()
        .mockImplementation((dto) => ({
          save: jest.fn().mockResolvedValue(dto),
        }));

      const result = await repository.save(input);

      expect((repository as any).companyModel).toHaveBeenCalledWith(input);
      expect(result).toBeInstanceOf(Company);
      expect(result).toEqual(input);
    });
  });

  describe('findAdheredBetween', () => {
    const start = new Date('2025-01-01');
    const end = new Date('2025-06-01');

    it('should return an array of Company when there are documents', async () => {
      const docs = [
        {
          cuit: '20-1',
          businessName: 'X',
          adhesionDate: new Date('2025-02-01'),
        },
        {
          cuit: '20-2',
          businessName: 'Y',
          adhesionDate: new Date('2025-03-01'),
        },
      ];
      mockModel.find!.mockResolvedValue(docs);

      const result = await repository.findAdheredBetween(start, end);

      expect(mockModel.find).toHaveBeenCalledWith({
        adhesionDate: { $gte: start, $lte: end },
      });
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Company);
      expect(result.map((c) => c.cuit)).toEqual(['20-1', '20-2']);
    });

    it('should throw error when there are no documents', async () => {
      mockModel.find!.mockResolvedValue([]);
      await expect(repository.findAdheredBetween(start, end)).rejects.toThrow(
        'No companies found',
      );
    });
  });

  describe('findByCuits', () => {
    it('should return Company[] even if it is empty', async () => {
      const cuits = ['20-1', '20-2'];
      const docs = [
        {
          cuit: '20-1',
          businessName: 'X',
          adhesionDate: new Date('2025-02-01'),
        },
      ];
      mockModel.find!.mockResolvedValue(docs);

      const result = await repository.findByCuits(cuits);

      expect(mockModel.find).toHaveBeenCalledWith({ cuit: { $in: cuits } });
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Company);
      expect(result[0].cuit).toBe('20-1');
    });
  });
});
