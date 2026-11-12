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
    updated: "2026-11-07",
    data: "Free data only: point-in-time S&P 500 membership rebuilt from the public change log, daily prices from Yahoo Finance, and Ken French factors. Development window 2005-01-03 to 2022, with a holdout from 2023-01-03 that the engine refuses to read.",
    method: "Six signals with signs locked before any real data was loaded: MAX lottery demand, 52-week-high anchoring, short-term reversal, capital gains overhang, realized skewness and abnormal volume. Quintile long-short portfolios rebalanced every 21 trading days, a deflated Sharpe ratio that counts every registered trial, and a comparison of mean-variance, risk parity and HRP weighting.",
    result: "No result yet, by design. The code runs end to end on a synthetic market, and no real-data number will be published until the survivorship report reconciles membership to about 500 names a month. Pre-registration is in docs/hypotheses.md.",
    limit: "Yahoo Finance has no delisted tickers, so free price data biases every return estimate upward. The repo applies an assumed delisting loss and reports a sensitivity grid, but the true missing prices cannot be recovered from free sources.",
    repo: "sentinel",
    repoHref: `${GITHUB}/sentinel`,
    notebook: "docs/hypotheses.md (pre-registration) and docs/REAL_DATA_GATE.md",
    command: "make all",
  },
  {
    slug: "regime-aware-volatility",
    tag: "Volatility",
    title: "Can machine learning beat HAR-RV for next-day volatility?",
    question:
      "Do machine-learning models and regime-switching ensembles forecast SPY realized volatility better than the HAR-RV benchmark?",
    status: "Published",
    updated: "2026-04-07",
    data: "SPY and VIX daily data from Yahoo Finance, 2010-01-04 to 2025-12-30. Chronological split: training 2010-02-25 to 2022-10-21 (3,188 days), test 2022-10-24 to 2025-12-26 (797 days). Extra tests on the 2020 COVID crash and on 2024 to 2025.",
    method: "HAR-RV and GARCH-family benchmarks against Lasso, ElasticNet, Random Forest and XGBoost, plus a constrained stacking ensemble and a regime-switching ensemble. Forecasts are compared with Diebold-Mariano tests (HAC-corrected) on MSE and QLIKE.",
    result: "On the held-out test period HAR-RV and the best machine-learning model (Lasso) are statistically indistinguishable: Diebold-Mariano p = 0.259 (HAC-corrected, MSE). The regime-switching ensemble does worse than a plain equal-weight ensemble, and HAR holds up better in the 2020 stress test, with a mean squared error 39% lower than ElasticNet.",
    limit: "One asset and one chronological split, with a test period of about 800 trading days. The stacking step puts all its weight on the linear models (Lasso 54%, ElasticNet 46%), so the nonlinear models add nothing here, and the result may not carry over to other assets.",
    figure: "Diebold-Mariano p-values against HAR-RV for every model, on MSE and QLIKE loss, from the notebook's evaluation dashboard. Red cells are models the test cannot tell apart from HAR.",
    figureSrc: "/figures/har-dm-pvalues.png",
    repo: "Volatility-Forecast-HAR",
    repoHref: `${GITHUB}/Volatility-Forecast-HAR`,
    notebook: "notebooks/01_vol_forecast_har.ipynb",
    command: "pip install -r requirements.txt && jupyter lab notebooks/01_vol_forecast_har.ipynb",
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
    setup: "15 ETFs, machine-learning views in Black-Litterman, monthly rebalance, after costs",
    ret: "10.70%",
    sharpe: "0.46",
    drawdown: "-28.89%",
    period: "2020-01-01 to 2024-12-31",
    kind: "Walk-forward backtest",
    note: "Black-Litterman without the machine-learning views: 8.79% return, Sharpe 0.33.",
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
    name: "SPY buy and hold",
    setup: "Benchmark for the alpha engine",
    ret: "15.64%",
    sharpe: "0.60",
    drawdown: "-33.93%",
    period: "2020-01-01 to 2024-12-31",
    kind: "Benchmark",
    note: "Higher return than the alpha engine over the same window.",
    href: `${GITHUB}/Alpha-Engine`,
    benchmark: true,
  },
];

export const projectLessons = [
  {
    title: "Alpha engine trailed SPY",
    text: "It earned about 5 points a year less than SPY (10.7% against 15.6%) with a lower Sharpe (0.46 against 0.60). The deflated Sharpe ratio of 0.368 is below the 1.251 threshold for 15 trials, so the edge is not established. It did run at a beta of 0.58 with a shallower drawdown (-28.9% against -33.9%).",
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
    title: "Machine learning did not beat HAR-RV",
    text: "On next-day SPY volatility, the best machine-learning model was statistically indistinguishable from the HAR-RV benchmark (Diebold-Mariano p = 0.259), and HAR held up better in the 2020 crash.",
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
