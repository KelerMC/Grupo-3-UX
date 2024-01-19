require("dotenv").config();
require("./src/config/database");
const express = require("express");
const estRouter = require("./src/routers/estRoutes");
const profRoutes = require("./src/routers/profRoutes");

const app = express();

app.use(express.json());
app.use("/estudiantes", estRouter);
app.use("/profesores", profRoutes);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://g5-ihcproyecto1.onrender.com"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
