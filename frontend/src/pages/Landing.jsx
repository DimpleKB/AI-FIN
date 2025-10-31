// pages/App.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function App() {
  return (
    <div className="App"style={{
        minHeight: "100vh",
        width: "100%",
        background: darkMode ? "#121212" : "#f9fafb",
        color: darkMode ? "#e0e0e0" : "#333",
        padding: "20px",
        boxSizing: "border-box",
        marginLeft: window.innerWidth > 768 ? "260px" : "0", // account for sidebar
        transition: "all 0.3s", }}>
      <header className="navbar">
        <h1 className="logo">AI Finance Tracker</h1>
        <nav>
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#testimonials">Testimonials</a>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="btn-outline">Login</Link>
          <Link to="/signup" className="btn-primary">Sign Up</Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Take Control of Your Money with AI</h1>
          <p>Smart insights, automated tracking, and personalized recommendations powered by AI.</p>
          <div className="hero-buttons-wrapper">
            <Link className="btn-primary" to="/signup">Get Started Free</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://tse1.mm.bing.net/th/id/OIP.DHfAEOYUlR3MzcCHVA0THQHaEo?rs=1&pid=ImgDetMain&o=7&rm=3" alt="AI Finance Illustration" />
        </div>
      </section>

      {/* Features, How It Works, Testimonials, CTA, Footer */}
      <section id="features" className="features">
        <h2>Features</h2>
        <div className="grid">
          {/* feature cards */}
        </div>
      </section>

      <section id="how" className="how">
        <h2>How It Works</h2>
        <div className="grid">
          <div className="feature-card">1️⃣ Connect your bank accounts securely</div>
          <div className="feature-card">2️⃣ AI auto-categorizes spending</div>
          <div className="feature-card">3️⃣ Get insights & achieve goals</div>
        </div>
      </section>

      <section id="testimonials" className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="grid">
          <div className="feature-card">“This AI tracker helped me save 20%!” - Priya</div>
          <div className="feature-card">“Managing finances feels effortless now.” - Arjun</div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to take control of your finances?</h2>
        <Link to="/signup" className="btn-primary">Get Started Free →</Link>
      </section>

      <footer className="footer">
        <p>© 2025 AI Finance Tracker. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
