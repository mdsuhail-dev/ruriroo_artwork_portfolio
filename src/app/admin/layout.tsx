import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Studio — ruriroo._",
  robots: { index: false, follow: false },
};

// Admin has its own layout — no public nav/footer
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0910] text-[#F0EBE3]">
      {children}
    </div>
  );
}
