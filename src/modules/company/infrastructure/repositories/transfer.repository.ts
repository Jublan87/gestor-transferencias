import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransferDocument } from '../schemas/transfer.schema';
import { TransferRepositoryPort } from '../../application/ports/transfer.repository.port';

@Injectable()
export class MongoTransferRepository implements TransferRepositoryPort {
  constructor(
    @InjectModel('Transfer')
    private readonly transferModel: Model<TransferDocument>,
  ) {}

  async findCompaniesWithTransfersBetween(
    start: Date,
    end: Date,
  ): Promise<string[]> {
    const docs = await this.transferModel.aggregate<{ _id: string }>([
      { $match: { createAt: { $gte: start, $lt: end } } },
      { $group: { _id: '$companyCuit' } },
    ]);

    return docs.map((d) => d._id);
  }
}
