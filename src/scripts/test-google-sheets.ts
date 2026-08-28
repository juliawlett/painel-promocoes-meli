import { google } from "googleapis";

const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!spreadsheetId || !clientEmail || !privateKey) {
  throw new Error(
    "Defina GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL e GOOGLE_PRIVATE_KEY."
  );
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: clientEmail,
    private_key: privateKey,
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const response = await sheets.spreadsheets.get({ spreadsheetId });
const tabs = response.data.sheets?.map((sheet) => sheet.properties?.title) ?? [];

console.log("Conexão com Google Sheets realizada com sucesso.");
console.log(`Planilha: ${response.data.properties?.title ?? "sem título"}`);
console.log(`Abas encontradas: ${tabs.join(", ") || "nenhuma"}`);
