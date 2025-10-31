<div style={{
  flex: 1,
  padding: "20px",
  background: darkMode ? "#121212" : "#f9fafb",
  color: darkMode ? "#e0e0e0" : "#333",
  marginLeft: window.innerWidth > 768 ? "300px" : "0", // responsive sidebar
}}>
  <h2 style={{ marginBottom: "20px", color: "#2f80ed", fontWeight: "700" }}>
    {monthName} Budget Dashboard
  </h2>

  {/* Set Total Budget */}
  <div style={cardStyle(darkMode)}>
    <h3 style={sectionTitle}>Set Total Monthly Budget</h3>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <input
        type="number"
        placeholder="Enter total budget"
        value={totalBudgetInput}
        onChange={(e) => setTotalBudgetInput(e.target.value)}
        style={{ ...inputStyle(darkMode), flex: "1 1 200px" }}
      />
      <button onClick={handleSetTotalBudget} style={greenBtn}>Set Budget</button>
    </div>
  </div>

  {/* Add Budget */}
  <div style={cardStyle(darkMode)}>
    <h3 style={sectionTitle}>Add New Budget</h3>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        style={{ ...inputStyle(darkMode), flex: "2 1 150px" }}
      />
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        style={{ ...inputStyle(darkMode), flex: "1 1 100px" }}
      />
      <button onClick={handleAddBudget} style={blueBtn}>Add</button>
    </div>
  </div>

  {/* Budget Cards */}
  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
    {budgets.map((b) => (
      <div
        key={b.id}
        style={{
          background: darkMode ? "#1f1f1f" : "#e8f8f5",
          borderRadius: "12px",
          padding: "15px 20px",
          flex: "1 1 250px",
          minWidth: "250px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Card content */}
      </div>
    ))}
  </div>
</div>
