export default function SiteHeader() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a href="/" className="brand">QUANTER</a>
        <nav aria-label="Sections" className="nav-links">
          <a href="/#research">Research</a>
          <a href="/#signals">Signals</a>
          <a href="/#record">Record</a>
          <a href="/#process">Risk</a>
          <a href="/#tools">Tools</a>
          <a href="/#about">About</a>
        </nav>
      </div>
    </header>
  );
}
