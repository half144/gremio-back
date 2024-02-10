export class CreateProdutoDto {
  nome: string;
  preco: number;
  categoria: string;
  descricao: string;
  imagems: string[];
  avaliacoes: any[];
  vendidos: number;
  tamanho: string;
  estoque: number;
}
