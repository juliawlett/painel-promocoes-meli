import { inserirProduto } from "../google-sheets/products.js";
import { buscarCandidatos, filtrarAcimaDaMedia } from "../mercado-livre/search.js";

const candidatos = await buscarCandidatos();
const selecionados = filtrarAcimaDaMedia(candidatos);
let inseridos = 0;

for (const produto of selecionados) {
  if (await inserirProduto(produto)) inseridos++;
}

console.log(`Candidatos encontrados: ${candidatos.length}`);
console.log(`Produtos acima da média: ${selecionados.length}`);
console.log(`Novos produtos inseridos: ${inseridos}`);
