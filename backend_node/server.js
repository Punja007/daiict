const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/chat", (req, res) => {
  res.json({ message: "Hello from Node.js backend!" });
});

app.listen(5000, () => {
  console.log("Server listening on http://localhost:5000");
});
