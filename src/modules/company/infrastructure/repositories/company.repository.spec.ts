import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';
import { Company } from '../../domain/entity/company.entity';
import { MongoCompanyRepository } from './company.repository';

describe('MongoCompanyRepository', () => {
  let repository: MongoCompanyRepository;

  // Mocks individuales
  let mockExists: jest.Mock;
  let mockSave: jest.Mock;
  let mockFind: jest.Mock;

  // Mock “constructor” que también expone exists y find
  let mockModelConstructor: jest.Mock & {
    exists?: jest.Mock;
    find?: jest.Mock;
  };

  beforeEach(async () => {
    // (Re)inicializar mocks
    mockExists = jest.fn();
    mockSave = jest.fn();
    mockFind = jest.fn();

    // Constructor que devuelve instancias con .save()
    mockModelConstructor = jest.fn().mockImplementation((dto: any) => ({
      save: mockSave.mockResolvedValue(dto),
    }));
    // Métodos estáticos
    mockModelConstructor.exists = mockExists;
    mockModelConstructor.find = mockFind;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongoCompanyRepository,
        {
          provide: getModelToken('Company'),
          useValue: mockModelConstructor,
        },
      ],
    }).compile();

    repository = module.get<MongoCompanyRepository>(MongoCompanyRepository);
  });

  describe('save', () => {
    const input = new Company(
      '20-12345678-9',
      'ACME S.A.',
      new Date('2025-05-01'),
    );

    it('debería lanzar ConflictException si exists devuelve true', async () => {
      mockExists.mockResolvedValue(true);

      await expect(repository.save(input)).rejects.toBeInstanceOf(
        ConflictException,
      );
    });

    it('debería crear y devolver la entidad si exists devuelve false', async () => {
      mockExists.mockResolvedValue(false);
      // mockSave ya está configurado para devolver el dto

      const result = await repository.save(input);

      // El “constructor” se llamó con el dto correcto
      expect(mockModelConstructor).toHaveBeenCalledWith(input);
      // Se invocó save()
      expect(mockSave).toHaveBeenCalled();
      // Resultado es instancia de Company y coincide con input
      expect(result).toBeInstanceOf(Company);
      expect(result).toEqual(input);
    });
  });

  describe('findAdheredBetween', () => {
    const start = new Date('2025-01-01');
    const end = new Date('2025-06-01');

    it('debe devolver un array de Company cuando hay documentos', async () => {
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
      mockFind.mockResolvedValue(docs);

      const result = await repository.findAdheredBetween(start, end);

      expect(mockFind).toHaveBeenCalledWith({
        adhesionDate: { $gte: start, $lte: end },
      });
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Company);
      expect(result.map((c) => c.cuit)).toEqual(['20-1', '20-2']);
    });

    it('debe lanzar ConflictException cuando no hay documentos', async () => {
      mockFind.mockResolvedValue([]);

      await expect(
        repository.findAdheredBetween(start, end),
      ).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('findByCuits', () => {
    it('debe devolver Company[] incluso si está vacío o parcial', async () => {
      const cuits = ['20-1', '20-2'];
      const docs = [
        {
          cuit: '20-1',
          businessName: 'X',
          adhesionDate: new Date('2025-02-01'),
        },
      ];
      mockFind.mockResolvedValue(docs);

      const result = await repository.findByCuits(cuits);

      expect(mockFind).toHaveBeenCalledWith({ cuit: { $in: cuits } });
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Company);
      expect(result[0].cuit).toBe('20-1');
    });
  });
});
