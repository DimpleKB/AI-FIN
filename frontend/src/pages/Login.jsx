import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { API_BASE_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setCurrentUserId } = useUser();

  // Detect environment: local dev or deployed frontend
  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://backend-nk1t.onrender.com"
      : "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://backend-nk1t.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });


      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setUser({ email: data.email, userId: data.userId });
        setCurrentUserId(data.userId);
        alert("✅ Login successful!");
        navigate("/homepage");
      } else {
        alert(data.message || "⚠️ Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Server error or network issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form className="frm" onSubmit={handleSubmit}>
        <p>Email</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <p>Password</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="submit" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
