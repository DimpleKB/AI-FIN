import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../App.css";

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      {/* ✅ Navbar */}
      <header className="navbar">
        <div className="navbar-container">
          <h1 className="logo">AI Finance Tracker</h1>

          {/* Hamburger Icon (mobile) */}
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Navigation Links */}
          <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
            <div className="auth-buttons">
              <Link to="/login" className="btn-outline" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="btn-primary" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* ✅ Hero Section */}
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

      {/* ✅ Features Section */}
      <section id="features" className="features">
        <h2>Features</h2>
        <div className="grid">
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/combo-chart--v1.png" alt="Dashboard" />
            <h3>Smart Dashboard</h3>
            <p>View your spending, income, and savings in real time with AI-powered insights.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/artificial-intelligence.png" alt="AI Insights" />
            <h3>AI Insights</h3>
            <p>Get personalized money-saving tips and expense breakdowns instantly.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/receipt.png" alt="Receipt Scanning" />
            <h3>Receipt Scanning</h3>
            <p>Snap a picture of receipts and let AI automatically extract expenses.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/microphone.png" alt="Voice Input" />
            <h3>Voice-to-Input</h3>
            <p>Add transactions quickly using your voice — hands-free tracking.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/alarm.png" alt="Notifications" />
            <h3>Smart Notifications</h3>
            <p>Get instant alerts for bills, budgets, and savings goals.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/security-checked.png" alt="Security" />
            <h3>Bank-Level Security</h3>
            <p>Your data is encrypted and fully protected with enterprise-grade security.</p>
          </div>
        </div>
      </section>

      {/* ✅ How It Works Section */}
      <section id="how" className="how">
        <h2>How It Works</h2>
        <div className="grid">
          <div className="feature-card">1️⃣ Connect your bank accounts securely</div>
          <div className="feature-card">2️⃣ AI auto-categorizes your spending</div>
          <div className="feature-card">3️⃣ Get insights & achieve your financial goals</div>
        </div>
      </section>

      {/* ✅ Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="grid">
          <div className="feature-card">“This AI tracker helped me save 20%!” - Priya</div>
          <div className="feature-card">“Managing finances feels effortless now.” - Arjun</div>
        </div>
      </section>

      {/* ✅ Call To Action */}
      <section className="cta">
        <h2>Ready to take control of your finances?</h2>
        <Link to="/signup" className="btn-primary">Get Started Free →</Link>
      </section>

      {/* ✅ Footer */}
      <footer className="footer">
        <p>© 2025 AI Finance Tracker. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
