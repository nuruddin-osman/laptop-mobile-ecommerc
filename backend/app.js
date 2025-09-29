// app.js
const express = require("express");
const app = express();
require("./config/database");
require("./config/passport");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

// const headerRoute = require("./routes/headers/headers.routes");
const dashboardProductRoute = require("./routes/dashboard/product.route");
const authRoutes = require("./routes/auth/auth.routes");

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// Routes
app.get("/", (req, res) => {
  res.send("this is right");
});
// app.use("/api/header", headerRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/dashboard/product", dashboardProductRoute);
app.use("/api", authRoutes);

// Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something broke!" });
});

module.exports = app;
