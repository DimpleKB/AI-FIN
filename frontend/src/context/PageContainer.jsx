import { useTheme } from "../context/ThemeContext";

const PageContainer = ({ children }) => {
  const { darkMode } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: darkMode ? "#121212" : "#f9fafb",
        color: darkMode ? "#e0e0e0" : "#333",
        padding: "20px",
        boxSizing: "border-box",
        marginLeft: window.innerWidth > 768 ? "260px" : "0", // account for sidebar
        transition: "all 0.3s",
      }}
      className="pageContainer"
    >
      {children}
    </div>
  );
};

export default PageContainer;
