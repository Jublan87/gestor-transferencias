import { Schema, Document } from 'mongoose';

export interface CompanyDocument extends Document {
  cuit: string;
  businessName: string;
  adhesionDate: Date;
}

export const CompanySchema = new Schema<CompanyDocument>({
  cuit: { type: String, required: true, unique: true },
  businessName: { type: String, required: true },
  adhesionDate: { type: Date, required: true },
});
