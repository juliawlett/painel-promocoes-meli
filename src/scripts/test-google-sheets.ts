import { listarCuponsAtivos } from "../google-sheets/coupons.js";
import { listarProdutos } from "../google-sheets/products.js";
import { sheets, spreadsheetId } from "../google-sheets/client.js";

const response = await sheets.spreadsheets.get({ spreadsheetId });
const tabs = response.data.sheets?.map((sheet) => sheet.properties?.title) ?? [];

console.log("Conexão com Google Sheets realizada com sucesso.");
console.log(`Planilha: ${response.data.properties?.title ?? "sem título"}`);
console.log(`Abas encontradas: ${tabs.join(", ") || "nenhuma"}`);

console.log(`Produtos cadastrados: ${(await listarProdutos()).length}`);
console.log(`Cupons ativos e válidos: ${(await listarCuponsAtivos()).length}`);
