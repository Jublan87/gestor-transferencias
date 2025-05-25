import { Schema, Document } from 'mongoose';

export interface TransferDocument extends Document {
  amount: number;
  companyCuit: string;
  debitAccount: string;
  creditAccount: string;
  createAt: Date;
}

export const TransferSchema = new Schema<TransferDocument>({
  amount: { type: Number, required: true },
  companyCuit: { type: String, required: true },
  debitAccount: { type: String, required: true },
  creditAccount: { type: String, required: true },
  createAt: { type: Date, required: true, index: true },
});
