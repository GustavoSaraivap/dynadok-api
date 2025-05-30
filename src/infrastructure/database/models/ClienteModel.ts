import { Schema, model, Document } from 'mongoose';

export interface ClienteDoc extends Document {
  nome: string;
  email: string;
  telefone: string;
  createdAt: Date;
  updatedAt: Date;
}

const clienteSchema = new Schema<ClienteDoc>(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true }
  },
  { timestamps: true }
);

export const ClienteModel = model<ClienteDoc>('Cliente', clienteSchema);
