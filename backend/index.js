const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// importacion de Rutas
const eventoRoute = require("./routes/evento.route");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB conectado'))
.catch(error => console.log('Error de conexión:', error));

// rutas
app.use("/eventos", eventoRoute);

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:' + PORT);
});