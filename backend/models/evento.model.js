const mongoose = require("mongoose");

const schemaEvento = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    horaInicio: {
        type: String,
        required: true
    },
    horaFin: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    objetivos: {
        type: String,
        required: true
    },
    agenda: {
        type: String,
        required: true
    },
    agendaFacil: {
        type: String,
        required: true
    },
    publico: {
        type: String,
        required: true
    },
    infoAdicional: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        default: "pendiente" // pendiente, aprobado, rechazado
    },
    motivoRechazo: {
        type: String,
        default: ""
    }
});

const Evento = mongoose.model("Evento", schemaEvento);

module.exports = Evento;