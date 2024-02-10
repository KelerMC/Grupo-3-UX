// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

const estRoutes = require('./src/routes/estRoutes');
const profRoutes = require('./src/routes/profRoutes');
const recRoutes =require('./src/routes/recRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');
const cursoEstRoutes = require('./src/routes/cursoEstRoutes');

app.use('/estudiantes', estRoutes);
app.use('/profesores', profRoutes);
app.use('/reclamos', recRoutes);
app.use('/cursos', cursoRoutes);
app.use('/cursosEst', cursoEstRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening en el puerto ${port}`);
});