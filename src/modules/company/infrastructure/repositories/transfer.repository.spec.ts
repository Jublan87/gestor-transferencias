import { MongoTransferRepository } from './transfer.repository';

describe('MongoTransferRepository', () => {
  let repository: MongoTransferRepository;
  let mockModel: { aggregate: jest.Mock };

  beforeEach(() => {
    mockModel = {
      aggregate: jest.fn(),
    };
    repository = new MongoTransferRepository(mockModel as any);
  });

  describe('findCompaniesWithTransfersBetween', () => {
    const start = new Date('2025-01-01T00:00:00.000Z');
    const end = new Date('2025-06-01T00:00:00.000Z');

    it('should call aggregate with the correct pipeline and return CUITs', async () => {
      const docs = [{ _id: '20-123' }, { _id: '27-456' }];
      mockModel.aggregate.mockResolvedValue(docs);

      const result = await repository.findCompaniesWithTransfersBetween(
        start,
        end,
      );

      expect(mockModel.aggregate).toHaveBeenCalledWith([
        { $match: { createAt: { $gte: start, $lt: end } } },
        { $group: { _id: '$companyCuit' } },
      ]);
      expect(result).toEqual(['20-123', '27-456']);
    });

    it('should return an empty array when there are no docs', async () => {
      mockModel.aggregate.mockResolvedValue([]);
      const result = await repository.findCompaniesWithTransfersBetween(
        start,
        end,
      );
      expect(result).toEqual([]);
      expect(mockModel.aggregate).toHaveBeenCalledTimes(1);
    });
  });
});
