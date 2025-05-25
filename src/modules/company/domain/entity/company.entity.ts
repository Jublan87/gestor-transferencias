export class Company {
  constructor(
    public readonly cuit: string,
    public readonly businessName: string,
    public readonly adhesionDate: Date,
  ) {}
}
