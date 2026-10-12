import { ImageResponse } from "next/og";
import { caseStudies } from "~/data/projects";
import { profile } from "~/data/social-links";
import { formatMonth } from "~/lib/dates";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `A case study from ${profile.name}'s portfolio`;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

/** The link preview for a case study: its title and summary on the site's dark ground, lit by the project's accent. */
export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) return new Response("Not found", { status: 404 });
  const accent = project.accent.dark;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: `radial-gradient(55% 70% at 88% 18%, ${accent}80, transparent 70%), radial-gradient(45% 55% at 8% 95%, ${accent}40, transparent 70%), #08080d`,
        color: "#f3f3f8",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 28,
          color: "#c4c7d9",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: 14,
            background: `linear-gradient(135deg, #1e4fe6, ${accent})`,
            color: "#fff",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          JF
        </div>
        <span>{profile.name}</span>
        <span style={{ color: "#6b6f85" }}>·</span>
        <span>Case study</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          {project.title}
        </div>
        <div style={{ fontSize: 32, color: "#c4c7d9", lineHeight: 1.3 }}>
          {project.caseStudy.summary}
        </div>
      </div>
      <div style={{ display: "flex", gap: 14, fontSize: 24, color: "#c4c7d9" }}>
        <span>{formatMonth(project.date)}</span>
        {project.note && <span style={{ color: "#6b6f85" }}>·</span>}
        {project.note && <span>{project.note}</span>}
      </div>
    </div>,
    size,
  );
}
