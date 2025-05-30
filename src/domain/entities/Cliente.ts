import { BaseEntity } from './BaseEntity';

export interface ClienteProps {
  nome: string;
  email: string;
  telefone: string;
}

export class Cliente extends BaseEntity<string> {
  public readonly nome: string;
  public readonly email: string;
  public readonly telefone: string;

  constructor(props: ClienteProps, id?: string) {
    super(id);
    this.nome = props.nome;
    this.email = props.email;
    this.telefone = props.telefone;
  }
}
