require("dotenv").config();
require("./src/config/database");
const express = require("express");
const estRouter = require("./src/routers/estRoutes");

const app = express();

app.use(express.json());
app.use("/estudiantes", estRouter);

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
