import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext.jsx";

function ProfilePage() {
  const { user, setUser, currentUserId } = useUser();
  const { darkMode, toggleDarkMode } = useTheme();
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(user?.profile_pic || "/default-avatar.png");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!user?.username);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!user?.username && currentUserId) {
      fetch(`https://backend-nk1t.onrender.com/api/user/${currentUserId}`)
        .then(res => res.json())
        .then(data => {
          setUser(data);
          setFilePreview(data.profile_pic ? `/uploads/${data.profile_pic}` : "/default-avatar.png");
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user, currentUserId, setUser]);

  useEffect(() => {
    setFilePreview(user?.profile_pic ? `/uploads/${user.profile_pic}` : "/default-avatar.png");
  }, [user]);

  if (loading) return <div>Loading user data...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    if (user.username) formData.append("username", user.username);
    if (user.email) formData.append("email", user.email);
    if (password.trim()) formData.append("password", password);
    if (file) formData.append("profilePic", file);

    try {
      setSaving(true);
      const res = await fetch(`https://backend-nk1t.onrender.com/api/user/${currentUserId}`, {
        method: "PUT",
        body: formData,
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message || "Failed to save");

      setUser(updated.user);
      setFile(null);
      setPassword("");
      alert("✅ Profile updated!");
    } catch (err) {
      alert("❌ Failed: " + err.message);
    } finally {
      setSaving(false);
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
        transition: "all 0.3s", }}>      <Sidebar darkMode={darkMode} />
      <div style={{
        flex: 1,
        padding: "20px",
        marginLeft: window.innerWidth < 768 ? 0 : "260px",
      }}>
        <div style={{
          ...cardStyle,
          background: darkMode ? "#2c2c3e" : "#fff",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px", color: darkMode ? "#4fc3f7" : "#236fbc" }}>
            Profile
          </h2>
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <img src={filePreview} alt="profile" style={profileImgStyle} />
            <input type="file" onChange={handleFileChange} style={{ display: "block", margin: "10px auto" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input type="text" name="username" value={user.username || ""} onChange={handleChange} placeholder="Username" style={inputStyle(darkMode)} />
            <input type="email" name="email" value={user.email || ""} onChange={handleChange} placeholder="Email" style={inputStyle(darkMode)} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New Password" style={inputStyle(darkMode)} />
            <button onClick={handleSave} disabled={saving} style={saveBtnStyle(darkMode)}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const cardStyle = { borderRadius: "12px", padding: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" };
const profileImgStyle = { width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", marginBottom: "10px" };
const inputStyle = (darkMode) => ({
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  outline: "none",
  background: darkMode ? "#3b3b50" : "#fff",
  color: darkMode ? "#f0f0f0" : "#333"
});
const saveBtnStyle = (darkMode) => ({
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  fontSize: "16px",
  fontWeight: "600",
  color: "#fff",
  cursor: "pointer",
  background: darkMode ? "#4fc3f7" : "#236fbc"
});

export default ProfilePage;
