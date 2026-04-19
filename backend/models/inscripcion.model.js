const mongoose = require("mongoose");

const InscripcionSchema = new mongoose.Schema({
    eventoId: String,
    nombre: String,
    correo: String,
    profesion: String,
    entidad: String,
    motivo: String,
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Inscripcion", InscripcionSchema);