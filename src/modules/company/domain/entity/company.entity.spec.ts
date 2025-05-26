import { Company } from './company.entity';

describe('Company Entity', () => {
  it('should create a Company instance with correct properties', () => {
    const cuit = '30-12345678-9';
    const businessName = 'Test Company S.A.';
    const adhesionDate = new Date('2023-01-01');

    const company = new Company(cuit, businessName, adhesionDate);

    expect(company.cuit).toBe(cuit);
    expect(company.businessName).toBe(businessName);
    expect(company.adhesionDate).toBe(adhesionDate);
  });
});
