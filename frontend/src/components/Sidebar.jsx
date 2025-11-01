import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(!isMobile);

  // update state on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const items = [
    { name: "Home", icon: "🏠", path: "/homepage" },
    { name: "Dashboard", icon: "📊", path: "/dashboardpage" },
    { name: "Add Transaction", icon: "➕", path: "/addtransaction" },
    { name: "Profile", icon: "👤", path: "/profile" },
    { name: "Budget", icon: "📋", path: "/budget" },
    { name: "Notifications", icon: "🔔", path: "/notifications" },
  ];

  const bgColor = darkMode ? "#121212" : "#0d47a1";
  const linkDefault = darkMode ? "#b0bec5" : "#cfd8dc";
  const linkActive = darkMode ? "#64b5f6" : "#fff";
  const profileBorder = darkMode ? "#64b5f6" : "#42a5f5";
  const logoutColor = darkMode ? "#ef5350" : "#e53935";

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 15,
            left: 15,
            zIndex: 200,
            background: bgColor,
            borderRadius: "8px",
            padding: "8px 10px",
            cursor: "pointer",
            color: linkActive,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </div>
      )}

      {/* Sidebar Container */}
      <div
        style={{
          ...sidebarStyle,
          background: bgColor,
          color: linkDefault,
          transform: isMobile
            ? isOpen
              ? "translateX(0)"
              : "translateX(-100%)"
            : "translateX(0)",
          transition: "transform 0.3s ease",
        }}
      >
        <div>
          {/* User Info */}
          <div style={userInfoStyle}>
            <h2 style={{ marginBottom: "15px", color: linkActive }}>FINAI</h2>
            <img
              src={
                user?.profile_pic
                  ? `/uploads/${user.profile_pic}`
                  : "https://via.placeholder.com/80"
              }
              alt="Profile"
              style={{
                ...profilePicStyle,
                border: `3px solid ${profileBorder}`,
              }}
            />
            <h3
              style={{
                marginTop: "10px",
                fontWeight: "500",
                color: linkActive,
              }}
            >
              {user?.username || "User"}
            </h3>
          </div>

          {/* Navigation Links */}
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => isMobile && setIsOpen(false)} // auto-close on click
              style={{
                ...linkStyle,
                background:
                  location.pathname === item.path ? linkActive : "transparent",
                color:
                  location.pathname === item.path
                    ? darkMode
                      ? "#121212"
                      : "black"
                    : linkDefault,
              }}
            >
              <span style={{ marginRight: "12px", fontSize: "18px" }}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{ ...logoutBtnStyle, background: logoutColor }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = darkMode
              ? "#e53935"
              : "#d32f2f")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = logoutColor)
          }
        >
          🔓 Logout
        </button>
      </div>

      {/* Overlay for mobile when sidebar open */}
      {isMobile && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            zIndex: 50,
          }}
        />
      )}
    </>
  );
};

// Sidebar base styles
const sidebarStyle = {
  height: "100vh",
  width: "260px",
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "fixed",
  top: 0,
  left: 0,
  boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
  fontFamily: "Poppins, sans-serif",
  zIndex: 150,
};

const userInfoStyle = {
  textAlign: "center",
  marginBottom: "40px",
};

const profilePicStyle = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  marginBottom: "10px",
  objectFit: "cover",
  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
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
