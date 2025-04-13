import express, { json, urlencoded } from "express";
import cors from "cors";
import { connection } from "mongoose";
require("dotenv").config();
import { findOne } from "./User"; // Import your User model

const app = express();

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const db = connection;
db.once("open", () => console.log("MongoDB connected"));

app.get("/api/user/git:email", async (req, res) => {
  console.log("Request for email:", req.params.email);
  try {
    const user = await findOne({ email: req.params.email });
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