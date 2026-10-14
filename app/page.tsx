import LineChart from "@/components/LineChart";
import T from "@/components/T";
import {
  DECAY_LABEL,
  FLAG_LABEL,
  getResults,
  num,
  pct,
  SEGMENT_LABEL,
  STRATEGY_LABEL,
  type Results,
  type Segment,
} from "@/lib/results";
import { about, contact, GITHUB, lab, processSteps, studies, tools } from "@/content/site";

export const revalidate = 3600;

function Tile({ k, v, small }: { k: string; v: string; small?: boolean }) {
  return (
    <div className="tile">
      <div className="k">{k}</div>
      <div className={`v${small ? " sm" : ""}`}>{v}</div>
    </div>
  );
}

function SectionHead({ eyebrow, title, lead, draft }: { eyebrow: string; title: string; lead: string; draft?: boolean }) {
  return (
    <div>
      <div className="row" style={{ alignItems: "center", gap: 12 }}>
        <div className="eyebrow">{eyebrow}</div>
        {draft ? <div className="pill">Draft policy</div> : null}
      </div>
      <h2 className="h2">{title}</h2>
      <p className="lead">{lead}</p>
    </div>
  );
}

function PlaceholderChart() {
  return (
    <svg viewBox="0 0 800 280" className="chart" role="img" aria-label="No results connected yet">
      {[40, 100, 160, 220].map((yy) => (
        <line key={yy} x1="40" x2="780" y1={yy} y2={yy} stroke="var(--line2)" />
      ))}
      <line x1="40" x2="780" y1="170" y2="170" stroke="var(--accent)" strokeOpacity=".55" strokeDasharray="6 7" />
      <text x="410" y="120" textAnchor="middle" style={{ fontSize: 14 }}>
        Connect results.json to show the equity curve
      </text>
    </svg>
  );
}

function Notices({ r }: { r: Results | null }) {
  const notes: string[] = [];
  if (!r) {
    notes.push("No results connected. Set RESULTS_URL to the pipeline output to replace the placeholders on this page.");
  } else {
    if (r.meta.synthetic) notes.push("This data is synthetic and exists only to test the page. Do not publish it.");
    if (r.summary.paper_days < 60)
      notes.push(
        `Paper trading has run for ${r.summary.paper_days} trading days. That is far too short to judge a strategy.`,
      );
    if (r.summary.drawdown_stop?.active)
      notes.push("The drawdown stop is engaged. The strategy is flat until the cooldown ends.");
    const decay = r.summary.decay;
    if (decay?.status === "review") {
      const why = decay.flags.map((f) => FLAG_LABEL[f] ?? f).join("; ");
      notes.push(`Decay check flagged this strategy for review: ${why}.`);
    }
  }
  return (
    <>
      {notes.map((n) => (
        <div className="notice" key={n}>
          {n}
        </div>
      ))}
    </>
  );
}

function SegmentTable({ r }: { r: Results }) {
  const order: Segment[] = ["in_sample", "out_of_sample", "paper"];
  return (
    <div className="tablebox">
      <table className="qt">
        <thead>
          <tr>
            <th>Segment</th>
            <th>Period</th>
            <th>Days</th>
            <th>Annual return</th>
            <th>Annual vol</th>
            <th>Sharpe</th>
            <th>Max drawdown</th>
          </tr>
        </thead>
        <tbody>
          {order.map((s) => {
            const x = r.segments[s];
            return (
              <tr key={s}>
                <td>{SEGMENT_LABEL[s]}</td>
                <td className="mono" style={{ color: "var(--muted)" }}>
                  {x.start && x.end ? `${x.start} to ${x.end}` : "--"}
                </td>
                <td className="mono">{x.days}</td>
                <td className="mono">{pct(x.ann_return)}</td>
                <td className="mono">{pct(x.ann_vol)}</td>
                <td className="mono">{num(x.sharpe)}</td>
                <td className="mono">{pct(x.max_drawdown)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default async function Home() {
  const r = await getResults();
  const s = r?.summary;
  const a = r?.meta.assumptions;
  const ds = s?.drawdown_stop;
  const dc = s?.decay;
  const publishedCount = studies.filter((x) => x.status === "Published").length;

  return (
    <>
      <main>
        {/* HERO */}
        <section id="top" className="section" style={{ paddingTop: 80, paddingBottom: 0 }}>
          <div className="wrap row" style={{ gap: 56, alignItems: "center" }}>
            <div className="stack" style={{ flex: "1 1 480px", minWidth: 0, gap: 28 }}>
              <div className="eyebrow">Independent quantitative research</div>
              <h1 className="h1">Behavioral signals, measured against regime-aware risk.</h1>
              <p className="lead" style={{ fontSize: 18, maxWidth: 600 }}>
                Quanter is a one-person research practice studying how investor behavior and alternative data show up in
                returns, and how much risk it takes to harvest them. Every result is reproducible, and everything here is
                research or paper trading.
              </p>
              <div className="row" style={{ gap: 12 }}>
                <a href="#research" className="btn primary">Read the research</a>
                <a href={GITHUB} className="btn ghost">See the code</a>
              </div>
              <div className="mono" style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
                Research and paper trading only. No client capital. Not investment advice.
              </div>
            </div>

            <div className="card stack" style={{ flex: "1 1 380px", gap: 20 }}>
              <div className="row" style={{ justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <div className="mono" style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
                  Desk status
                </div>
                <div className={`pill ${r && !r.meta.synthetic ? "" : "accent"}`}>
                  {!r ? "Placeholder data" : r.meta.synthetic ? "Synthetic data" : "Live pipeline"}
                </div>
              </div>
              <div className="row" style={{ gap: 12 }}>
                <div className="tile dark" style={{ flex: "1 1 150px" }}>
                  <div className="k">Studies published</div>
                  <div className="v">{publishedCount}</div>
                </div>
                <div className="tile dark" style={{ flex: "1 1 150px" }}>
                  <div className="k">Strategies on paper</div>
                  <div className="v">{r && s && s.paper_days > 0 ? 1 : "--"}</div>
                </div>
                <div className="tile dark" style={{ flex: "1 1 150px" }}>
                  <div className="k">Paper trading days</div>
                  <div className="v">{s ? s.paper_days : "--"}</div>
                </div>
                <div className="tile dark" style={{ flex: "1 1 150px" }}>
                  <div className="k">Last data</div>
                  <div className="v sm" style={{ marginTop: 14 }}>{r ? r.meta.last_data_date : "--"}</div>
                </div>
              </div>
              {r ? (
                <LineChart
                  dates={r.series.dates}
                  values={r.series.cum_return}
                  segments={r.series.segment}
                  kind="equity"
                  label="Cumulative return of the strategy, net of costs"
                />
              ) : (
                <PlaceholderChart />
              )}
            </div>
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research" className="section">
          <div className="wrap stack" style={{ gap: 40 }}>
            <SectionHead
              eyebrow="Research desk"
              title="Three studies, each with its limits stated."
              lead="Each memo states the question, the data, the headline result and the main reason it might be wrong, with a repository that reproduces every figure."
            />
            <div className="row" style={{ gap: 20 }}>
              {studies.map((st) => (
                <article key={st.title} className="card stack" style={{ flex: "1 1 320px", gap: 16 }}>
                  <div className="row" style={{ justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <div className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
                      {st.tag}
                    </div>
                    <div className="pill">{st.status}</div>
                  </div>
                  <h3 className="h3">{st.title}</h3>
                  <p className="body">{st.question}</p>
                  <div className="stack" style={{ gap: 10, fontSize: 14, lineHeight: 1.5, borderTop: "1px solid var(--line)", paddingTop: 16 }}>
                    <div><span style={{ color: "var(--muted)" }}>Data </span><T>{st.data}</T></div>
                    <div><span style={{ color: "var(--muted)" }}>Result </span><T>{st.result}</T></div>
                    <div><span style={{ color: "var(--muted)" }}>Limit </span><T>{st.limit}</T></div>
                  </div>
                  <div className="row" style={{ gap: 20, marginTop: "auto", fontSize: 14, fontWeight: 500 }}>
                    <a href={`/research/${st.slug}`} style={{ color: "var(--text)", padding: "10px 0" }}>Read the memo</a>
                    <a href={st.repoHref} style={{ color: "var(--text)", padding: "10px 0" }}>Code and notebook</a>
                  </div>
                </article>
              ))}
            </div>
            <div className="stack" style={{ gap: 14 }}>
              <div className="mono" style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
                Also in the lab
              </div>
              <div className="row" style={{ gap: 12 }}>
                {lab.map((l) => (
                  <a key={l.label} href={l.href} style={{ flex: "1 1 220px", border: "1px solid var(--line)", borderRadius: 10, padding: "16px 18px", color: "var(--text)", fontSize: 15 }}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SIGNALS */}
        <section id="signals" className="section">
          <div className="wrap stack" style={{ gap: 32 }}>
            <SectionHead
              eyebrow="Live signals and risk"
              title="What is running today."
              lead="A small set of strategies on a daily schedule, with the risk numbers shown right next to the returns."
            />
            <Notices r={r} />
            <div className="row" style={{ gap: 12 }}>
              <Tile k={`Rolling Sharpe, ${a?.sharpe_window ?? 63} days`} v={num(s?.rolling_sharpe)} />
              <Tile k="Max drawdown, all history" v={pct(s?.max_drawdown_all)} />
              <Tile k="VaR 95%, 1 day" v={pct(s?.var_95_1d, 2)} />
              <Tile k="CVaR 95%, 1 day" v={pct(s?.cvar_95_1d, 2)} />
              <Tile k="Regime state" v={s ? s.regime.toUpperCase() : "--"} small />
              <Tile k="Drawdown stop" v={ds ? (ds.active ? "ENGAGED" : "ARMED") : "--"} small />
              <Tile k="Decay check" v={dc ? DECAY_LABEL[dc.status] ?? dc.status : "--"} small />
            </div>
            <div className="card stack" style={{ gap: 16 }}>
              <div className="row" style={{ justifyContent: "space-between", gap: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 500 }}>Cumulative return</div>
                <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>After costs, by segment</div>
              </div>
              {r ? (
                <LineChart dates={r.series.dates} values={r.series.cum_return} segments={r.series.segment} kind="equity" label="Cumulative return by segment" />
              ) : (
                <PlaceholderChart />
              )}
            </div>
            <div className="card stack" style={{ gap: 16 }}>
              <div className="row" style={{ justifyContent: "space-between", gap: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 500 }}>Drawdown</div>
                <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>From the running peak</div>
              </div>
              {r ? (
                <LineChart dates={r.series.dates} values={r.series.drawdown} segments={r.series.segment} kind="drawdown" label="Drawdown from the running peak by segment" />
              ) : (
                <PlaceholderChart />
              )}
            </div>
            <div className="tablebox">
              <table className="qt">
                <thead>
                  <tr><th>Strategy</th><th>Status</th><th>Universe</th><th>Out-of-sample start</th><th>Paper trading start</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{r ? STRATEGY_LABEL[r.meta.strategy] ?? r.meta.strategy : "Baseline trend and volatility target"}</td>
                    <td className="mono" style={{ color: "var(--muted)" }}>{r ? (r.summary.paper_days > 0 ? "Paper trading" : "Backtest") : "Planned"}</td>
                    <td className="mono">{r ? r.meta.ticker : <span className="ph">[ADD]</span>}</td>
                    <td className="mono">{a ? `after ${a.in_sample_end}` : <span className="ph">[ADD DATE]</span>}</td>
                    <td className="mono">{a ? a.paper_start : <span className="ph">[ADD DATE]</span>}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RECORD */}
        <section id="record" className="section">
          <div className="wrap stack" style={{ gap: 32 }}>
            <SectionHead
              eyebrow="Track record"
              title="Backtest and paper trading, kept apart."
              lead="A high Sharpe ratio proves little on its own. What matters is which part of the history was used to build a strategy and which part was never touched."
              draft
            />
            {r ? <SegmentTable r={r} /> : null}
            <div className="row" style={{ gap: 20 }}>
              <div className="card stack" style={{ flex: "1 1 300px", gap: 12 }}>
                <h3 className="h3" style={{ fontSize: 24 }}>Assumptions</h3>
                <p className="body">Costs and frictions are stated up front, never tuned afterward.</p>
                <div className="mono" style={{ fontSize: 13, lineHeight: 1.8 }}>
                  <div>Transaction cost: {a ? `${a.cost_bps} bps per unit of turnover` : <span className="ph">[ADD]</span>}</div>
                  <div>Risk-free rate in Sharpe: {a ? pct(a.risk_free_rate) : <span className="ph">[ADD]</span>}</div>
                  <div>Slippage model: <span className="ph">[ADD]</span></div>
                </div>
              </div>
              <div className="card stack" style={{ flex: "1 1 300px", gap: 12 }}>
                <h3 className="h3" style={{ fontSize: 24 }}>Validation</h3>
                <p className="body">A held-out window and an adjustment for how many ideas were tried before one worked.</p>
                <div className="mono" style={{ fontSize: 13, lineHeight: 1.8 }}>
                  <div>In-sample ends: {a ? a.in_sample_end : <span className="ph">[ADD]</span>}</div>
                  <div>Decay check: {a?.decay_window ? `${a.decay_window}-day Sharpe against the validated range` : <span className="ph">[ADD]</span>}</div>
                  <div>Trials counted: <span className="ph">[ADD]</span></div>
                  <div>Adjusted Sharpe: <span className="ph">[ADD]</span></div>
                </div>
              </div>
              <div className="card stack" style={{ flex: "1 1 300px", gap: 12 }}>
                <h3 className="h3" style={{ fontSize: 24 }}>Disclosure</h3>
                <p className="body">Every figure is labeled by the segment it comes from. The paper-trading log only ever gains rows, and its history is public.</p>
                <div className="mono" style={{ fontSize: 13, lineHeight: 1.8 }}>
                  <div>Failed studies: <span className="ph">[ADD LINK]</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="section">
          <div className="wrap stack" style={{ gap: 32 }}>
            <SectionHead
              eyebrow="Risk and process"
              title="How Quanter runs."
              lead="A fixed path from idea to monitored strategy, so no result depends on how a given week felt."
              draft
            />
            <div className="row" style={{ gap: 16 }}>
              {processSteps.map((p, i) => (
                <div className="step" key={p.title}>
                  <div className="n">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{p.title}</h3>
                  <p className="body">{p.text}</p>
                </div>
              ))}
            </div>
            <div className="row" style={{ gap: 12 }}>
              <Tile k="Volatility target" v={a ? pct(a.target_vol, 0) : "[ADD]"} small />
              <Tile k="Maximum leverage" v={a ? `${a.max_leverage}x` : "[ADD]"} small />
              <Tile k="Cost assumption" v={a ? `${a.cost_bps} bps` : "[ADD]"} small />
              <Tile
                k="Drawdown stop"
                v={ds ? `${pct(ds.threshold, 0)} from peak, ${ds.cooldown_days}-day pause` : "[ADD]"}
                small
              />
              <Tile k="Decay review" v={dc ? "Daily, automatic" : "[ADD]"} small />
            </div>
          </div>
        </section>

        {/* TOOLS */}
        <section id="tools" className="section">
          <div className="wrap stack" style={{ gap: 32 }}>
            <SectionHead
              eyebrow="Tools"
              title="Things built along the way."
              lead="Small applications that grew out of the research, open to try and open to read."
            />
            <div className="row" style={{ gap: 20 }}>
              {tools.map((t) => (
                <article key={t.title} className="card stack" style={{ flex: "1 1 320px", gap: 14 }}>
                  <h3 className="h3">{t.title}</h3>
                  <p className="body">{t.text}</p>
                  <a href={t.href} style={{ marginTop: "auto", color: "var(--text)", fontSize: 14, fontWeight: 500, padding: "10px 0" }}>
                    {t.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="wrap row" style={{ gap: 48 }}>
            <div className="stack" style={{ flex: "1.4 1 420px", minWidth: 0, gap: 20 }}>
              <div className="eyebrow">About</div>
              <h2 className="h2" style={{ margin: 0 }}>Run by Raj.</h2>
              {about.map((p) => (
                <p key={p} className="lead" style={{ lineHeight: 1.7 }}>{p}</p>
              ))}
            </div>
            <div className="card stack" style={{ flex: "1 1 320px", alignSelf: "flex-start", gap: 8 }}>
              <div className="mono" style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>
                Contact
              </div>
              <a href={contact.github.href} style={{ color: "var(--text)", fontSize: 16, padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                {contact.github.label}
              </a>
              <div style={{ fontSize: 16, padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                <span style={{ color: "var(--muted)" }}>Email </span>{contact.email.startsWith("[") ? <T>{contact.email}</T> : <a href={`mailto:${contact.email}`} style={{ color: "var(--text)" }}>{contact.email}</a>}
              </div>
              <div style={{ fontSize: 16, padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                <span style={{ color: "var(--muted)" }}>LinkedIn </span>{contact.linkedin.startsWith("[") ? <T>{contact.linkedin}</T> : <a href={contact.linkedin} style={{ color: "var(--text)" }}>{contact.linkedin.replace("https://www.", "")}</a>}
              </div>
              <div style={{ fontSize: 16, padding: "12px 0" }}>
                <span style={{ color: "var(--muted)" }}>Resume </span><T>{contact.resume}</T>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
