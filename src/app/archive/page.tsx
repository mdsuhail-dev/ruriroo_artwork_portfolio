import { redirect } from "next/navigation";

// Archive page removed — redirect to work gallery
export default function ArchivePage() {
  redirect("/universe");
}
