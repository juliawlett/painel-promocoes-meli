import "dotenv/config";
import { google } from "googleapis";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Variável obrigatória ausente: ${name}`);
  return value;
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: required("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    private_key: required("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const spreadsheetId = required("GOOGLE_SHEETS_ID");
export const sheets = google.sheets({ version: "v4", auth });
