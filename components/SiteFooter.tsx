import { disclaimer } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-in stack" style={{ gap: 12 }}>
        <div className="mono" style={{ fontWeight: 500, fontSize: 14, letterSpacing: "0.22em" }}>QUANTER</div>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 13, lineHeight: 1.7, maxWidth: 760 }}>{disclaimer}</p>
      </div>
    </footer>
  );
}
