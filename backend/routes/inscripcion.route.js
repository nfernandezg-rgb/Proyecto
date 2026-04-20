const express = require("express");
const router = express.Router();
const Inscripcion = require("../models/inscripcion.model");

// =============================
// Crear inscripción
// =============================
router.post("/", async (req, res) => {

    console.log("BODY:", req.body); //CAMBIOS RECIENTES

    const {
        nombre,
        identificacion,
        provincia,
        canton,
        distrito,
        correo,
        telefono,
        descripcion,
        eventoId //CAMBIOS RECIENTES:
    } = req.body;

    // Validación básica
    if (!nombre || !identificacion || !correo) {
        return res.status(400).json({
            msj: "Nombre, identificación y correo son obligatorios"
        });
    }

    try {

        const nuevaInscripcion = new Inscripcion({
            nombre,
            identificacion,
            provincia,
            canton,
            distrito,
            correo,
            telefono,
            descripcion,
            eventoId //CAMBIOS RECIENTES:
        });

        const guardado = await nuevaInscripcion.save();

        res.status(201).json(guardado);

    } catch (error) {
        res.status(500).json({
            msj: "Error al guardar inscripción",
            error
        });
    }

});


// =============================
// Obtener todas las inscripciones
// =============================
router.get("/", async (req, res) => {

    try {
        const inscripciones = await Inscripcion.find();
        res.json(inscripciones);

    } catch (error) {
        res.status(500).json({
            msj: "Error al obtener inscripciones",
            error
        });
    }

});

// =============================
// Obtener inscripciones por evento
// =============================
router.get("/evento/:eventoId", async (req, res) => {

    try {
        const inscritos = await Inscripcion.find({
            eventoId: req.params.eventoId
        });

        res.json(inscritos);

    } catch (error) {
        res.status(500).json({
            msj: "Error al obtener inscritos",
            error
        });
    }

});


// =============================
// Obtener inscripción por ID
// =============================
router.get("/:id", async (req, res) => {

    try {
        const inscripcion = await Inscripcion.findById(req.params.id);

        if (!inscripcion) {
            return res.status(404).json({
                msj: "Inscripción no encontrada"
            });
        }

        res.json(inscripcion);

    } catch (error) {
        res.status(500).json({
            msj: "Error al obtener la inscripción",
            error
        });
    }

});

// Obtener inscripciones por evento. CAMBIOS RECIENTES:
router.get("/evento/:eventoId", async (req, res) => {
    try {
        const inscripciones = await Inscripcion.find({
            eventoId: req.params.eventoId
        });

        res.json(inscripciones);

    } catch (error) {
        res.status(500).json({
            msj: "Error al obtener inscripciones por evento",
            error
        });
    }
});


// =============================
// Eliminar inscripción
// =============================
router.delete("/:id", async (req, res) => {

    try {
        await Inscripcion.findByIdAndDelete(req.params.id);

        res.json({
            msj: "Inscripción eliminada correctamente"
        });

    } catch (error) {
        res.status(500).json({
            msj: "Error al eliminar inscripción",
            error
        });
    }

});



module.exports = router;