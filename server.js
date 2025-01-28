const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes.js");
const quizRoutes = require("./routes/quizRoutes.js");
const announcementRoutes = require("./routes/announcementRoutes.js");
const authMiddleware = require("./middleware/authMiddleware.js");
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
const PORT = process.env.PORT || 5000;

app.use("/api/user", userRoutes);
app.use("/api/quiz", authMiddleware, quizRoutes);
app.use("/api/announcement", authMiddleware, announcementRoutes);

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => console.log(`App is working on port ${PORT}`));
  }
module.exports = app;