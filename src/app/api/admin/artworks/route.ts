import { NextRequest, NextResponse } from "next/server";
import { getAllArtworksAsync, updateArtwork, deleteArtwork, reorderArtworks } from "@/lib/db";

export async function GET() {
  const artworks = await getAllArtworksAsync();
  return NextResponse.json({ artworks });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  if (body.reorder && Array.isArray(body.ids)) {
    await reorderArtworks(body.ids);
    return NextResponse.json({ success: true });
  }

  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const updated = await updateArtwork(body.id, body);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, artwork: updated });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const ok = await deleteArtwork(id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
