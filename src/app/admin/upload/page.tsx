"use client";
import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["portraits", "figures", "watercolor", "fantasy", "mixed", "nature", "studies"];

interface UploadFile {
  file: File;
  preview: string;
  id: string;
}

export default function AdminUploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("mixed");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [scheduledAt, setScheduledAt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((incoming: File[]) => {
    const imageFiles = incoming.filter((f) => f.type.startsWith("image/"));
    const newUploads: UploadFile[] = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).slice(2),
    }));
    setFiles((prev) => [...prev, ...newUploads]);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files);
    addFiles(dropped);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const f = prev.find((x) => x.id === id);
      if (f) URL.revokeObjectURL(f.preview);
      return prev.filter((x) => x.id !== id);
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (files.length === 0) { setError("Please add at least one image."); return; }
    setUploading(true);
    setError("");

    const fd = new FormData();
    fd.append("title", title || "Untitled");
    fd.append("category", category);
    fd.append("description", description);
    fd.append("tags", tags);
    fd.append("featured", String(featured));
    fd.append("published", String(published));
    if (scheduledAt) fd.append("scheduledAt", scheduledAt);
    files.forEach((uf) => fd.append("images", uf.file));

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (res.ok) {
        setSuccess(true);
        files.forEach((f) => URL.revokeObjectURL(f.preview));
        setFiles([]);
        setTitle(""); setDescription(""); setTags(""); setFeatured(false);
        setTimeout(() => router.push("/admin"), 2000);
      } else {
        const d = await res.json();
        setError(d.error || "Upload failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem", background: "rgba(11,9,16,0.8)",
    border: "1px solid rgba(42,34,50,0.9)", borderRadius: "10px",
    color: "#F0EBE3", fontSize: "0.95rem", outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase",
    color: "#A09490", display: "block", marginBottom: "0.4rem",
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(42,34,50,0.8)", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(11,9,16,0.95)", backdropFilter: "blur(20px)", zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/admin" style={{ color: "#A09490", textDecoration: "none", fontSize: "0.8rem" }}>← Dashboard</Link>
          <span style={{ color: "#2A2232" }}>|</span>
          <span style={{ fontFamily: "var(--font-caveat, cursive)", fontSize: "1.2rem", color: "#F0EBE3" }}>Upload New Work</span>
        </div>
      </header>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Success */}
        <AnimatePresence>
          {success && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ padding: "1.5rem", background: "rgba(200,95,136,0.12)", border: "1px solid rgba(200,95,136,0.3)", borderRadius: "12px", textAlign: "center", marginBottom: "1.5rem" }}>
              <p style={{ color: "#C85F88", fontFamily: "var(--font-cormorant, serif)", fontSize: "1.4rem", fontStyle: "italic" }}>✦ Uploaded successfully!</p>
              <p style={{ color: "#A09490", fontSize: "0.85rem", marginTop: "0.25rem" }}>Redirecting to dashboard...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? "#C85F88" : "rgba(42,34,50,0.9)"}`,
              borderRadius: "16px", padding: "2.5rem 1rem",
              textAlign: "center", cursor: "pointer",
              background: dragOver ? "rgba(200,95,136,0.05)" : "rgba(19,17,26,0.4)",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✦</div>
            <p style={{ color: "#F0EBE3", fontSize: "1rem", marginBottom: "0.25rem" }}>
              {files.length > 0 ? `${files.length} image${files.length > 1 ? "s" : ""} selected` : "Drop images here or tap to browse"}
            </p>
            <p style={{ color: "#A09490", fontSize: "0.8rem" }}>JPG, PNG, WebP — multiple files for carousel</p>
            <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFileInput} style={{ display: "none" }} />
          </div>

          {/* Image previews */}
          {files.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "0.75rem" }}>
              {files.map((uf, i) => (
                <div key={uf.id} style={{ position: "relative", aspectRatio: "1", borderRadius: "10px", overflow: "hidden", background: "rgba(42,34,50,0.5)" }}>
                  <img src={uf.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", padding: "4px" }}>
                    <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(uf.id); }} style={{ background: "rgba(200,95,136,0.8)", border: "none", color: "white", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer", fontSize: "10px", lineHeight: 1 }}>✕</button>
                  </div>
                  <div style={{ position: "absolute", bottom: "4px", left: "4px", background: "rgba(0,0,0,0.6)", padding: "2px 5px", borderRadius: "4px", fontSize: "0.6rem", color: "white" }}>{i + 1}</div>
                </div>
              ))}
            </div>
          )}

          {/* Metadata */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Title</label>
              <input style={inputStyle} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Girl with Stars" />
            </div>

            <div>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Tags (comma-separated)</label>
              <input style={inputStyle} type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="pencil, portrait, stars" />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write something about this piece..." />
            </div>
          </div>

          {/* Options */}
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} style={{ accentColor: "#E8C87A", width: "16px", height: "16px" }} />
              <span style={{ fontSize: "0.8rem", color: "#F0EBE3" }}>✦ Feature on homepage</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} style={{ accentColor: "#C85F88", width: "16px", height: "16px" }} />
              <span style={{ fontSize: "0.8rem", color: "#F0EBE3" }}>Publish immediately</span>
            </label>
          </div>

          {!published && (
            <div>
              <label style={labelStyle}>Schedule publish date (optional)</label>
              <input style={inputStyle} type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
            </div>
          )}

          {error && <p style={{ color: "#C85F88", fontSize: "0.85rem" }}>{error}</p>}

          {/* Submit */}
          <button type="submit" disabled={uploading || files.length === 0} style={{
            padding: "1rem 2rem", background: uploading ? "rgba(200,95,136,0.5)" : "#C85F88",
            color: "#0B0910", border: "none", borderRadius: "12px",
            fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em",
            textTransform: "uppercase", cursor: uploading || files.length === 0 ? "not-allowed" : "pointer",
            transition: "all 0.2s ease", alignSelf: "flex-start",
          }}>
            {uploading ? "Uploading..." : `Publish ${files.length > 0 ? files.length + " image" + (files.length > 1 ? "s" : "") : ""}`}
          </button>
        </form>
      </div>
    </div>
  );
}
