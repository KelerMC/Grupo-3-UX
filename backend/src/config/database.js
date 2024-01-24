let mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successful database connection");
  })
  .catch((err) => {
    console.error("Database connection error");
  });
