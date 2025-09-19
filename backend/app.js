const express = require("express");
const app = express();
require("./config/database");
const headerRoute = require("./routes/headers/headers.routes");
const dashboardProductRoute = require("./routes/dashboard/product.route");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/header", headerRoute);
app.use("/api/dashboard/product", dashboardProductRoute);

app.use((req, res, next) => {
  res.status(500).send("Internal server error");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
