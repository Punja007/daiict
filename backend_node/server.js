const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // allows React frontend to communicate
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Server is running...");
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
