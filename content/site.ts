// Everything you edit by hand lives here. Any text that starts with [ is shown in the
// amber placeholder style, so it is obvious what still needs a real value.

export const GITHUB = "https://github.com/rxj0102";

export const contact = {
  github: { label: "GitHub: rxj0102", href: GITHUB },
  email: "rajvardhanjadhav124@gmail.com",
  linkedin: "https://www.linkedin.com/in/rajvardhan-jadhav-03b201228",
  resume: "[ADD PDF]",
};

export interface Study {
  slug: string; // used in the URL: /research/<slug>
  tag: string;
  title: string;
  question: string;
  status: "Draft" | "Published";
  updated: string;
  data: string;
  method: string;
  result: string;
  limit: string;
  figure: string; // caption for the main chart or table
  repo: string; // repository name shown on the memo page
  repoHref: string; // link to the repository
  notebook: string;
  command: string;
}

export const studies: Study[] = [
  {
    slug: "behavioral-signals-cross-section",
    tag: "Behavioral asset pricing",
    title: "Behavioral and alternative-data signals in the cross-section of returns",
    question:
      "Which measures of investor behavior predict returns after costs, and do they survive out of sample?",
    status: "Draft",
    updated: "[ADD DATE]",
    data: "[ADD SOURCE, UNIVERSE AND SAMPLE PERIOD]",
    method: "[ADD HOW SIGNALS ARE BUILT, SORTED AND TESTED]",
    result: "[ADD HEADLINE FINDING WITH ITS NUMBER AND SEGMENT]",
    limit: "[ADD THE MAIN REASON THIS MIGHT BE WRONG]",
    figure: "[ADD FIGURE: for example, long-short return by decile]",
    repo: "[ADD REPO NAME]",
    repoHref: GITHUB,
    notebook: "[ADD NOTEBOOK PATH]",
    command: "[ADD COMMAND THAT REPRODUCES THE FIGURES]",
  },
  {
    slug: "regime-aware-volatility",
    tag: "Volatility",
    title: "Can machine learning beat HAR-RV for next-day volatility?",
    question:
      "Do machine-learning models and regime-switching ensembles forecast US equity market realized volatility better than the HAR-RV benchmark?",
    status: "Draft",
    updated: "2026-11-14",
    data: "Free open data: the Ken French US market total return as the SPY stand in and VIX from FRED (VIXCLS), 2010-01-04 to 2025-12-31. Chronological split: training 2010-02-25 to 2022-10-21 (3,188 days), test 2022-10-24 to 2025-12-29 (798 days). Extra tests on the 2020 COVID crash and on 2024 to 2025.",
    method: "HAR-RV and GARCH-family benchmarks against Lasso, ElasticNet, Random Forest and XGBoost, plus a constrained stacking ensemble and a regime-switching ensemble. Forecasts are compared with Diebold-Mariano tests (HAC-corrected) on MSE and QLIKE.",
    result: "HAR-RV has the lowest test error (MSE and QLIKE, test R2 0.73). The best machine-learning model (Lasso) has 12.8% higher MSE, but the gap is not significant: Diebold-Mariano p = 0.200 (HAC-corrected, MSE). HAR does significantly beat the GARCH family, Random Forest and XGBoost. The regime-switching ensemble does worse than a plain equal-weight ensemble, and in the 2020 stress test ElasticNet's mean squared error is 44% higher than HAR's.",
    limit: "One asset and one chronological split, with a test period of about 800 trading days. The stacking step puts all its weight on the linear models (ElasticNet 68%, Lasso 32%), so the nonlinear models add nothing here. Open data has closes only, so the range-based Garman-Klass feature is not used, and the result may not carry over to other assets.",
    figure: "Evaluation dashboard from the notebook: forecast comparison across models",
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
    status: "Draft",
    updated: "2026-04-08",
    data: "Live AAPL option chain from Yahoo Finance (yfinance), 30-day expiry, April 2026 snapshot. Contracts filtered by open interest and bid-ask spread.",
    method: "Implied vols from Black-Scholes (Brent). Densities from Breeden-Litzenberger (PCHIP spline), SVI and SSVI fits, compared with a historical density built from 5 years of rolling 30-day log returns.",
    result: "The implied density is left-skewed and fatter-tailed than the historical one (skewness -0.59 with Breeden-Litzenberger, -0.37 with SSVI, against -0.02 historical). SSVI implied vol of 30.61% against 27.37% realized gives a variance risk premium of +3.24 points.",
    limit: "One underlying and one expiry on one date, with no calendar-spread arbitrage checks. Breeden-Litzenberger densities can be noisy with real bid-ask data, and B-L and SVI underfit the left tail at short expiries.",
    figure: "[ADD FIGURE: for example, implied density on two dates]",
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
  { label: "Sovereign volatility engine", href: GITHUB },
  { label: "WorldQuant BRAIN alphas", href: "https://rxj0102.github.io" },
];

export const tools = [
  {
    title: "Behavioral bias diagnostic",
    text: "Upload a trade history and see which behavioral biases show up in it, such as holding losers too long.",
    href: GITHUB,
    cta: "Open the app",
  },
  {
    title: "Quant interview prep game",
    text: "A daily set of generated quant questions, played as a game with streaks and levels.",
    href: GITHUB,
    cta: "Open the app",
  },
  {
    title: "Alpha expression workbench",
    text: "A local simulator for testing alpha expressions before they go to WorldQuant BRAIN.",
    href: GITHUB,
    cta: "Read the code",
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
    setup: "13 ETF stand ins from open data, machine-learning views in Black-Litterman, monthly rebalance, after costs",
    ret: "9.27%",
    sharpe: "0.36",
    drawdown: "-30.64%",
    period: "2020-01-02 to 2024-12-31",
    kind: "Walk-forward backtest",
    note: "Model active from 2021-12-31 (equal weight warm-up before). Without the machine-learning views: 9.50% return, Sharpe 0.37.",
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
    name: "BRAIN volume-price alpha family",
    setup: "WorldQuant BRAIN Fast Expression signals",
    ret: "[ADD RETURN]",
    sharpe: "1.33",
    drawdown: "[ADD]",
    period: "[ADD PERIOD]",
    kind: "BRAIN simulation",
    note: "Fitness 0.55, below the 1.0 submission bar. Turnover and return to be added.",
    href: "https://rxj0102.github.io",
  },
  {
    name: "BRAIN buzz signal as a filter",
    setup: "WorldQuant BRAIN, used as a conditional filter",
    ret: "[ADD RETURN]",
    sharpe: "1.54",
    drawdown: "[ADD]",
    period: "[ADD PERIOD]",
    kind: "BRAIN simulation",
    note: "[ADD FITNESS AND TURNOVER]",
    href: "https://rxj0102.github.io",
  },
  {
    name: "US market buy and hold",
    setup: "Benchmark for the alpha engine (Ken French US market, the SPY stand in)",
    ret: "15.64%",
    sharpe: "0.53",
    drawdown: "-34.22%",
    period: "2020-01-02 to 2024-12-31",
    kind: "Benchmark",
    note: "Higher return than the alpha engine over the same window.",
    href: `${GITHUB}/Alpha-Engine`,
    benchmark: true,
  },
];

export const projectLessons = [
  {
    title: "Alpha engine trailed SPY",
    text: "It earned about 6 points a year less than the US market (9.3% against 15.6%) with a lower Sharpe (0.36 against 0.53), and the version without machine-learning views did slightly better (Sharpe 0.37). The deflated Sharpe ratio of 0.460 is below the 0.776 threshold for 13 trials, so the edge is not established. It did run at a beta of 0.56 with a shallower drawdown (-30.6% against -34.2%).",
  },
  {
    title: "Return prediction found no real edge",
    text: "The strategy returned 7.46% against 6.99% for buy and hold over 500 days, with a larger drawdown (-33.5% against -30.0%) and a Sharpe of 0.13 against 0.12. That gap is within noise.",
  },
  {
    title: "Machine learning did not beat HAR-RV",
    text: "On next-day US equity market volatility, HAR-RV had the lowest error and the best machine-learning model was statistically indistinguishable from it (Diebold-Mariano p = 0.200), and HAR held up better in the 2020 crash.",
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
