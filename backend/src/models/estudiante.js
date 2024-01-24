let mongoose = require("mongoose");

let estudianteSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  nombre: String,
  apellido_pat: String,
  apellido_mat: String,
  telefono: String,
  email: String,
  password: String,
  isDelegado: Boolean,
});

module.exports = mongoose.model("Estudiante", estudianteSchema);
