export type Segment = "in_sample" | "out_of_sample" | "paper";

export interface SegStats {
  days: number;
  ann_return: number | null;
  ann_vol: number | null;
  sharpe: number | null;
  max_drawdown: number | null;
  start: string | null;
  end: string | null;
}

export interface Results {
  meta: {
    generated_at: string;
    last_data_date: string;
    synthetic: boolean;
    strategy: string;
    ticker: string;
    assumptions: {
      target_vol: number;
      max_leverage: number;
      cost_bps: number;
      risk_free_rate: number;
      sharpe_window: number;
      var_window: number;
      var_level: number;
      in_sample_end: string;
      paper_start: string;
      dd_stop?: number;
      dd_cooldown?: number;
      decay_window?: number;
      decay_quantile?: number;
    };
  };
  summary: {
    rolling_sharpe: number | null;
    max_drawdown_all: number | null;
    max_drawdown_paper: number | null;
    var_95_1d: number | null;
    cvar_95_1d: number | null;
    regime: string;
    paper_days: number;
    // Optional so the site still renders against results files made before these existed.
    drawdown_stop?: {
      threshold: number;
      cooldown_days: number;
      active: boolean;
      current_drawdown: number | null;
      trigger_count: number;
      days_stopped: number;
    };
    decay?: {
      status: "within_range" | "review" | "flat" | "insufficient_data";
      window: number;
      quantile: number;
      reference_days: number;
      current_sharpe: number | null;
      lower_bound: number | null;
      percentile: number | null;
      current_drawdown: number | null;
      worst_validated_drawdown: number | null;
      flags: string[];
    };
  };
  segments: Record<Segment, SegStats>;
  series: {
    dates: string[];
    segment: Segment[];
    cum_return: (number | null)[];
    drawdown: (number | null)[];
    rolling_sharpe: (number | null)[];
  };
}

export const SEGMENT_LABEL: Record<Segment, string> = {
  in_sample: "In-sample backtest",
  out_of_sample: "Out-of-sample backtest",
  paper: "Paper trading",
};

export const DECAY_LABEL: Record<string, string> = {
  within_range: "WITHIN RANGE",
  review: "REVIEW",
  flat: "FLAT",
  insufficient_data: "TOO EARLY",
};

export const FLAG_LABEL: Record<string, string> = {
  sharpe_below_validated_range: "rolling Sharpe is below the validated range",
  drawdown_beyond_validated: "drawdown is deeper than the worst validated drawdown",
};

export const STRATEGY_LABEL: Record<string, string> = {
  baseline_trend_voltarget: "Baseline trend and volatility target",
};

/** Reads the pipeline output. Returns null when it is not configured or not reachable. */
export async function getResults(): Promise<Results | null> {
  const url = process.env.RESULTS_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = (await res.json()) as Results;
    if (!data?.series?.dates?.length) return null;
    return data;
  } catch {
    return null;
  }
}

export const pct = (x: number | null | undefined, digits = 1): string =>
  x == null ? "--" : `${(x * 100).toFixed(digits)}%`;

export const num = (x: number | null | undefined, digits = 2): string =>
  x == null ? "--" : x.toFixed(digits);

/** Below this many trading days, annualized figures are not shown. */
export const MIN_ANNUALIZE_DAYS = 60;

/** Daily net returns of one segment, rebuilt from the cumulative return series. */
export function segmentReturns(r: Results, seg: Segment): number[] {
  const { cum_return, segment } = r.series;
  const out: number[] = [];
  for (let i = 1; i < cum_return.length; i++) {
    const a = cum_return[i - 1];
    const b = cum_return[i];
    if (segment[i] !== seg || a == null || b == null) continue;
    out.push((1 + b) / (1 + a) - 1);
  }
  return out;
}

/** Compounded return over a segment, not annualized. */
export function segmentTotalReturn(r: Results, seg: Segment): number | null {
  const rets = segmentReturns(r, seg);
  if (!rets.length) return null;
  return rets.reduce((acc, x) => acc * (1 + x), 1) - 1;
}

function normCdf(z: number): number {
  // Abramowitz and Stegun 7.1.26, absolute error below 1.5e-7.
  const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const erf = 1 - poly * Math.exp(-(z * z) / 2);
  return z >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf);
}

/**
 * Probabilistic Sharpe ratio (Bailey and Lopez de Prado, 2012): the probability that the true
 * Sharpe ratio is above zero, allowing for skewness and fat tails. With one trial counted, the
 * deflated Sharpe ratio equals this value.
 */
export function probabilisticSharpe(rets: number[]): number | null {
  const n = rets.length;
  if (n < 30) return null;
  const mean = rets.reduce((a, b) => a + b, 0) / n;
  const m2 = rets.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
  if (m2 <= 0) return null;
  const sd = Math.sqrt(m2);
  const m3 = rets.reduce((a, b) => a + (b - mean) ** 3, 0) / n;
  const m4 = rets.reduce((a, b) => a + (b - mean) ** 4, 0) / n;
  const skew = m3 / sd ** 3;
  const kurt = m4 / sd ** 4;
  const sr = mean / sd;
  const denom = 1 - skew * sr + ((kurt - 1) / 4) * sr * sr;
  if (denom <= 0) return null;
  return normCdf((sr * Math.sqrt(n - 1)) / Math.sqrt(denom));
}
