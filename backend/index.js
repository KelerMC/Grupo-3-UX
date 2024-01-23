require("dotenv").config();
require("./src/config/database");
const express = require("express");
const cors = require("cors");
const estRouter = require("./src/routes/estRoutes");
const profRoutes = require("./src/routes/profRoutes");
const swaggerSpec = require("./src/swagger");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/estudiantes", estRouter);
app.use("/profesores", profRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
