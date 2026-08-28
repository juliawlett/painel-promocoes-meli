import { sheets, spreadsheetId } from "./client.js";
import type { Produto } from "./types.js";

const range = "Produtos!A:R";

const bool = (value: unknown) => value === true || value === "true";
const number = (value: unknown) => Number(value ?? 0);

function fromRow(row: string[]): Produto {
  return {
    id: row[0] ?? "", dataEncontrado: row[1] ?? "", horaEncontrado: row[2] ?? "",
    titulo: row[3] ?? "", categoria: row[4] ?? "", imagem: row[5] ?? "",
    precoOriginal: number(row[6]), precoAtual: number(row[7]), desconto: number(row[8]),
    avaliacao: number(row[9]), quantidadeAvaliacoes: number(row[10]), quantidadeVendida: number(row[11]),
    freteGratis: bool(row[12]), linkProduto: row[13] ?? "", linkAfiliado: row[14] ?? "",
    score: number(row[15]), publicado: bool(row[16]), dataPublicacao: row[17] ?? "",
  };
}

export async function listarProdutos(): Promise<Produto[]> {
  const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  return (result.data.values ?? []).slice(1).map(fromRow);
}

export async function inserirProduto(produto: Produto): Promise<boolean> {
  const existentes = await listarProdutos();
  if (existentes.some((item) => item.id === produto.id)) return false;

  await sheets.spreadsheets.values.append({
    spreadsheetId, range, valueInputOption: "USER_ENTERED",
    requestBody: { values: [[produto.id, produto.dataEncontrado, produto.horaEncontrado, produto.titulo, produto.categoria, produto.imagem, produto.precoOriginal, produto.precoAtual, produto.desconto, produto.avaliacao, produto.quantidadeAvaliacoes, produto.quantidadeVendida, produto.freteGratis, produto.linkProduto, produto.linkAfiliado, produto.score, produto.publicado, produto.dataPublicacao]] },
  });
  return true;
}

export async function atualizarPublicacao(id: string, publicado: boolean): Promise<void> {
  const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const rows = result.data.values ?? [];
  const rowIndex = rows.slice(1).findIndex((row) => row[0] === id);
  if (rowIndex < 0) throw new Error(`Produto não encontrado: ${id}`);

  const sheetRow = rowIndex + 2;
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId, requestBody: { valueInputOption: "USER_ENTERED", data: [
      { range: `Produtos!Q${sheetRow}`, values: [[publicado]] },
      { range: `Produtos!R${sheetRow}`, values: [[publicado ? new Date().toISOString() : ""] ] },
    ] },
  });
}
