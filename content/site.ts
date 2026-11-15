// Everything you edit by hand lives here. Any text that starts with [ is shown in the
// amber placeholder style, so it is obvious what still needs a real value.

export const GITHUB = "https://github.com/rxj0102";

export const contact = {
  github: { label: "GitHub: rxj0102", href: GITHUB },
  email: "rajvardhanjadhav124@gmail.com",
  linkedin: "https://www.linkedin.com/in/rajvardhan-jadhav-03b201228",
  portfolio: "https://rxj0102.github.io",
};

export interface Study {
  slug: string; // used in the URL: /research/<slug>
  tag: string;
  title: string;
  question: string;
  status: "In progress" | "Published";
  updated: string;
  data: string;
  method: string;
  result: string;
  limit: string;
  figure?: string; // caption for the main chart, shown only with figureSrc
  figureSrc?: string; // image under /public, taken from the repository's own output
  repo: string; // repository name shown on the memo page
  repoHref: string; // link to the repository
  notebook: string;
  command: string;
}

export const studies: Study[] = [
  {
    slug: "behavioral-signals-cross-section",
    tag: "Behavioral asset pricing",
    title: "Behavioral signals in the cross-section of returns",
    question:
      "Do six behavioral signals, from lottery preference to the disposition effect, predict S&P 500 stock returns after costs, and do they hold up in a holdout that was locked before any test?",
    status: "In progress",
    updated: "2026-11-15",
    data: "Free data only: point-in-time S&P 500 membership rebuilt from the public change log, daily prices from Yahoo Finance, and Ken French factors. Development window 2005-01-03 to 2022, with a holdout from 2023-01-03 that the engine refuses to read.",
    method: "Six signals with signs locked before any real data was loaded: MAX lottery demand, 52-week-high anchoring, short-term reversal, capital gains overhang, realized skewness and abnormal volume. Quintile long-short portfolios rebalanced every 21 trading days, a deflated Sharpe ratio that counts every registered trial, and a comparison of mean-variance, risk parity and HRP weighting.",
    result: "Two findings, both negative. First, the free data cannot carry the stock-level test: 250 of 867 historical index members have no price history, and 39 percent of index member days are missing in 2005 (9 percent in 2022), so the gate on stock-level results stays shut. Second, on published portfolios built from the full CRSP universe, none of the four testable locked signs is confirmed over 2005 to 2022 (largest t = 1.73), although three of the four were significant before 2005.",
    limit: "Yahoo Finance has no delisted tickers, so free price data biases every return estimate upward. The repo applies an assumed delisting loss and reports a sensitivity grid, but the true missing prices cannot be recovered from free sources.",
    repo: "sentinel",
    repoHref: `${GITHUB}/sentinel`,
    notebook: "docs/hypotheses.md (pre-registration) and docs/REAL_DATA_GATE.md",
    command: "make all",
  },
  {
    slug: "regime-aware-volatility",
    tag: "Volatility",
    title: "Can machine learning beat HAR at forecasting volatility?",
    question: "Do lasso, random forest and gradient boosting forecast US equity variance better out of sample than the HAR model, given the same information plus the VIX and a leverage term?",
    status: "Published",
    updated: "2026-11-15",
    data: "Free open data: daily US market total return from the Ken French library and VIX from FRED, 1990-01-02 to 2026-09-30. Every model is refitted each January on earlier data only; forecasts run from 2000 (6725 out-of-sample days).",
    method: "Target: the mean squared daily return over the next 1, 5 or 22 days, which never overlaps the inputs. Eleven models: no change, EWMA, GARCH, GJR-GARCH, a VIX regression, HAR, HAR with VIX and leverage, lasso, random forest, gradient boosting and a blend. Compared with QLIKE and squared error, Diebold-Mariano tests against HAR with Newey-West errors.",
    result: "Sometimes, and it is the wrong comparison. A random forest has lower QLIKE loss than HAR at 1 and 5 days (t = -5.7 and -2.9) but not at 22 days and not under squared error. Gradient boosting has a higher QLIKE loss than HAR at every horizon. GJR-GARCH, an older model in which falling prices raise variance more than rising ones, beats HAR at 1 and 5 days (t = -6.7 and -4.7), and no machine-learning model is significantly better than it at any horizon.",
    limit: "One asset. Squared daily returns are a noisy proxy for variance; free intraday history is not available. The forecast floor rule was changed once after a first run and the comparison against GJR-GARCH was added after seeing the results; both are disclosed in the repository. An earlier version of this study used a target that overlapped its inputs and reported HAR as the winner.",
    figure: "QLIKE loss of each model relative to HAR at the three horizons",
    repo: "Volatility-Forecast-HAR",
    repoHref: `${GITHUB}/Volatility-Forecast-HAR`,
    notebook: "scripts/reproduce.py",
    command: "pip install -r requirements.txt && python scripts/reproduce.py",
  },
  {
    slug: "risk-neutral-density",
    tag: "Options-implied risk",
    title: "Risk-neutral density extraction",
    question:
      "What do option prices imply about the distribution of future returns, and how stable is that signal over time?",
    status: "Published",
    updated: "2026-04-08",
    data: "Live AAPL option chain from Yahoo Finance (yfinance), 30-day expiry, April 2026 snapshot. Contracts filtered by open interest and bid-ask spread.",
    method: "Implied vols from Black-Scholes (Brent). Densities from Breeden-Litzenberger (PCHIP spline), SVI and SSVI fits, compared with a historical density built from 5 years of rolling 30-day log returns.",
    result: "The implied density is left-skewed and fatter-tailed than the historical one (skewness -0.59 with Breeden-Litzenberger, -0.37 with SSVI, against -0.02 historical). SSVI implied vol of 30.61% against 27.37% realized gives a variance risk premium of +3.24 points.",
    limit: "One underlying and one expiry on one date, with no calendar-spread arbitrage checks. Breeden-Litzenberger densities can be noisy with real bid-ask data, and B-L and SVI underfit the left tail at short expiries.",
    repo: "Risk-Neutral-Density",
    repoHref: `${GITHUB}/Risk-Neutral-Density`,
    notebook: "notebooks/01_risk_neutral_density.ipynb",
    command: "pip install -r requirements.txt && cd notebooks && jupyter notebook 01_risk_neutral_density.ipynb",
  },
];

export const lab = [
  { label: "Portfolio VaR: 13 models, Christoffersen backtests", href: `${GITHUB}/Portfolio-VaR` },
  { label: "Multi-asset alpha engine: ML views in Black-Litterman", href: `${GITHUB}/Alpha-Engine` },
  { label: "Volatility forecasting: GARCH against gradient boosting", href: `${GITHUB}/Volatility-Forecasting` },
  { label: "Next-day stock return prediction", href: `${GITHUB}/Stock-Return-Prediction` },
  { label: "Bank VaR disclosure audit: Kupiec and Christoffersen tests", href: `${GITHUB}/var-confidence-audit` },
  { label: "WorldQuant BRAIN alphas", href: "https://rxj0102.github.io/#brain" },
];

export const tools = [
  {
    title: "QuantQuest interview prep",
    text: "Quant interview practice with a skill tree, spaced review and a timed interview mode. Every question is checked by code before it can appear.",
    href: `${GITHUB}/quantquest`,
    cta: "Read the code",
  },
  {
    title: "Fed sentiment risk monitor",
    text: "Scores the latest FOMC statement from -100 (dovish) to +100 (hawkish) and shows how markets moved after the most similar past statements.",
    href: `${GITHUB}/fed-sentiment-risk-monitor`,
    cta: "Read the code",
  },
  {
    title: "Model demos and BRAIN fitness explorer",
    text: "Browser demos of the core model in each repository, plus an interactive chart of how Sharpe, returns and turnover set the BRAIN fitness score.",
    href: "https://rxj0102.github.io",
    cta: "Open the demos",
  },
];

export interface ProjectResult {
  name: string;
  setup: string;
  ret: string;
  sharpe: string;
  drawdown: string;
  period: string;
  kind: string;
  note: string;
  href: string;
  benchmark?: boolean;
}

// Return comes first, and every row carries its risk, period and segment.
export const projectResults: ProjectResult[] = [
  {
    name: "Multi-asset alpha engine",
    setup: "13 open data stand ins for multi-asset ETFs, pooled machine-learning views in Black-Litterman, monthly rebalance, after costs",
    ret: "9.17%",
    sharpe: "0.56",
    drawdown: "-35.60%",
    period: "1996-10-01 to 2026-09-30",
    kind: "Walk-forward backtest",
    note: "Equal weight on the same assets: 10.46% return, Sharpe 0.60. Momentum views in the same optimiser: 10.61%, Sharpe 0.54. No difference from equal weight is significant.",
    href: `${GITHUB}/Alpha-Engine`,
  },
  {
    name: "Next-day stock return prediction",
    setup: "AAPL, tuned random forest, long only",
    ret: "7.46% total",
    sharpe: "0.13",
    drawdown: "-33.49%",
    period: "2022 to 2023 (500 days)",
    kind: "Backtest",
    note: "Total return over the period, not annualised. Buy and hold: 6.99%, Sharpe 0.12, drawdown -30.02%.",
    href: `${GITHUB}/Stock-Return-Prediction`,
  },
  {
    name: "US market buy and hold",
    setup: "Benchmark for the alpha engine (Ken French US market, the SPY stand in)",
    ret: "11.78%",
    sharpe: "0.49",
    drawdown: "-54.57%",
    period: "1996-10-01 to 2026-09-30",
    kind: "Benchmark",
    note: "Higher return than the alpha engine over the same window, with more volatility and a deeper drawdown.",
    href: `${GITHUB}/Alpha-Engine`,
    benchmark: true,
  },
];

export const projectLessons = [
  {
    title: "ML views did not beat equal weight",
    text: "Over 30 years out of sample the machine-learning portfolio had a Sharpe of 0.56 against 0.60 for equal weight on the same assets, and the gap is not significant. The model does rank assets better than chance (rank IC 0.052, t = 2.4), and before costs its Sharpe is 0.68. But it turns over 6.7 times its capital a year, so costs take the gain, and the skill has faded: the IC was 0.10 in 1996-2006 and -0.01 since 2020. Momentum and bond carry views did no better.",
  },
  {
    title: "Return prediction found no real edge",
    text: "The strategy returned 7.46% against 6.99% for buy and hold over 500 days, with a larger drawdown (-33.5% against -30.0%) and a Sharpe of 0.13 against 0.12. That gap is within noise.",
  },
  {
    title: "BRAIN alphas still fail fitness",
    text: "The volume-price family reached a Sharpe of 1.33 on WorldQuant BRAIN but a fitness of 0.55, below the 1.0 bar. Closing that gap at the same Sharpe needs about 3.3 times the return per unit of turnover. The buzz signal reached a Sharpe of 1.54 as a conditional filter, then needed turnover control.",
  },
  {
    title: "The model to beat was GJR-GARCH, not HAR",
    text: "Over 26 years of walk-forward forecasts, a random forest beat HAR at short horizons under QLIKE but no machine-learning model was significantly better than GJR-GARCH, a 1993 model whose one extra parameter lets falling prices raise variance more than rising ones. What HAR lacked was the asymmetry, not flexibility. An earlier version of this study had HAR winning, because its target overlapped its own inputs.",
  },
];

export const processSteps = [
  { title: "Hypothesis first", text: "The economic reason for a signal is written down before any test is run." },
  { title: "Data checks", text: "Look-ahead, survivorship and timing of every field are audited before modeling." },
  { title: "Backtest with frictions", text: "Costs and capacity limits are part of the first run, not an afterthought." },
  { title: "Validate out of sample", text: "A held-out window decides whether a signal moves to paper trading." },
  { title: "Size and limit", text: "Position sizes follow a volatility target, with hard caps on exposure." },
  { title: "Monitor for decay", text: "Live results are compared with the validated range, and a strategy is flagged for review when it leaves it." },
];

export const about = [
  "I am completing an MS in Quantitative Finance and Risk Management at the Fox School of Business at Temple University, graduating in May 2027. Before that I earned a B.Tech in Computer Science at NIT Warangal.",
  "Quanter is where I do the work I want to do professionally: behavioral quant, quant research and risk. I am looking for roles in those areas after graduation.",
];

export const disclaimer =
  "Quanter is an independent research and paper-trading project. It does not manage client money and nothing here is investment advice. Backtested and simulated results have inherent limits and do not guarantee future performance.";
