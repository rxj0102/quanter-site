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
      "Do machine-learning models and regime-switching ensembles forecast SPY realized volatility better than the HAR-RV benchmark?",
    status: "Draft",
    updated: "2026-04-07",
    data: "SPY and VIX daily data from Yahoo Finance, 2010-01-04 to 2025-12-30. Chronological split: training 2010-02-25 to 2022-10-21 (3,188 days), test 2022-10-24 to 2025-12-26 (797 days). Extra tests on the 2020 COVID crash and on 2024 to 2025.",
    method: "HAR-RV and GARCH-family benchmarks against Lasso, ElasticNet, Random Forest and XGBoost, plus a constrained stacking ensemble and a regime-switching ensemble. Forecasts are compared with Diebold-Mariano tests (HAC-corrected) on MSE and QLIKE.",
    result: "On the held-out test period HAR-RV and the best machine-learning model (Lasso) are statistically indistinguishable: Diebold-Mariano p = 0.259 (HAC-corrected, MSE). The regime-switching ensemble does worse than a plain equal-weight ensemble, and HAR holds up better in the 2020 stress test, with a mean squared error 39% lower than ElasticNet.",
    limit: "One asset and one chronological split, with a test period of about 800 trading days. The stacking step puts all its weight on the linear models (Lasso 54%, ElasticNet 46%), so the nonlinear models add nothing here, and the result may not carry over to other assets.",
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
