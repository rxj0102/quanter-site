// Everything you edit by hand lives here. Any text that starts with [ is shown in the
// amber placeholder style, so it is obvious what still needs a real value.

export const GITHUB = "https://github.com/rxj0102";

export const contact = {
  github: { label: "GitHub: rxj0102", href: GITHUB },
  email: "[YOUR EMAIL]",
  linkedin: "[YOUR LINK]",
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
    title: "Regime-aware volatility forecasting",
    question:
      "Does conditioning on the market regime improve volatility forecasts, and the risk limits that are set from them?",
    status: "Draft",
    updated: "[ADD DATE]",
    data: "[ADD SOURCE, UNIVERSE AND SAMPLE PERIOD]",
    method: "[ADD MODELS COMPARED AND HOW FORECASTS ARE SCORED]",
    result: "[ADD HEADLINE FINDING WITH ITS NUMBER AND SEGMENT]",
    limit: "[ADD THE MAIN REASON THIS MIGHT BE WRONG]",
    figure: "[ADD FIGURE: for example, forecast error by regime]",
    repo: "[ADD REPO NAME]",
    repoHref: GITHUB,
    notebook: "[ADD NOTEBOOK PATH]",
    command: "[ADD COMMAND THAT REPRODUCES THE FIGURES]",
  },
  {
    slug: "risk-neutral-density",
    tag: "Options-implied risk",
    title: "Risk-neutral density extraction",
    question:
      "What do option prices imply about the distribution of future returns, and how stable is that signal over time?",
    status: "Draft",
    updated: "[ADD DATE]",
    data: "[ADD SOURCE, UNDERLYING AND SAMPLE PERIOD]",
    method: "[ADD HOW THE DENSITY IS EXTRACTED AND CHECKED]",
    result: "[ADD HEADLINE FINDING WITH ITS NUMBER AND SEGMENT]",
    limit: "[ADD THE MAIN REASON THIS MIGHT BE WRONG]",
    figure: "[ADD FIGURE: for example, implied density on two dates]",
    repo: "[ADD REPO NAME]",
    repoHref: GITHUB,
    notebook: "[ADD NOTEBOOK PATH]",
    command: "[ADD COMMAND THAT REPRODUCES THE FIGURES]",
  },
];

export const lab = [
  { label: "Portfolio VaR modeling", href: GITHUB },
  { label: "Sovereign volatility engine", href: GITHUB },
  { label: "Multi-asset alpha engine", href: GITHUB },
  { label: "WorldQuant BRAIN alphas", href: GITHUB },
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
