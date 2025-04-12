const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./User"); // Import your User model

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mongoose.connection;
db.once("open", () => console.log("MongoDB connected"));

// API endpoint to fetch expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await expenses.find(); // Fetch all expenses from the database
    res.json(expenses); // Send the data as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

app.get("/api/user/:email", async (req, res) => {
  console.log("Request for email:", req.params.email);
  try {
    const user = await User.findOne({ email: req.params.email });
    console.log("User found:", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
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