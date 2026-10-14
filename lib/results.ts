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
