"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const CATEGORIES = ["portraits", "figures", "watercolor", "fantasy", "mixed", "nature", "studies"];

interface ArtworkRecord {
  id: string; title: string; category: string;
  description: string; tags: string[]; year: number;
  imageCount: number; images: string[];
  featured: boolean; published: boolean;
}

export default function AdminEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [artwork, setArtwork] = useState<ArtworkRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/artworks")
      .then((r) => r.json())
      .then((d) => {
        const found = (d.artworks || []).find((a: ArtworkRecord) => a.id === params.id);
        setArtwork(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!artwork) return;
    setSaving(true);
    await fetch("/api/admin/artworks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artwork),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem",
    background: "rgba(11,9,16,0.8)", border: "1px solid rgba(42,34,50,0.9)",
    borderRadius: "10px", color: "#F0EBE3", fontSize: "0.95rem", outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase",
    color: "#A09490", display: "block", marginBottom: "0.4rem",
  };

  if (loading) return <div style={{ padding: "3rem", color: "#A09490", textAlign: "center" }}>Loading...</div>;
  if (!artwork) return <div style={{ padding: "3rem", color: "#C85F88", textAlign: "center" }}>Artwork not found. <Link href="/admin/manage" style={{ color: "#A09490" }}>← Go back</Link></div>;

  return (
    <div style={{ minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid rgba(42,34,50,0.8)", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", position: "sticky", top: 0, background: "rgba(11,9,16,0.95)", backdropFilter: "blur(20px)", zIndex: 50 }}>
        <Link href="/admin/manage" style={{ color: "#A09490", textDecoration: "none", fontSize: "0.8rem" }}>← Manage</Link>
        <span style={{ color: "#2A2232" }}>|</span>
        <span style={{ fontFamily: "var(--font-caveat, cursive)", fontSize: "1.2rem", color: "#F0EBE3" }}>Edit: {artwork.title}</span>
      </header>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Image previews (read-only) */}
        {artwork.images.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
            {artwork.images.map((img, i) => (
              <div key={i} style={{ flexShrink: 0, width: "80px", height: "80px", borderRadius: "8px", overflow: "hidden" }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        )}

        {saved && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ padding: "0.75rem 1rem", background: "rgba(200,95,136,0.12)", border: "1px solid rgba(200,95,136,0.3)", borderRadius: "10px", marginBottom: "1.5rem", color: "#C85F88", fontSize: "0.85rem" }}>
            ✦ Changes saved successfully.
          </motion.div>
        )}

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={labelStyle}>Title</label>
            <input style={inputStyle} value={artwork.title} onChange={(e) => setArtwork({ ...artwork, title: e.target.value })} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={artwork.category} onChange={(e) => setArtwork({ ...artwork, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Year</label>
              <input style={inputStyle} type="number" min={2000} max={2030} value={artwork.year} onChange={(e) => setArtwork({ ...artwork, year: Number(e.target.value) })} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Tags (comma-separated)</label>
            <input style={inputStyle} value={artwork.tags.join(", ")} onChange={(e) => setArtwork({ ...artwork, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} />
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={artwork.description} onChange={(e) => setArtwork({ ...artwork, description: e.target.value })} />
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="checkbox" checked={artwork.featured} onChange={(e) => setArtwork({ ...artwork, featured: e.target.checked })} style={{ accentColor: "#E8C87A", width: "16px", height: "16px" }} />
              <span style={{ fontSize: "0.85rem", color: "#F0EBE3" }}>✦ Featured</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="checkbox" checked={artwork.published} onChange={(e) => setArtwork({ ...artwork, published: e.target.checked })} style={{ accentColor: "#C85F88", width: "16px", height: "16px" }} />
              <span style={{ fontSize: "0.85rem", color: "#F0EBE3" }}>Published</span>
            </label>
          </div>

          <div style={{ display: "flex", gap: "1rem", paddingTop: "0.5rem" }}>
            <button type="submit" disabled={saving} style={{
              padding: "0.875rem 2rem", background: saving ? "rgba(200,95,136,0.5)" : "#C85F88",
              color: "#0B0910", border: "none", borderRadius: "10px", fontSize: "0.75rem",
              fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: saving ? "not-allowed" : "pointer",
            }}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <Link href={`/work/${artwork.id}`} target="_blank" style={{
              padding: "0.875rem 1.5rem", border: "1px solid rgba(42,34,50,0.9)", color: "#A09490",
              borderRadius: "10px", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
            }}>
              Preview ↗
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
