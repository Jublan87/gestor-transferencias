import mongoose from 'mongoose';
import { CompanySchema } from './company.schema';

describe('CompanySchema', () => {
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it('should have required fields', () => {
    const cuit = CompanySchema.path('cuit');
    const businessName = CompanySchema.path('businessName');
    const adhesionDate = CompanySchema.path('adhesionDate');

    expect(cuit).toBeDefined();
    expect(businessName).toBeDefined();
    expect(adhesionDate).toBeDefined();
    expect(cuit.options.required).toBe(true);
    expect(businessName.options.required).toBe(true);
    expect(adhesionDate.options.required).toBe(true);
  });

  it('should have unique cuit', () => {
    const cuit = CompanySchema.path('cuit');
    expect(cuit.options.unique).toBe(true);
  });

  it('should accept valid company', async () => {
    const Company = mongoose.model('Company2', CompanySchema);
    const company = new Company({
      cuit: '20304050607',
      businessName: 'Test Company',
      adhesionDate: new Date(),
    });
    await expect(company.validate()).resolves.toBeUndefined();
  });
});
