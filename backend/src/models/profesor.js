let mongoose = require("mongoose");

let profesorSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  nombre: String,
  apellido_pat: String,
  apellido_mat: String,
  telefono: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("Profesor", profesorSchema);
