const express = require("express");
const router = express.Router();
const Inscripcion = require("../models/inscripcion.model");

// crear inscripción
router.post("/", async (req, res) => {
    try {
        const nueva = new Inscripcion(req.body);
        await nueva.save();
        res.json({ msj: "Inscripción guardada" });
    } catch (error) {
        res.status(500).json(error);
    }
});

// obtener inscripciones
router.get("/", async (req, res) => {
    const data = await Inscripcion.find();
    res.json(data);
});

module.exports = router;