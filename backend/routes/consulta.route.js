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
    const consultas = await Consulta.find();
    res.json(consultas);
});

module.exports = router;