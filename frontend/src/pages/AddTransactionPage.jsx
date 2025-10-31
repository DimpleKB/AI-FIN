import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Tesseract from "tesseract.js";
import { useTheme } from "../context/ThemeContext";
import PageContainer from "../components/PageContainer";

const AddTransactionPage = () => {
  const { darkMode } = useTheme();
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
  });
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [ocrText, setOcrText] = useState("");
  const [loadingOCR, setLoadingOCR] = useState(false);

  // Speech recognition setup (same as before)
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript.toLowerCase();
      setTranscript(speech);
      parseSpeech(speech);
    };
    window.recognition = recognition;
  }, []);

  const parseSpeech = (speech) => {
    // same parsing logic as your code
  };

  const handleReceiptUpload = async (e) => {
    // same OCR logic as your code
  };

  const handleAddTransaction = async () => {
    // same fetch logic as your code
  };

  const toggleListening = () => {
    if (listening) window.recognition.stop();
    else window.recognition.start();
  };

  return (
    <PageContainer>
    <div style={styles.pageContainer}>
      <Sidebar />
      <div style={{ ...styles.mainContent(darkMode) }}>
        <div style={{ ...styles.formContainer(darkMode) }}>
          <h2 style={styles.title(darkMode)}>Add Transaction</h2>
          <div style={styles.formWrapper}>
            <label>Type</label>
            <select
              name="type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              style={styles.input(darkMode)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <label>Category</label>
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={styles.input(darkMode)}
            />

            <label>Amount</label>
            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              style={styles.input(darkMode)}
            />

            <label>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              style={styles.input(darkMode)}
            />

            <button onClick={toggleListening} style={styles.micBtn}>
              {listening ? "🎤 Listening..." : "🎙️ Start Voice Input"}
            </button>
            {transcript && <div style={styles.transcript(darkMode)}>🗣️ “{transcript}”</div>}

            <label>Upload Receipt</label>
            <input type="file" accept="image/*" onChange={handleReceiptUpload} />
            {loadingOCR ? <p style={styles.loadingText}>Extracting text...</p> : ocrText && <p style={styles.ocrText(darkMode)}>{ocrText}</p>}

            <button onClick={handleAddTransaction} style={styles.saveBtn}>➕ Add Transaction</button>
          </div>
        </div>
      </div>
    </div>
    </PageContainer>
  );
};

// ✅ Responsive styles
const styles = {
  pageContainer: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "row",
    width: "100%",
    overflowX: "hidden",
  },
  mainContent: (dark) => ({
    flex: 1,
    padding: "20px",
    background: dark ? "#121212" : "#f9fafb",
    color: dark ? "#e0e0e0" : "#333",
    overflowY: "auto",
  }),
  formContainer: (dark) => ({
    maxWidth: "600px",
    margin: "0 auto",
    background: dark ? "#1f1f1f" : "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: dark ? "0 10px 25px rgba(0,0,0,0.6)" : "0 10px 25px rgba(0,0,0,0.08)",
    borderTop: "4px solid #3498db",
    width: "100%",
  }),
  title: (dark) => ({
    marginBottom: "30px",
    textAlign: "center",
    color: dark ? "#e0e0e0" : "#2c3e50",
    fontSize: "1.8rem",
  }),
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: (dark) => ({
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    background: dark ? "#2c2c2c" : "#fff",
    color: dark ? "#e0e0e0" : "#333",
  }),
  micBtn: {
    background: "#f39c12",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "5px",
  },
  saveBtn: {
    background: "#3498db",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "10px",
  },
  transcript: (dark) => ({
    fontStyle: "italic",
    marginTop: "8px",
    color: dark ? "#bbb" : "#2c3e50",
  }),
  loadingText: { color: "#555" },
  ocrText: (dark) => ({ color: dark ? "#bbb" : "#2c3e50" }),
};

// Media query for mobile
const mediaQuery = `
  @media (max-width: 768px) {
    .pageContainer {
      flex-direction: column;
    }
    .formContainer {
      padding: 20px;
      margin: 20px 10px;
    }
  }
`;

// Inject media query into page
const styleTag = document.createElement("style");
styleTag.innerHTML = mediaQuery;
document.head.appendChild(styleTag);

export default AddTransactionPage;
