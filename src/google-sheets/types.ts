export interface Produto {
  id: string;
  dataEncontrado: string;
  horaEncontrado: string;
  titulo: string;
  categoria: string;
  imagem: string;
  precoOriginal: number;
  precoAtual: number;
  desconto: number;
  avaliacao: number;
  quantidadeAvaliacoes: number;
  quantidadeVendida: number;
  freteGratis: boolean;
  linkProduto: string;
  linkAfiliado: string;
  score: number;
  publicado: boolean;
  dataPublicacao: string;
}

export interface Cupom {
  id: string;
  codigo: string;
  descricao: string;
  tipoDesconto: string;
  valorDesconto: number;
  percentualDesconto: number;
  valorMinimo: number;
  dataInicio: string;
  dataFim: string;
  ativo: boolean;
}
