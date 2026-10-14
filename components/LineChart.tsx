import type { Segment } from "@/lib/results";

const COLORS: Record<Segment, string> = {
  in_sample: "#6b7c93",
  out_of_sample: "#8fb6e8",
  paper: "var(--accent)",
};

const W = 800;
const H = 280;
const PL = 52;
const PR = 16;
const PT = 16;
const PB = 32;

type Props = {
  dates: string[];
  values: (number | null)[];
  segments: Segment[];
  kind: "equity" | "drawdown";
  label: string;
};

type Pt = { i: number; v: number; s: Segment };

export default function LineChart({ dates, values, segments, kind, label }: Props) {
  const n = dates.length;
  const step = Math.max(1, Math.ceil(n / 700));
  const idx: number[] = [];
  for (let i = 0; i < n; i += step) idx.push(i);
  if (idx[idx.length - 1] !== n - 1) idx.push(n - 1);

  const pts: Pt[] = [];
  for (const i of idx) {
    const v = values[i];
    if (v != null) pts.push({ i, v, s: segments[i] });
  }
  if (pts.length < 2) return <div className="chart-empty">Not enough data yet</div>;

  let lo = Math.min(...pts.map((p) => p.v));
  let hi = Math.max(...pts.map((p) => p.v));
  if (kind === "drawdown") hi = 0;
  if (lo === hi) {
    lo -= 0.01;
    hi += 0.01;
  }

  const x = (i: number) => PL + (i / (n - 1)) * (W - PL - PR);
  const y = (v: number) => PT + (1 - (v - lo) / (hi - lo)) * (H - PT - PB);
  const fmt = (p: Pt) => `${x(p.i).toFixed(1)},${y(p.v).toFixed(1)}`;

  // One polyline per contiguous segment run, joined to the previous point so the line is unbroken.
  const runs: { s: Segment; d: string }[] = [];
  let curSeg: Segment | null = null;
  let curPts: string[] = [];
  let prev: Pt | null = null;
  for (const p of pts) {
    if (curSeg !== p.s) {
      if (curSeg !== null) runs.push({ s: curSeg, d: curPts.join(" ") });
      curSeg = p.s;
      curPts = prev ? [fmt(prev), fmt(p)] : [fmt(p)];
    } else {
      curPts.push(fmt(p));
    }
    prev = p;
  }
  if (curSeg !== null) runs.push({ s: curSeg, d: curPts.join(" ") });

  const ticks = [0, 1, 2, 3].map((k) => lo + (k * (hi - lo)) / 3);

  const yearMarks: { i: number; label: string }[] = [];
  let lastYear = "";
  dates.forEach((d, i) => {
    const yr = d.slice(0, 4);
    if (yr !== lastYear) {
      yearMarks.push({ i, label: yr });
      lastYear = yr;
    }
  });
  const every = Math.max(1, Math.ceil(yearMarks.length / 7));
  const shown = yearMarks.filter((_, k) => k % every === 0);

  const present = Array.from(new Set(pts.map((p) => p.s)));

  return (
    <div className="stack" style={{ gap: 12 }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label={label}>
        {ticks.map((t, k) => (
          <g key={k}>
            <line x1={PL} x2={W - PR} y1={y(t)} y2={y(t)} stroke="var(--line2)" />
            <text x={PL - 8} y={y(t) + 4} textAnchor="end">
              {`${(t * 100).toFixed(0)}%`}
            </text>
          </g>
        ))}
        {shown.map((m) => (
          <text key={m.label} x={x(m.i)} y={H - 10} textAnchor="middle">
            {m.label}
          </text>
        ))}
        {runs.map((r, k) => (
          <polyline key={k} points={r.d} fill="none" style={{ stroke: COLORS[r.s] }} strokeWidth={1.6} strokeLinejoin="round" />
        ))}
      </svg>
      <div className="legend">
        {present.map((s) => (
          <span key={s}>
            <i style={{ background: COLORS[s] }} />
            {s === "in_sample" ? "In-sample" : s === "out_of_sample" ? "Out-of-sample" : "Paper trading"}
          </span>
        ))}
      </div>
    </div>
  );
}
