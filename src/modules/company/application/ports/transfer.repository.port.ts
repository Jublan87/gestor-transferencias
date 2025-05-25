export interface TransferRepositoryPort {
  findCompaniesWithTransfersBetween(start: Date, end: Date): Promise<string[]>;
}
