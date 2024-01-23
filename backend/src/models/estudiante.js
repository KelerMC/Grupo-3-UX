let mongoose = require("mongoose");

let estudianteSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  nombre: String,
  apellido_pat: String,
  apellido_mat: String,
  telefono: String,
  email: String,
  password: String,
  isDelegado: Boolean,
  nota_ec: Number,
  nota_ep: Number,
  nota_ef: Number,
  promedio: Number,
});

module.exports = mongoose.model("Estudiante", estudianteSchema);
