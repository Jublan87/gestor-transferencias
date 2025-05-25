export class Transfer {
  constructor(
    public readonly amount: number,
    public readonly companyCuit: string,
    public readonly debitAccount: string,
    public readonly creditAccount: string,
    public readonly createAt: Date,
  ) {}
}
