require("dotenv").config();
require("./src/config/database");
const express = require("express");
const cors = require("cors");
const estRouter = require("./src/routers/estRoutes");
const profRoutes = require("./src/routers/profRoutes");
const { swaggerDocs } = require("./src/swagger");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/estudiantes", estRouter);
app.use("/profesores", profRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  swaggerDocs(app);
});
