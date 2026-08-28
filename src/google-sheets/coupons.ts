import { sheets, spreadsheetId } from "./client.js";
import type { Cupom } from "./types.js";

const range = "Cupons!A:J";
const number = (value: unknown) => Number(value ?? 0);
const bool = (value: unknown) => value === true || value === "true";

function fromRow(row: string[]): Cupom {
  return {
    id: row[0] ?? "", codigo: row[1] ?? "", descricao: row[2] ?? "", tipoDesconto: row[3] ?? "",
    valorDesconto: number(row[4]), percentualDesconto: number(row[5]), valorMinimo: number(row[6]),
    dataInicio: row[7] ?? "", dataFim: row[8] ?? "", ativo: bool(row[9]),
  };
}

export async function listarCupons(): Promise<Cupom[]> {
  const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  return (result.data.values ?? []).slice(1).map(fromRow);
}

export async function listarCuponsAtivos(data = new Date()): Promise<Cupom[]> {
  return (await listarCupons()).filter((cupom) => {
    if (!cupom.ativo) return false;
    const inicio = cupom.dataInicio ? new Date(cupom.dataInicio) : undefined;
    const fim = cupom.dataFim ? new Date(cupom.dataFim) : undefined;
    return (!inicio || data >= inicio) && (!fim || data <= fim);
  });
}
