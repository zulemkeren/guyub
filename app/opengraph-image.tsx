import { ImageResponse } from "next/og";

export const alt = "Guyub — A digital backbone for Indonesian neighborhoods";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #166534 0%, #14532d 100%)",
          color: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
              color: "#166534",
            }}
          >
            ●
          </div>
          <span style={{ fontSize: "32px", fontWeight: 600 }}>guyub</span>
        </div>

        <div style={{ display: "flex", flex: 1 }} />

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 16px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "999px",
              fontSize: "18px",
              color: "#86efac",
              fontWeight: 600,
            }}
          >
            Production pilot · 189 residents · Purwokerto
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            A digital backbone
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 1.1,
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <span>for Indonesian</span>
            <span style={{ color: "#fbbf24" }}>neighborhoods.</span>
          </div>
        </div>

        <div style={{ display: "flex", flex: 1 }} />

        {/* Footer stats */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            fontSize: "20px",
            alignItems: "flex-end",
          }}
        >
          <StatBlock label="Warga" value="189" />
          <StatBlock label="KK" value="52" />
          <StatBlock label="Running" value="6+ thn" />
          <div style={{ display: "flex", flex: 1 }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                color: "#86efac",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Built on
            </span>
            <span style={{ fontWeight: 700, fontSize: "20px" }}>Microsoft Azure</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span
        style={{
          color: "#86efac",
          fontSize: "14px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </span>
      <span style={{ fontWeight: 700, fontSize: "32px" }}>{value}</span>
    </div>
  );
}
