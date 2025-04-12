const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("MongoDB connected"));

// Define a Mongoose schema and model
const ExpenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", ExpenseSchema);

// API endpoint to fetch expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find(); // Fetch all expenses from the database
    res.json(expenses); // Send the data as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// Example route
app.get("/chat", (req, res) => {
  res.json({ message: "Hello from Node.js backend!" });
});

// Start the server
app.listen(5000, () => {
  console.log("Server listening on http://localhost:5000");
});