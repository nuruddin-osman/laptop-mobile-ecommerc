const express = require("express");
const app = express();
require("./config/database");
const headerRoute = require("./routes/headers/headers.routes");

app.use("/api/header", headerRoute);

app.use((req, res, next) => {
  res.status(500).send("Internal server error");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
