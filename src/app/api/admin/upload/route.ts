import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { createArtwork, generateSlug } from "@/lib/db";

const USE_SUPABASE = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ── Process & upload a single image ────────────────────────────────────────
async function uploadImage(
  buffer: Buffer,
  filename: string,
  mimeType: string,
  artworkId: string
): Promise<string> {
  if (USE_SUPABASE) {
    // Upload to Supabase Storage
    const { supabase, STORAGE_BUCKET } = await import("@/lib/supabase");
    const storagePath = `${artworkId}/${filename}`;
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, buffer, {
        contentType: mimeType,
        upsert: true,
      });
    if (error) throw new Error(`Storage upload failed: ${error.message}`);

    // Get public URL
    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(storagePath);
    return data.publicUrl;
  } else {
    // Local: save to public/uploads/
    const fs = (await import("fs")).default;
    const path = (await import("path")).default;
    const uploadDir = path.join(process.cwd(), "public", "uploads", artworkId);
    fs.mkdirSync(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);
    return `/uploads/${artworkId}/${filename}`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const tags = ((formData.get("tags") as string) || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const featured = formData.get("featured") === "true";
    const published = formData.get("published") !== "false";
    const scheduledAt = formData.get("scheduledAt") as string | null;

    const imageFiles = formData.getAll("images") as File[];
    if (imageFiles.length === 0) {
      return NextResponse.json({ error: "No images provided" }, { status: 400 });
    }

    const id = nanoid(10);
    const slug = generateSlug(title || "untitled", id);
    const savedImages: string[] = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const filename =
        imageFiles.length === 1 ? `${id}.${ext}` : `${id}_${i + 1}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const url = await uploadImage(buffer, filename, file.type || "image/jpeg", id);
      savedImages.push(url);
    }

    const artwork = await createArtwork({
      id,
      slug,
      title: title || "Untitled",
      category: category || "mixed",
      description: description || "",
      tags,
      year: new Date().getFullYear(),
      imageCount: savedImages.length,
      images: savedImages,
      palette: [],
      featured,
      published,
      scheduledAt: scheduledAt || null,
    });

    return NextResponse.json({ success: true, artwork }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
