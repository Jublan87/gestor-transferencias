import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyDocument } from '../schemas/company.schema';
import { CompanyRepositoryPort } from '../../application/ports/company.repository.port';
import { Company } from '../../domain/entity/company.entity';

@Injectable()
export class MongoCompanyRepository implements CompanyRepositoryPort {
  constructor(
    @InjectModel('Company')
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  async save(company: Company): Promise<Company> {
    const created = new this.companyModel(company);
    const doc = await created.save();
    return new Company(doc.cuit, doc.businessName, doc.adhesionDate);
  }

  async findAdheredBetween(start: Date, end: Date): Promise<Company[]> {
    const docs = await this.companyModel.find({
      adhesionDate: { $gte: start, $lte: end },
    });

    if (!docs || docs.length === 0) {
      throw new Error('No companies found');
    }
    return docs.map((d) => new Company(d.cuit, d.businessName, d.adhesionDate));
  }

  async findByCuits(cuits: string[]): Promise<Company[]> {
    const docs = await this.companyModel.find({ cuit: { $in: cuits } });

    return docs.map(
      (doc) => new Company(doc.cuit, doc.businessName, doc.adhesionDate),
    );
  }
}
