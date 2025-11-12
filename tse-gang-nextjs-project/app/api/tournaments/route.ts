import { NextResponse } from "next/server";

const TEAM_URL = "https://vlr.orlandomm.net/api/v1/teams/16629";
const REVALIDATE_SECONDS = 300; // 5 minutes

export async function GET() {
  try {
    const res = await fetch(TEAM_URL, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${res.status} ${res.statusText}` },
        { status: 502 }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}

