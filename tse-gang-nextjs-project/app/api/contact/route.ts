import { NextResponse } from 'next/server';
import { appendFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Opret data mappe hvis den ikke eksisterer
    const dataDir = path.join(process.cwd(), 'data', 'contact-messages');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    const filepath = path.join(dataDir, 'contact-messages.txt');

    // Format besked
    const timestamp = new Date();
    const text = `
Dato: ${timestamp}
Navn: ${name}
Email: ${email}
Emne: ${subject}
Besked: ${message}


`;

    // Gem til fil
    await appendFile(filepath, text);

    return NextResponse.json({ message: 'Besked gemt!' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Fejl' }, { status: 500 });
  }
}