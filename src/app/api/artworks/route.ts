import { NextResponse } from "next/server";
import { getAllArtworksAsync } from "@/lib/db";

export async function GET() {
  const artworks = (await getAllArtworksAsync()).filter((a) => a.published);
  return NextResponse.json({ artworks }, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    },
  });
}
