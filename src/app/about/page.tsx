import type { Metadata } from "next";
import Image from "next/image";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { StarSparkle } from "@/components/shared/StarSparkle";

export const metadata: Metadata = {
  title: "About — ruriroo._",
  description:
    "Egyptian artist, college student, sketchbook keeper. Pencil portraits, watercolour, mixed media — all with scattered ✦ stars.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container-site">
        {/* Hero */}
        <div className="max-w-3xl mb-20">
          <SectionLabel>The Artist</SectionLabel>
          <h1 className="font-display text-6xl md:text-8xl text-cream mt-4 leading-[0.95]">
            ruriroo._
            <br />
            <span className="italic text-rose">is an artist</span>
          </h1>
          <p className="mt-8 text-muted text-lg leading-relaxed max-w-xl">
            22. Egyptian. College student. Drawing since she could hold a pencil —
            posting since she stopped being afraid to share.
          </p>
        </div>

        {/* Featured artwork + text layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
            <Image
              src="/artwork/DToAJ0kiDsD/DToAJ0kiDsD_1.jpg"
              alt="ruriroo._ artwork — Star Girls"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Star overlay */}
            <div className="absolute top-4 right-4">
              <StarSparkle size={24} color="#E8C87A" delay={0} />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <SectionLabel delay={0.1}>Origin</SectionLabel>
              <h2 className="font-display text-4xl text-cream mt-3 leading-tight">
                The sketchbook
                <br />
                <span className="italic text-rose">always knew</span>
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                Long before Instagram, long before followers — sketchbooks filled with
                faces. Mostly curly-haired, mostly melancholic, always looking like
                they had a story to tell.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Early work was all graphite — careful, searching portraits. Over time,
                colour crept in: watercolour washes, coloured pencil, marker, and the
                explosive mixed-media style that defines the most recent work.
              </p>
            </div>

            <div>
              <SectionLabel delay={0.2}>The signature ✦</SectionLabel>
              <p className="mt-3 text-muted leading-relaxed">
                Every single piece carries scattered 4-pointed stars — not as decoration
                but as presence. As if saying: I was here. This moment mattered.
                The universe noticed.
              </p>
            </div>
          </div>
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <SectionLabel>The Work</SectionLabel>
            <h2 className="font-display text-4xl text-cream mt-3 leading-tight">
              Many mediums,
              <br />
              <span className="italic text-rose">one feeling</span>
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Pencil, watercolour, ink, coloured pencil, mixed media — sometimes all
              in the same spread. Subjects range from intimate portraits to fantasy
              witches, from sushi to botanicals.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              What unites it all is emotional honesty. Whether it&apos;s a pirate, a bee,
              or a curly-haired girl with closed eyes — there&apos;s always a feeling at the
              centre.
            </p>

            {/* Medium breakdown */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "Pencil & Graphite", pct: "40%" },
                { label: "Watercolour", pct: "25%" },
                { label: "Mixed Media", pct: "25%" },
                { label: "Ink & Marker", pct: "10%" },
              ].map((m) => (
                <div key={m.label} className="p-4 border border-border/50 rounded-sm">
                  <p className="font-display text-2xl text-cream">{m.pct}</p>
                  <p className="label mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative aspect-[3/4] overflow-hidden rounded-sm">
            <Image
              src="/artwork/DMsCyhrIZ9W/DMsCyhrIZ9W.jpg"
              alt="ruriroo._ artwork — The Old Pirate"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Quote */}
        <div className="max-w-2xl mx-auto text-center py-16 border-t border-b border-border/50">
          <div className="flex justify-center gap-4 mb-8">
            <StarSparkle size={16} delay={0} />
            <StarSparkle size={24} color="#C85F88" delay={0.2} />
            <StarSparkle size={16} delay={0.4} />
          </div>
          <p className="font-display text-3xl md:text-4xl italic text-cream leading-relaxed">
            &ldquo;Art is just paying attention to things — then paying them back
            with a pencil.&rdquo;
          </p>
          <p className="mt-6 signature text-muted text-lg">— @ruriroo._</p>
        </div>

        {/* Connect section */}
        <div className="mt-20 text-center">
          <p className="label text-muted mb-6">Find me everywhere</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { href: "https://instagram.com/ruriroo._", label: "Instagram", primary: true },
              { href: "https://tiktok.com/@ruriroo._", label: "TikTok", primary: false },
              { href: "https://www.youtube.com/@ruriroo", label: "YouTube", primary: false },
              { href: "https://in.pinterest.com/ruriroo/", label: "Pinterest", primary: false },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  s.primary
                    ? "px-8 py-3.5 bg-rose text-void text-sm font-medium tracking-wider uppercase rounded-full hover:bg-rose-bright transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-rose"
                    : "px-8 py-3.5 border border-border text-cream text-sm font-medium tracking-wider uppercase rounded-full hover:border-rose/50 transition-all duration-300 hover:-translate-y-0.5"
                }
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
