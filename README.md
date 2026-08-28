# Painel de Promoções Mercado Livre

Estrutura inicial do projeto. Nesta fase, o escopo está limitado ao teste de acesso ao Google Sheets pelo GitHub Actions.

## Teste local

1. Copie `.env.example` para `.env`.
2. Preencha os três valores do Google Sheets.
3. Instale as dependências com `npm install`.
4. Execute `npm run test:google-sheets`.

Para validar a estrutura das abas sem alterar dados, execute `npm run validate:google-sheets`.

Nunca versione `.env` ou a chave privada da conta de serviço.
