import type { Metadata } from "next";
import { notFound } from "next/navigation";
import T from "@/components/T";
import { studies } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = studies.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: `${s.title} | Quanter`, description: s.question };
}

export default async function StudyPage({ params }: Props) {
  const { slug } = await params;
  const idx = studies.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const s = studies[idx];
  const others = studies.filter((_, i) => i !== idx);

  return (
    <main className="memo">
      <div className="crumb">
        <a href="/#research">Research</a> / {s.tag}
      </div>

      <div className="row" style={{ alignItems: "center", gap: 12, marginTop: 28 }}>
        <div className="eyebrow">{s.tag}</div>
        <div className="pill">{s.status}</div>
      </div>
      <h1 className="memo-title">{s.title}</h1>
      <p className="memo-lead">{s.question}</p>
      <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 20 }}>
        Last updated: <T>{s.updated}</T>
      </div>

      <h2 className="memo-h">Headline result</h2>
      <p className="memo-p"><T>{s.result}</T></p>
      <div className="figure" role="img" aria-label="Figure placeholder">
        <T>{s.figure}</T>
      </div>

      <h2 className="memo-h">Data</h2>
      <p className="memo-p"><T>{s.data}</T></p>

      <h2 className="memo-h">Method</h2>
      <p className="memo-p"><T>{s.method}</T></p>

      <h2 className="memo-h">Why this might be wrong</h2>
      <p className="memo-p"><T>{s.limit}</T></p>

      <h2 className="memo-h">Reproduce it</h2>
      <div className="repro">
        <div><span>Repository</span><a href={s.repoHref}><T>{s.repo}</T></a></div>
        <div><span>Notebook</span><T>{s.notebook}</T></div>
        <div><span>Command</span><T>{s.command}</T></div>
      </div>

      <h2 className="memo-h">Other studies</h2>
      <div className="stack" style={{ gap: 10 }}>
        {others.map((o) => (
          <a key={o.slug} href={`/research/${o.slug}`} className="other">
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
              {o.tag}
            </span>
            <span style={{ color: "var(--text)", fontSize: 16 }}>{o.title}</span>
          </a>
        ))}
      </div>
      <div style={{ marginTop: 40 }}>
        <a href="/#research" style={{ color: "var(--text)", fontWeight: 500, fontSize: 14, padding: "10px 0", display: "inline-block" }}>
          Back to the research desk
        </a>
      </div>
    </main>
  );
}
