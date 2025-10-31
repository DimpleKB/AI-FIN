import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

  const items = [
    { name: "Home", icon: "🏠", path: "/homepage" },
    { name: "Dashboard", icon: "📊", path: "/dashboardpage" },
    { name: "Add Transaction", icon: "➕", path: "/addtransaction" },
    { name: "Profile", icon: "👤", path: "/profile" },
    { name: "Budget", icon: "📋", path: "/budget" },
    { name: "Notifications", icon: "🔔", path: "/notifications" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const bgColor = darkMode ? "#121212" : "#0d47a1";
  const linkDefault = darkMode ? "#b0bec5" : "#cfd8dc";
  const linkActive = darkMode ? "#64b5f6" : "#fff";
  const profileBorder = darkMode ? "#64b5f6" : "#42a5f5";
  const logoutColor = darkMode ? "#ef5350" : "#e53935";

  // Close sidebar on window resize if mobile
  useEffect(() => {
    const handleResize = () => setIsOpen(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile toggle */}
      {window.innerWidth <= 768 && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: "fixed",
            top: 15,
            left: 15,
            zIndex: 110,
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: darkMode ? "#64b5f6" : "#0d47a1",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      )}

      <div
        style={{
          ...sidebarStyle,
          background: bgColor,
          color: linkDefault,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          position: window.innerWidth <= 768 ? "fixed" : "fixed",
          zIndex: 100,
        }}
      >
        <div>
          <div style={userInfoStyle}>
            <h2 style={{ marginBottom: "15px", color: linkActive }}>FINAI</h2>
            <img
              src={user?.profile_pic ? `/uploads/${user.profile_pic}` : "https://via.placeholder.com/80"}
              alt="Profile"
              style={{ ...profilePicStyle, border: `3px solid ${profileBorder}` }}
            />
            <h3 style={{ marginTop: "10px", fontWeight: "500", color: linkActive }}>
              {user?.username || "User"}
            </h3>
          </div>

          {items.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{
                ...linkStyle,
                background: location.pathname === item.path ? linkActive : "transparent",
                color: location.pathname === item.path ? (darkMode ? "#121212" : "black") : linkDefault,
              }}
              onClick={() => window.innerWidth <= 768 && setIsOpen(false)}
            >
              <span style={{ marginRight: "12px", fontSize: "18px" }}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>

        <button
          onClick={handleLogout}
          style={{ ...logoutBtnStyle, background: logoutColor }}
        >
          🔓 Logout
        </button>
      </div>
    </>
  );
};

const sidebarStyle = {
  height: "100vh",
  width: "260px",
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  top: 0,
  left: 0,
  boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
  fontFamily: "Poppins, sans-serif",
};

const userInfoStyle = { textAlign: "center", marginBottom: "40px" };
const profilePicStyle = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  marginBottom: "10px",
  objectFit: "cover",
  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  transition: "border 0.3s",
};
const linkStyle = {
  marginBottom: "5px",
  padding: "12px 15px",
  borderRadius: "10px",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  transition: "all 0.3s",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "16px",
};
const logoutBtnStyle = {
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background 0.3s",
};

export default Sidebar;
