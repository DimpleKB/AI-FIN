import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("userId", data.userId);
        alert("✅ Login successful!");
        navigate("/homepage");
      } else alert(data.message || "Login failed");
    } catch (err) {
      alert("❌ Server error");
    } finally { setLoading(false); }
  };

  return (
    <div style={{
        minHeight: "100vh",
        width: "100%",
        background: darkMode ? "#121212" : "#f9fafb",
        color: darkMode ? "#e0e0e0" : "#333",
        padding: "20px",
        boxSizing: "border-box",
        marginLeft: window.innerWidth > 768 ? "260px" : "0", // account for sidebar
        transition: "all 0.3s", }}>
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p style={{ textAlign: "center" }}>Don't have an account? <Link to="/signup">Signup</Link></p>
      </form>
    </div>
      </div>
  );
}

const formContainerStyle = { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" };
const formStyle = { width: "100%", maxWidth: "400px", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" };
const inputStyle = { padding: "12px", margin: "10px 0", borderRadius: "8px", border: "1px solid #ccc", width: "100%" };
const buttonStyle = { padding: "12px", borderRadius: "8px", border: "none", background: "#236fbc", color: "#fff", width: "100%", cursor: "pointer" };

export default Login;
