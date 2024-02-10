import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Produto {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  preco: number;

  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true })
  tamanho: string;

  @Prop({ required: true })
  estoque: number;

  @Prop()
  unidadesRestantes: number;

  @Prop({ required: true })
  descricao: string;

  @Prop({ type: [String] })
  imagems: string[];

  @Prop({ type: Array, default: [] })
  avaliacoes: any[];

  @Prop({ default: 0 })
  vendidos: number;
}

export type ProdutoDocument = Produto & Document;

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
