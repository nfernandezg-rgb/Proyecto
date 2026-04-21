const Evento = require("../models/evento.model.js");

const express = require("express");
const router = express.Router();
const Consulta = require("../models/consulta.model");

// crear consulta
router.post("/", async (req, res) => {
    try {
        const nueva = new Consulta(req.body);
        await nueva.save();
        res.json({ msj: "Consulta guardada" });
    } catch (error) {
        res.status(500).json(error);
    }
});

// obtener consultas
router.get("/", async (req, res) => {
    try {

        const consultas = await Consulta.find();

        const resultado = [];

        for (let c of consultas) {

            const evento = await Evento.findById(c.eventoId);

            resultado.push({
                _id: c._id,
                correo: c.correo,
                mensaje: c.mensaje,
                fecha: c.createdAt || new Date(),

                evento: evento ? {
                    nombre: evento.nombre,
                    fecha: evento.fecha
                } : null
            });
        }

        res.json(resultado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error obteniendo consultas" });
    }
});


// eliminar consulta
router.delete("/:id", async (req, res) => {
    try {
        await Consulta.findByIdAndDelete(req.params.id);
        res.json({ msg: "Consulta eliminada" });
    } catch (error) {
        res.status(500).json({ error: "Error eliminando consulta" });
    }
});

module.exports = router;