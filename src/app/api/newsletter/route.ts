import { google } from 'googleapis';
import { NextResponse } from 'next/server';

interface Subscriber {
  firstname: string;
  lastname: string;
  email: string;
}

export async function POST(req: Request) {

  const { firstname, lastname, email } = await req.json() as Subscriber;

  if (!firstname || !lastname || !email) {
      return NextResponse.json(
            { error: "Tous les champs sont requis" },
            { status: 400 }
          );
  }

  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKey || !spreadsheetId) {
      return NextResponse.json(
        { error: "Missing Google Sheets credentials" },
        { status: 500 }
      );
    }

    const auth = new google.auth.JWT(
      clientEmail,
      undefined,
      privateKey,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:C',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[firstname, lastname, email]],
      },
    });

    return NextResponse.json(
      { error: "Inscription réussie" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Google Sheets error:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'inscription à la newsletter" },
      { status: 500 }
    );
  }
}
