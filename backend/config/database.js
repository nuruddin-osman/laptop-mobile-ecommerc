require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://nuruddin378350:nuruddin123@cluster0.91n45.mongodb.net/ecommerce-electronics"
  )
  .then(() => console.log("Database is Connected!"))
  .catch((error) => {
    console.log("Database is not connected");
    console.log(error);
  });
