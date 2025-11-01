import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import { Menu } from "lucide-react";

const ProfilePage = () => {
  const { user, setUser, currentUserId } = useUser();
  const { darkMode } = useTheme();
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("/default-avatar.png");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user && user.username) {
      setFilePreview(user.profile_pic ? `/uploads/${user.profile_pic}` : "/default-avatar.png");
      setLoading(false);
    } else if (currentUserId) {
      fetch(`https://backend-nk1t.onrender.com/api/user/${currentUserId}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setFilePreview(data.profile_pic ? `/uploads/${data.profile_pic}` : "/default-avatar.png");
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user, currentUserId, setUser]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    if (password) formData.append("password", password);
    if (file) formData.append("profilePic", file);

    try {
      setSaving(true);
      setMessage("");
      const res = await fetch(
        `https://backend-nk1t.onrender.com/api/user/${currentUserId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUser(data.user);
      setMessage("✅ Profile updated successfully!");
      setPassword("");
      setFile(null);
    } catch (err) {
      setMessage("❌ Failed to update profile: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px", fontSize: "18px" }}>
        Loading user profile...
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100%", width: "100vw" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          padding: "40px 20px",
          background: darkMode ? "#121212" : "#f9fafb",
          color: darkMode ? "#e0e0e0" : "#333",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            background: darkMode ? "#1f1f1f" : "#fff",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: darkMode
              ? "0 10px 25px rgba(0,0,0,0.6)"
              : "0 10px 25px rgba(0,0,0,0.08)",
            borderTop: "4px solid #3498db",
          }}
        >
          <h2
            style={{
              marginBottom: "30px",
              textAlign: "center",
              color: darkMode ? "#e0e0e0" : "#2c3e50",
            }}
          >
            Profile Details
          </h2>

          {/* Avatar Upload */}
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <img
              src={filePreview}
              alt="profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #3498db",
                marginBottom: "10px",
                boxShadow: darkMode
                  ? "0 0 15px rgba(52,152,219,0.5)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "block", margin: "10px auto" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={user.username || ""}
              onChange={handleChange}
              style={inputStyle(darkMode)}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              style={inputStyle(darkMode)}
            />

            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              style={inputStyle(darkMode)}
            />

            <button
              onClick={handleSave}
              disabled={saving}
              style={saveBtn}
            >
              {saving ? "💾 Saving..." : "✅ Save Changes"}
            </button>

            {message && (
              <p
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  color: message.startsWith("✅") ? "green" : "red",
                }}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// === Styles ===
const inputStyle = (dark) => ({
  padding: "12px 15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%",
  fontSize: "14px",
  outline: "none",
  background: dark ? "#2c2c2c" : "#fff",
  color: dark ? "#e0e0e0" : "#333",
});

const saveBtn = {
  background: "#3498db",
  color: "#fff",
  padding: "14px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
};

export default ProfilePage;
