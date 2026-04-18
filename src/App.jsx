function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Team One's Final Project for SDEV255</h1>
        <p className="hero-subtitle">
          This is a simple React application built as part of our final project for the Web Application Development course. Explore the features and learn more about our project by clicking the button below.
        </p>
        <a href="#about" className="hero-btn">Learn More</a>
      </div>
    </section>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Final Project SDEV255</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}