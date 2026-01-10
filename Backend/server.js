const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();
const protectedRoutes = require("./routes/protected");
app.use("/api", protectedRoutes);


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});

const proposalRoutes = require("./routes/proposal");
app.use("/api/proposals", proposalRoutes);

const cors = require("cors");
app.use(cors());
