import mongoose from 'mongoose';
import { TransferSchema } from './transfer.schema';

describe('TransferSchema', () => {
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it('should have required fields', () => {
    const amount = TransferSchema.path('amount');
    const companyCuit = TransferSchema.path('companyCuit');
    const debitAccount = TransferSchema.path('debitAccount');
    const creditAccount = TransferSchema.path('creditAccount');
    const createAt = TransferSchema.path('createAt');

    expect(amount).toBeDefined();
    expect(companyCuit).toBeDefined();
    expect(debitAccount).toBeDefined();
    expect(creditAccount).toBeDefined();
    expect(createAt).toBeDefined();
    expect(amount.options.required).toBe(true);
    expect(companyCuit.options.required).toBe(true);
    expect(debitAccount.options.required).toBe(true);
    expect(creditAccount.options.required).toBe(true);
    expect(createAt.options.required).toBe(true);
  });

  it('should have an index on createAt', () => {
    const indexes = TransferSchema.indexes();
    const hasCreateAtIndex = indexes.some(([fields]) => fields.createAt === 1);
    expect(hasCreateAtIndex).toBe(true);
  });
});
