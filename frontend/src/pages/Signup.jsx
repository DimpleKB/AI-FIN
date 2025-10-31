import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords do not match!");
    try {
      const res = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("userId", data.userId);
        alert("✅ Signup successful!");
        navigate("/homepage");
      } else alert(data.message);
    } catch (err) {
      alert("❌ Server error");
    }
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
        <h2>Signup</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required style={inputStyle} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Signup</button>
        <p style={{ textAlign: "center" }}>Have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
    </div>
  );
}

const formContainerStyle = { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" };
const formStyle = { width: "100%", maxWidth: "400px", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" };
const inputStyle = { padding: "12px", margin: "10px 0", borderRadius: "8px", border: "1px solid #ccc", width: "100%" };
const buttonStyle = { padding: "12px", borderRadius: "8px", border: "none", background: "#236fbc", color: "#fff", width: "100%", cursor: "pointer" };

export default Signup;
