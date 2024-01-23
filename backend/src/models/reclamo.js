let mongoose = require("mongoose");

let reclamoSchema = new mongoose.Schema({
  email_asociado: String,
  descripcion: String,
  respuesta: String,
  isResuelto: Boolean,
});

module.exports = mongoose.model("Reclamo", reclamoSchema);
