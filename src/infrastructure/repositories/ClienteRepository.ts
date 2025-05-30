// src/infrastructure/repositories/ClienteRepository.ts
import { IClienteRepository } from '../../domain/repositories/base/IClienteRepository';
import { Cliente, ClienteProps } from '../../domain/entities/Cliente';
import { ClienteModel } from '../database/models/ClienteModel';
import { Types } from 'mongoose';

export class ClienteRepository implements IClienteRepository {
  async create(entity: Cliente): Promise<Cliente> {
    const { nome, email, telefone } = entity;
    const doc = await ClienteModel.create({ nome, email, telefone });
    return new Cliente(doc.toObject() as ClienteProps, doc.id);
  }

  async update(id: string, data: Partial<Cliente>): Promise<Cliente | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const doc = await ClienteModel.findByIdAndUpdate(id, data, { new: true });
    return doc ? new Cliente(doc.toObject() as ClienteProps, doc.id) : null;
  }

  async findById(id: string): Promise<Cliente | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const doc = await ClienteModel.findById(id);
    return doc ? new Cliente(doc.toObject() as ClienteProps, doc.id) : null;
  }

  async findAll(): Promise<Cliente[]> {
    const docs = await ClienteModel.find();
    return docs.map(d => new Cliente(d.toObject() as ClienteProps, d.id));
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    const doc = await ClienteModel.findOne({ email });
    return doc ? new Cliente(doc.toObject() as ClienteProps, doc.id) : null;
  }
}
