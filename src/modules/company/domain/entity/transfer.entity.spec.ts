import { Transfer } from './transfer.entity';

describe('Transfer Entity', () => {
  it('should create a Transfer instance with correct properties', () => {
    const amount = 1000;
    const companyCuit = '30-12345678-9';
    const debitAccount = '1234567890';
    const creditAccount = '0987654321';
    const createAt = new Date('2024-06-01T12:00:00Z');

    const transfer = new Transfer(
      amount,
      companyCuit,
      debitAccount,
      creditAccount,
      createAt,
    );

    expect(transfer.amount).toBe(amount);
    expect(transfer.companyCuit).toBe(companyCuit);
    expect(transfer.debitAccount).toBe(debitAccount);
    expect(transfer.creditAccount).toBe(creditAccount);
    expect(transfer.createAt).toBe(createAt);
  });
});
