import { ImageResponse } from "next/og";

export const runtime = "edge";

const themeColors: Record<string, string> = {
  violet: "#8b5cf6",
  blue: "#3b82f6",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  cyan: "#06b6d4",
  orange: "#f97316",
  pink: "#ec4899",
  indigo: "#6366f1",
  red: "#ef4444",
  fuchsia: "#d946ef",
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "DevVault";
  const category = searchParams.get("category") ?? "";
  const theme = searchParams.get("theme") ?? "";

  const accent = themeColors[theme] ?? "#22c55e";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, #000000 0%, #0a0520 50%, ${accent}22 100%)`,
          fontFamily: "sans-serif",
          padding: 80,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "50%",
            height: "50%",
            background: `radial-gradient(ellipse at center, ${accent}44 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: "40%",
            height: "40%",
            background: `radial-gradient(ellipse at center, #6366f144 0%, transparent 70%)`,
          }}
        />
        {category && (
          <div
            style={{
              display: "flex",
              padding: "8px 24px",
              borderRadius: 9999,
              border: `2px solid ${accent}`,
              color: accent,
              fontSize: 28,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 32,
              zIndex: 1,
            }}
          >
            {category}
          </div>
        )}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.2,
            margin: 0,
            maxWidth: "90%",
            textWrap: "balance",
            zIndex: 1,
          }}
        >
          {title}
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 48,
            color: "#94a3b8",
            fontSize: 24,
            zIndex: 1,
          }}
        >
          <span style={{ fontWeight: 600, color: accent }}>DevVault</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>Lázaro Vasconcelos</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
