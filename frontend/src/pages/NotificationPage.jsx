import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaExclamationTriangle, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const NotificationCard = ({ notification, darkMode }) => {
  const bgColor =
    notification.type === "danger"
      ? "#f8d7da"
      : notification.type === "warning"
      ? "#fff3cd"
      : "#d1ecf1";
  const textColor =
    notification.type === "danger"
      ? "#721c24"
      : notification.type === "warning"
      ? "#856404"
      : "#0c5460";

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: bgColor,
      color: textColor,
      padding: "15px 20px",
      borderRadius: "12px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      marginBottom: "15px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {notification.type === "danger" && <FaExclamationTriangle />}
        {notification.type === "warning" && <FaMoneyBillWave />}
        {notification.type === "info" && <FaCheckCircle />}
        <p>{notification.message}</p>
      </div>
      <span style={{ fontSize: "12px" }}>{new Date(notification.time).toLocaleString()}</span>
    </div>
  );
};

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    // Fetch notifications from backend
    fetch("/api/notifications")
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(() => setNotifications([]));
  }, []);

  return (
<div style={{
        minHeight: "100vh",
        width: "100%",
        background: darkMode ? "#121212" : "#f9fafb",
        color: darkMode ? "#e0e0e0" : "#333",
        padding: "20px",
        boxSizing: "border-box",
        marginLeft: window.innerWidth > 768 ? "260px" : "0", // account for sidebar
        transition: "all 0.3s", }}>      <Sidebar darkMode={darkMode} />
      <div style={{ flex: 1, padding: "20px", marginLeft: window.innerWidth < 768 ? 0 : "260px" }}>
        <h2 style={{ color: darkMode ? "#4fc3f7" : "#236fbc", marginBottom: "20px" }}>Notifications</h2>
        {notifications.length === 0 ? <p>No notifications</p> :
          notifications.map((n) => <NotificationCard key={n.id} notification={n} darkMode={darkMode} />)
        }
      </div>
    </div>
  );
}

export default NotificationPage;
