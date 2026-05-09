export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title">MyClass Scheduler</h1>
        <p className="hero-subtitle">
          A simple, modern course scheduling portal for students and teachers.
          Browse available classes, build your semester schedule, and manage
          your courses — all in one place.
        </p>
        <div className="hero-cards">
          <div className="hero-card">
            <h3>For Students</h3>
            <p>Search for courses, enroll in classes, and view your personal schedule anytime.</p>
          </div>
          <div className="hero-card">
            <h3>For Teachers</h3>
            <p>Create and manage your course listings, edit details, and keep your catalog up to date.</p>
          </div>
        </div>
        <p className="hero-cta">
          New here? <a href="/SDEV_255_Final_Project_Team_1/register">Create an account</a> to get started,
          or <a href="/SDEV_255_Final_Project_Team_1/login">sign in</a> if you already have one.
        </p>
      </div>
    </section>
  );
}