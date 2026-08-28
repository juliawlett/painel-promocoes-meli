import { sheets, spreadsheetId } from "../google-sheets/client.js";

const expectedHeaders = {
  Produtos: [
    "Id", "DataEncontrado", "HoraEncontrado", "Titulo", "Categoria", "Imagem",
    "PrecoOriginal", "PrecoAtual", "Desconto", "Avaliacao", "QuantidadeAvaliacoes",
    "QuantidadeVendida", "FreteGratis", "LinkProduto", "LinkAfiliado", "Score",
    "Publicado", "DataPublicacao",
  ],
  Cupons: [
    "Id", "Codigo", "Descricao", "TipoDesconto", "ValorDesconto",
    "PercentualDesconto", "ValorMinimo", "DataInicio", "DataFim", "Ativo",
  ],
} as const;

for (const [tab, headers] of Object.entries(expectedHeaders)) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${tab}!1:${1}`,
  });
  const actual = response.data.values?.[0] ?? [];

  if (actual.length !== headers.length || actual.some((value, index) => value !== headers[index])) {
    throw new Error(
      `Cabeçalhos inválidos na aba ${tab}. Esperado: ${headers.join(" | ")}. Encontrado: ${actual.join(" | ")}`
    );
  }

  console.log(`Aba ${tab}: cabeçalhos válidos.`);
}

console.log("Validação estrutural concluída com sucesso.");
