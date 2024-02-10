import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Usuario {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  sobrenome: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ default: [] })
  favoritos: Array<string>;

  @Prop({ default: [] })
  carrinho: Array<string>;

  @Prop({ default: false })
  admin: boolean;
}

export type UsuarioDocument = Usuario & Document;

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
