"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ArtworkRecord {
  id: string;
  title: string;
  category: string;
  imageCount: number;
  featured: boolean;
  published: boolean;
  year: number;
  images: string[];
  tags: string[];
  createdAt: string;
}

const CATEGORIES = ["all", "portraits", "figures", "watercolor", "fantasy", "mixed", "nature", "studies"];

export default function AdminManagePage() {
  const [artworks, setArtworks] = useState<ArtworkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/artworks")
      .then((r) => r.json())
      .then((d) => { setArtworks(d.artworks || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function toggleFeatured(id: string, current: boolean) {
    await fetch("/api/admin/artworks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, featured: !current }),
    });
    setArtworks((prev) => prev.map((a) => a.id === id ? { ...a, featured: !current } : a));
  }

  async function togglePublished(id: string, current: boolean) {
    await fetch("/api/admin/artworks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, published: !current }),
    });
    setArtworks((prev) => prev.map((a) => a.id === id ? { ...a, published: !current } : a));
  }

  async function deleteArtwork(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/artworks?id=${id}`, { method: "DELETE" });
    setArtworks((prev) => prev.filter((a) => a.id !== id));
  }

  const filtered = artworks.filter((a) => {
    const matchCat = filter === "all" || a.category === filter;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const inputStyle: React.CSSProperties = {
    padding: "0.6rem 0.9rem", background: "rgba(11,9,16,0.8)",
    border: "1px solid rgba(42,34,50,0.9)", borderRadius: "8px",
    color: "#F0EBE3", fontSize: "0.875rem", outline: "none",
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(42,34,50,0.8)", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", position: "sticky", top: 0, background: "rgba(11,9,16,0.95)", backdropFilter: "blur(20px)", zIndex: 50, flexWrap: "wrap" }}>
        <Link href="/admin" style={{ color: "#A09490", textDecoration: "none", fontSize: "0.8rem", flexShrink: 0 }}>← Dashboard</Link>
        <span style={{ color: "#2A2232" }}>|</span>
        <span style={{ fontFamily: "var(--font-caveat, cursive)", fontSize: "1.2rem", color: "#F0EBE3" }}>Manage Gallery</span>
        <Link href="/admin/upload" style={{ marginLeft: "auto", padding: "0.5rem 1rem", background: "#C85F88", color: "#0B0910", borderRadius: "8px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", flexShrink: 0 }}>
          + Upload
        </Link>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center", marginBottom: "1.5rem" }}>
          <input
            style={{ ...inputStyle, minWidth: "180px", flex: 1 }}
            type="search"
            placeholder="Search title or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding: "0.4rem 0.75rem", borderRadius: "20px", border: "1px solid rgba(42,34,50,0.8)",
                background: filter === c ? "rgba(200,95,136,0.2)" : "transparent",
                color: filter === c ? "#C85F88" : "#A09490",
                fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A09490", marginBottom: "1rem" }}>
          {filtered.length} work{filtered.length !== 1 ? "s" : ""}
        </p>

        {loading ? (
          <p style={{ color: "#A09490" }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", border: "1px dashed rgba(42,34,50,0.6)", borderRadius: "12px" }}>
            <p style={{ color: "#A09490" }}>No artworks found.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            {filtered.map((artwork, i) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                style={{ background: "rgba(19,17,26,0.8)", border: "1px solid rgba(42,34,50,0.6)", borderRadius: "12px", overflow: "hidden" }}
              >
                {/* Image */}
                <div style={{ aspectRatio: "4/3", background: "rgba(42,34,50,0.4)", position: "relative", overflow: "hidden" }}>
                  {artwork.images[0] && (
                    <img src={artwork.images[0]} alt={artwork.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                  {/* Image count badge */}
                  {artwork.imageCount > 1 && (
                    <div style={{ position: "absolute", top: "6px", right: "6px", background: "rgba(11,9,16,0.75)", borderRadius: "4px", padding: "2px 6px", fontSize: "0.6rem", color: "#A09490" }}>
                      +{artwork.imageCount}
                    </div>
                  )}
                  {/* Status badges */}
                  <div style={{ position: "absolute", top: "6px", left: "6px", display: "flex", gap: "4px" }}>
                    {artwork.featured && <div style={{ background: "rgba(232,200,122,0.85)", borderRadius: "4px", padding: "2px 5px", fontSize: "0.6rem", color: "#0B0910", fontWeight: 700 }}>★</div>}
                    {!artwork.published && <div style={{ background: "rgba(200,95,136,0.7)", borderRadius: "4px", padding: "2px 5px", fontSize: "0.6rem", color: "white" }}>Draft</div>}
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "0.75rem" }}>
                  <p style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", fontSize: "1rem", color: "#F0EBE3", marginBottom: "0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{artwork.title}</p>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A09490", marginBottom: "0.75rem" }}>{artwork.category} · {artwork.year}</p>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    <button onClick={() => toggleFeatured(artwork.id, artwork.featured)} style={{ flex: 1, padding: "0.35rem", borderRadius: "6px", border: "1px solid rgba(42,34,50,0.8)", background: artwork.featured ? "rgba(232,200,122,0.15)" : "transparent", color: artwork.featured ? "#E8C87A" : "#A09490", fontSize: "0.65rem", cursor: "pointer" }}>
                      {artwork.featured ? "★ Featured" : "☆ Feature"}
                    </button>
                    <button onClick={() => togglePublished(artwork.id, artwork.published)} style={{ flex: 1, padding: "0.35rem", borderRadius: "6px", border: "1px solid rgba(42,34,50,0.8)", background: artwork.published ? "rgba(200,95,136,0.1)" : "transparent", color: artwork.published ? "#C85F88" : "#A09490", fontSize: "0.65rem", cursor: "pointer" }}>
                      {artwork.published ? "Live" : "Draft"}
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.4rem" }}>
                    <Link href={`/admin/edit/${artwork.id}`} style={{ flex: 1, padding: "0.35rem", borderRadius: "6px", border: "1px solid rgba(42,34,50,0.8)", color: "#F0EBE3", fontSize: "0.65rem", textDecoration: "none", textAlign: "center" }}>
                      Edit
                    </Link>
                    <Link href={`/work/${artwork.id}`} target="_blank" style={{ flex: 1, padding: "0.35rem", borderRadius: "6px", border: "1px solid rgba(42,34,50,0.8)", color: "#A09490", fontSize: "0.65rem", textDecoration: "none", textAlign: "center" }}>
                      View ↗
                    </Link>
                    <button onClick={() => deleteArtwork(artwork.id, artwork.title)} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", border: "1px solid rgba(200,95,136,0.2)", color: "#C85F88", background: "transparent", fontSize: "0.65rem", cursor: "pointer" }}>
                      ✕
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
