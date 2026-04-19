const mongoose = require("mongoose");

const inscripcionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    identificacion: {
        type: String,
        required: true
    },
    provincia: String,
    canton: String,
    distrito: String,
    correo: {
        type: String,
        required: true
    },
    telefono: String,
    descripcion: String,
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Inscripcion", inscripcionSchema);