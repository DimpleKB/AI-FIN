import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import pkg from "pg";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ----------------- CORS -----------------
app.use(cors({
  origin: [
    "https://frontend-1mk4.onrender.com", // deployed frontend
    "http://localhost:5173"                // local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ----------------- JSON & Static -----------------
app.use(express.json());
app.use("/uploads", express.static("uploads")); // for profile pics

// ----------------- Postgres Setup -----------------
const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.connect()
  .then(() => console.log("✅ Connected to Postgres"))
  .catch(err => console.error("❌ DB Connection Error:", err.message));

// ----------------- Multer Setup -----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ----------------- AUTH ROUTES -----------------
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING id",
      [username, email, hashed]
    );
    res.json({ message: "✅ User registered", userId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    if (err.code === "23505")
      return res.status(400).json({ message: "⚠️ Email already exists" });
    res.status(500).json({ message: "❌ Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (!result.rows.length)
      return res.status(401).json({ message: "⚠️ User not found" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "⚠️ Incorrect password" });

    res.json({
      message: "✅ Login successful",
      userId: user.id,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

// ----------------- USER ROUTES -----------------
app.get("/api/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, username, email, profile_pic FROM users WHERE id=$1",
      [userId]
    );
    if (!result.rows.length) return res.status(404).json({ message: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/user/:userId", upload.single("profilePic"), async (req, res) => {
  const { userId } = req.params;
  const { username, email, password } = req.body;

  try {
    const updates = [];
    const values = [];

    if (username?.trim()) {
      values.push(username.trim());
      updates.push(`username=$${values.length}`);
    }
    if (email?.trim()) {
      values.push(email.trim());
      updates.push(`email=$${values.length}`);
    }
    if (password?.trim()) {
      const hashed = await bcrypt.hash(password.trim(), 10);
      values.push(hashed);
      updates.push(`password=$${values.length}`);
    }
    if (req.file) {
      values.push(req.file.filename);
      updates.push(`profile_pic=$${values.length}`);
    }

    if (!updates.length)
      return res.status(400).json({ message: "No valid fields to update" });

    updates.push("updated_at=NOW()");
    values.push(userId);

    const query = `UPDATE users SET ${updates.join(", ")} WHERE id=$${values.length} RETURNING id, username, email, profile_pic`;
    const result = await pool.query(query, values);

    if (!result.rows.length) return res.status(404).json({ message: "User not found" });
    res.json({ message: "✅ Profile updated", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ----------------- TRANSACTIONS ROUTES -----------------
app.post("/api/transactions/:userId", async (req, res) => {
  const { userId } = req.params;
  const { type, category, amount, date } = req.body;
  if (!type || !category || !amount || !date)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const result = await pool.query(
      "INSERT INTO transactions (user_id, type, category, amount, date) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [userId, type, category, amount, date]
    );
    res.json({ message: "✅ Transaction added", transaction: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/transactions/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM transactions WHERE user_id=$1 ORDER BY date DESC", [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/transactions/:userId/:id", async (req, res) => {
  const { userId, id } = req.params;
  const { category, amount, date, type } = req.body;
  try {
    const result = await pool.query(
      "UPDATE transactions SET category=$1, amount=$2, date=$3, type=$4 WHERE user_id=$5 AND id=$6 RETURNING *",
      [category, amount, date, type, userId, id]
    );
    res.json({ message: "✅ Transaction updated", transaction: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/transactions/:userId/:id", async (req, res) => {
  const { userId, id } = req.params;
  try {
    await pool.query("DELETE FROM transactions WHERE user_id=$1 AND id=$2", [userId, id]);
    res.json({ message: "✅ Transaction deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------- BUDGET ROUTES -----------------
app.get("/api/budgets/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM budgets WHERE user_id=$1 ORDER BY id", [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/budgets/:userId", async (req, res) => {
  const { userId } = req.params;
  const { category, amount } = req.body;
  try {
    const result = await pool.query("INSERT INTO budgets (user_id, category, amount) VALUES ($1,$2,$3) RETURNING *", [userId, category, amount]);
    res.json({ budget: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/budgets/:userId/:budgetId", async (req, res) => {
  const { userId, budgetId } = req.params;
  const { category, amount } = req.body;
  try {
    const result = await pool.query("UPDATE budgets SET category=$1, amount=$2 WHERE id=$3 AND user_id=$4 RETURNING *", [category, amount, budgetId, userId]);
    res.json({ budget: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/budgets/:userId/:budgetId", async (req, res) => {
  const { userId, budgetId } = req.params;
  try {
    await pool.query("DELETE FROM budgets WHERE id=$1 AND user_id=$2", [budgetId, userId]);
    res.json({ message: "✅ Budget deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------- TOTAL BUDGET -----------------
app.get("/api/totalBudget/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query("SELECT total_budget FROM total_budget WHERE user_id=$1", [userId]);
    res.json({ totalBudget: result.rows[0]?.total_budget || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/totalBudget/:userId", async (req, res) => {
  const { userId } = req.params;
  const { totalBudget } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO total_budget (user_id, total_budget) VALUES ($1,$2)
       ON CONFLICT (user_id) DO UPDATE SET total_budget=$2 RETURNING *`,
      [userId, totalBudget]
    );
    res.json({ totalBudget: result.rows[0].total_budget });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------- HEALTHCHECK -----------------
app.get("/", (req, res) => res.send("🚀 Backend running"));

// ----------------- START SERVER -----------------
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${port}`);
});
