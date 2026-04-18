const express = require("express");
const router = express.Router();
const Evento = require("../models/evento.model");

// =============================
// Crear evento
// =============================
router.post("/", async (req, res) => {

    const {
        nombre,
        fecha,
        horaInicio,
        horaFin,
        descripcion,
        objetivos,
        agenda,
        agendaFacil,
        publico,
        infoAdicional
    } = req.body;

    if (
        !nombre || !fecha || !horaInicio || !horaFin ||
        !descripcion || !objetivos || !agenda ||
        !agendaFacil || !publico || !infoAdicional
    ) {
        return res.status(400).json({
            msj: "Todos los campos son obligatorios"
        });
    }

    try {
        const nuevoEvento = new Evento(req.body);
        const eventoGuardado = await nuevoEvento.save();

        res.status(201).json(eventoGuardado);

    } catch (error) {
        res.status(400).json({
            msj: "Error al crear el evento",
            error
        });
    }
});


// =============================
// Obtener todos los eventos
// =============================
router.get("/", async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({
            msj: "Error al obtener eventos",
            error
        });
    }
});

// =============================
// Obtener evento por ID
// =============================
router.get("/:id", async (req, res) => {

    try {
        const evento = await Evento.findById(req.params.id);

        if (!evento) {
            return res.status(404).json({
                msj: "Evento no encontrado"
            });
        }

        res.json(evento);

    } catch (error) {
        res.status(500).json({
            msj: "Error al obtener el evento",
            error
        });
    }

});


// =============================
// Aprobar evento
// =============================
router.put("/aprobar/:id", async (req, res) => {

    try {
        const evento = await Evento.findByIdAndUpdate(
            req.params.id,
            { estado: "aprobado" },
            { new: true }
        );

        res.json(evento);

    } catch (error) {
        res.status(500).json({
            msj: "Error al aprobar evento",
            error
        });
    }
});


// =============================
// Rechazar evento
// =============================
router.put("/rechazar/:id", async (req, res) => {

    const { motivo } = req.body;

    if (!motivo) {
        return res.status(400).json({
            msj: "Debe enviar el motivo del rechazo"
        });
    }

    try {
        const evento = await Evento.findByIdAndUpdate(
            req.params.id,
            {
                estado: "rechazado",
                motivoRechazo: motivo
            },
            { new: true }
        );

        res.json(evento);

    } catch (error) {
        res.status(500).json({
            msj: "Error al rechazar evento",
            error
        });
    }
});


// =============================
// Eliminar evento
// =============================
router.delete("/:id", async (req, res) => {

    try {
        await Evento.findByIdAndDelete(req.params.id);

        res.json({
            msj: "Evento eliminado correctamente"
        });

    } catch (error) {
        res.status(500).json({
            msj: "Error al eliminar evento",
            error
        });
    }
});

module.exports = router;


