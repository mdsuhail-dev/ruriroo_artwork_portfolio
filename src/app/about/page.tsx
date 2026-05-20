import { redirect } from "next/navigation";

// About page removed — redirect to homepage
export default function AboutPage() {
  redirect("/");
}
