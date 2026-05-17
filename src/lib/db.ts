/**
 * Unified database layer.
 * - LOCAL DEV: reads/writes to /data/artworks.json (file-based, no setup needed)
 * - PRODUCTION: reads/writes to Supabase PostgreSQL (set NEXT_PUBLIC_SUPABASE_URL env var)
 *
 * No code changes needed to switch — just set the env vars in Vercel.
 */

export interface ArtworkRecord {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  year: number;
  imageCount: number;
  images: string[]; // URLs (local path or Supabase Storage public URL)
  palette: string[];
  featured: boolean;
  published: boolean;
  scheduledAt?: string | null;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

// ─── Detect environment ────────────────────────────────────────────────────
const USE_SUPABASE = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── LOCAL FILE-BASED DB ───────────────────────────────────────────────────
function getLocalDb() {
  const fs = require("fs") as typeof import("fs");
  const path = require("path") as typeof import("path");
  const DB_PATH = path.join(process.cwd(), "data", "artworks.json");

  function ensureDB() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify({ artworks: [] }, null, 2));
    }
  }

  function readAll(): ArtworkRecord[] {
    ensureDB();
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")).artworks || [];
  }

  function saveAll(artworks: ArtworkRecord[]) {
    ensureDB();
    fs.writeFileSync(DB_PATH, JSON.stringify({ artworks }, null, 2));
  }

  return { readAll, saveAll };
}

// ─── SUPABASE DB ───────────────────────────────────────────────────────────
async function getSupabaseArtworks(): Promise<ArtworkRecord[]> {
  const { supabase } = await import("./supabase");
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data || []).map(fromSupabaseRow);
}

async function upsertSupabase(record: ArtworkRecord): Promise<void> {
  const { supabase } = await import("./supabase");
  const { error } = await supabase.from("artworks").upsert(toSupabaseRow(record));
  if (error) throw new Error(error.message);
}

async function deleteFromSupabase(id: string): Promise<void> {
  const { supabase } = await import("./supabase");
  const { error } = await supabase.from("artworks").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// Map camelCase → snake_case for Supabase
function toSupabaseRow(a: ArtworkRecord) {
  return {
    id: a.id,
    title: a.title,
    category: a.category,
    tags: a.tags,
    description: a.description,
    year: a.year,
    image_count: a.imageCount,
    images: a.images,
    palette: a.palette,
    featured: a.featured,
    published: a.published,
    scheduled_at: a.scheduledAt || null,
    slug: a.slug,
    created_at: a.createdAt,
    updated_at: new Date().toISOString(),
  };
}

// Map snake_case → camelCase from Supabase
function fromSupabaseRow(r: Record<string, unknown>): ArtworkRecord {
  return {
    id: r.id as string,
    title: r.title as string,
    category: r.category as string,
    tags: (r.tags as string[]) || [],
    description: r.description as string,
    year: r.year as number,
    imageCount: r.image_count as number,
    images: (r.images as string[]) || [],
    palette: (r.palette as string[]) || [],
    featured: r.featured as boolean,
    published: r.published as boolean,
    scheduledAt: r.scheduled_at as string | null,
    slug: r.slug as string,
    createdAt: r.created_at as string,
    updatedAt: r.updated_at as string,
  };
}

// ─── PUBLIC API ────────────────────────────────────────────────────────────

export function getAllArtworks(): ArtworkRecord[] {
  if (USE_SUPABASE) throw new Error("Use getAllArtworksAsync() in production");
  return getLocalDb().readAll();
}

export async function getAllArtworksAsync(): Promise<ArtworkRecord[]> {
  if (USE_SUPABASE) return getSupabaseArtworks();
  return getLocalDb().readAll();
}

export async function createArtwork(
  artwork: Omit<ArtworkRecord, "createdAt" | "updatedAt">
): Promise<ArtworkRecord> {
  const now = new Date().toISOString();
  const record: ArtworkRecord = { ...artwork, createdAt: now, updatedAt: now };

  if (USE_SUPABASE) {
    await upsertSupabase(record);
    return record;
  }

  const db = getLocalDb();
  const all = db.readAll();
  all.unshift(record);
  db.saveAll(all);
  return record;
}

export async function updateArtwork(
  id: string,
  updates: Partial<ArtworkRecord>
): Promise<ArtworkRecord | null> {
  if (USE_SUPABASE) {
    const all = await getSupabaseArtworks();
    const existing = all.find((a) => a.id === id);
    if (!existing) return null;
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    await upsertSupabase(updated);
    return updated;
  }

  const db = getLocalDb();
  const all = db.readAll();
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
  db.saveAll(all);
  return all[idx];
}

export async function deleteArtwork(id: string): Promise<boolean> {
  if (USE_SUPABASE) {
    await deleteFromSupabase(id);
    return true;
  }
  const db = getLocalDb();
  const all = db.readAll();
  const filtered = all.filter((a) => a.id !== id);
  if (filtered.length === all.length) return false;
  db.saveAll(filtered);
  return true;
}

export async function reorderArtworks(ids: string[]): Promise<void> {
  if (!USE_SUPABASE) {
    const db = getLocalDb();
    const all = db.readAll();
    const map = new Map(all.map((a) => [a.id, a]));
    const reordered = ids.map((id) => map.get(id)).filter(Boolean) as ArtworkRecord[];
    const remaining = all.filter((a) => !ids.includes(a.id));
    db.saveAll([...reordered, ...remaining]);
  }
  // For Supabase, order is determined by created_at — reorder not needed
}

export function generateSlug(title: string, id: string): string {
  return (
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") +
    "-" +
    id.slice(-6)
  );
}
