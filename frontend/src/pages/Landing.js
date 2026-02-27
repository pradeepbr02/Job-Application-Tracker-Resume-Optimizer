import "./../styles/landing.css";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="navbar">
        <h2 className="logo">JTRO</h2>
        <div>
          <button className="nav-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="nav-btn primary" onClick={() => navigate("/signup")}>
            Get Started
          </button>
        </div>
      </nav>

      <section className="hero">
        <h1>Track Jobs. Optimize Resume. Get Hired Faster.</h1>
        <p>
          AI-powered job tracker and resume optimizer built for developers
          who want results.
        </p>

        <div className="hero-buttons">
          <button className="primary" onClick={() => navigate("/signup")}>
            Create Free Account
          </button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>📌 Job Tracking</h3>
          <p>Track application status from applied to offer.</p>
        </div>

        <div className="feature-card">
          <h3>🤖 AI Resume Analysis</h3>
          <p>Get instant feedback and improvement suggestions.</p>
        </div>

        <div className="feature-card">
          <h3>📊 Analytics Dashboard</h3>
          <p>Understand your job search performance.</p>
        </div>
      </section>
    </div>
  );
}