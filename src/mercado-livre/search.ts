import type { Produto } from "../google-sheets/types.js";

const siteId = "MLB";
const categories = ["Casa", "Eletrônicos", "Beleza Autocuidado"];
const limitPerSearch = 50;

type MercadoLivreItem = {
  id: string; title: string; category_id?: string; thumbnail?: string;
  price?: number; original_price?: number; permalink?: string;
  shipping?: { free_shipping?: boolean }; seller?: { nickname?: string };
};

export async function buscarCandidatos(): Promise<Produto[]> {
  const candidatos: Produto[] = [];
  const agora = new Date();

  for (const categoria of categories) {
    const url = new URL(`https://api.mercadolibre.com/sites/${siteId}/search`);
    url.searchParams.set("q", categoria);
    url.searchParams.set("limit", String(limitPerSearch));
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Mercado Livre respondeu ${response.status} para ${categoria}`);
    const data = (await response.json()) as { results?: MercadoLivreItem[] };

    candidatos.push(...(data.results ?? []).map((item) => {
      const original = item.original_price ?? item.price ?? 0;
      const atual = item.price ?? 0;
      const desconto = original > atual ? ((original - atual) / original) * 100 : 0;
      return {
        id: item.id, dataEncontrado: agora.toISOString().slice(0, 10),
        horaEncontrado: agora.toISOString().slice(11, 19), titulo: item.title,
        categoria, imagem: item.thumbnail ?? "", precoOriginal: original, precoAtual: atual,
        desconto: Number(desconto.toFixed(2)), avaliacao: 0, quantidadeAvaliacoes: 0,
        quantidadeVendida: 0, freteGratis: item.shipping?.free_shipping ?? false,
        linkProduto: item.permalink ?? "", linkAfiliado: "", score: Number(desconto.toFixed(2)),
        publicado: false, dataPublicacao: "",
      } satisfies Produto;
    }));
  }
  return candidatos;
}

export function filtrarAcimaDaMedia(produtos: Produto[]): Produto[] {
  const comDesconto = produtos.filter((produto) => produto.desconto > 0);
  if (comDesconto.length === 0) return [];
  const media = comDesconto.reduce((total, produto) => total + produto.desconto, 0) / comDesconto.length;
  return comDesconto.filter((produto) => produto.desconto > media);
}
