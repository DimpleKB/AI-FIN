import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="App">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">AI Finance Tracker</h1>

        {/* Hamburger */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`line ${menuOpen ? "rotate1" : ""}`}></div>
          <div className={`line ${menuOpen ? "fade" : ""}`}></div>
          <div className={`line ${menuOpen ? "rotate2" : ""}`}></div>
        </div>

        <nav className={menuOpen ? "active" : ""}>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
          <div className="auth-buttons">
            <Link to="/login" className="btn-outline" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/signup" className="btn-primary" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Take Control of Your Money with AI</h1>
          <p>Smart insights, automated tracking, and personalized recommendations powered by AI.</p>
          <div className="hero-buttons-wrapper">
            <Link className="btn-primary" to="/signup">Get Started Free</Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://tse1.mm.bing.net/th/id/OIP.DHfAEOYUlR3MzcCHVA0THQHaEo?rs=1&pid=ImgDetMain&o=7&rm=3" 
            alt="AI Finance Illustration"
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features section-container">
        <h2>Features</h2>
        <div className="grid">
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/combo-chart--v1.png" alt="Dashboard" />
            <h3>Smart Dashboard</h3>
            <p>View a clean overview of your spending, income, and savings in real time.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/artificial-intelligence.png" alt="AI Insights" />
            <h3>AI Insights</h3>
            <p>Get personalized money-saving tips and spending analysis with AI.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/receipt.png" alt="Receipt Scanning" />
            <h3>Receipt Scanning</h3>
            <p>Snap a picture of receipts and let AI extract expenses automatically.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/microphone.png" alt="Voice Input" />
            <h3>Voice-to-Input</h3>
            <p>Add transactions quickly using just your voice — hands-free tracking.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/alarm.png" alt="Notifications" />
            <h3>Smart Notifications</h3>
            <p>Receive alerts for bills, overspending, and savings goals in real-time.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/security-checked.png" alt="Security" />
            <h3>Bank-Level Security</h3>
            <p>Your data is encrypted and protected with top-level security protocols.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="how section-container">
        <h2>How It Works</h2>
        <div className="grid">
          <div className="feature-card">1️⃣ Connect your bank accounts securely</div>
          <div className="feature-card">2️⃣ AI auto-categorizes spending</div>
          <div className="feature-card">3️⃣ Get insights & achieve goals</div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials section-container">
        <h2>What Our Users Say</h2>
        <div className="grid">
          <div className="feature-card">“This AI tracker helped me save 20%!” - Priya</div>
          <div className="feature-card">“Managing finances feels effortless now.” - Arjun</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to take control of your finances?</h2>
        <Link to="/signup" className="btn-primary">Get Started Free →</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 AI Finance Tracker. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
