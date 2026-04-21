// esperar componente
function esperarElementoInscripciones(id, callback) {
    const intervalo = setInterval(() => {
        const el = document.getElementById(id);
        if (el) {
            clearInterval(intervalo);
            callback();
        }
    }, 300);
}

esperarElementoInscripciones("lista-eventos", cargarEventosInscripciones);

// ==========================
// CARGAR EVENTOS APROBADOS
// ==========================
async function cargarEventosInscripciones() {
    try {
        const res = await fetch("http://localhost:3000/eventos?estado=aprobado");
        const eventos = await res.json();

        const contenedor = document.getElementById("lista-eventos");
        if (!contenedor) return;

        contenedor.innerHTML = "";

        eventos.forEach(evento => {
            contenedor.innerHTML += `
                <div class="col-md-6">
                    <div class="border rounded p-3 d-flex justify-content-between align-items-center">

                        <div>
                            <strong>${evento.nombre}</strong><br>
                            <small>Fecha del Evento: ${evento.fecha}</small>
                        </div>

                        <button class="btn btn-primary ver-inscritos" data-id="${evento._id}">
                            <i class="bi bi-arrow-right"></i>
                        </button>

                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

// ==========================
// CLICK VER INSCRITOS / VOLVER
// ==========================
document.addEventListener("click", async (e) => {

    const btnVer = e.target.closest(".ver-inscritos");
    if (btnVer) {
        const eventoId = btnVer.dataset.id;
        cargarInscritos(eventoId);
        return;
    }

    if (e.target.id === "btnVolver") {
        cargarEventosInscripciones();
    }
});

// ==========================
// MOSTRAR INSCRITOS
// ==========================
async function cargarInscritos(eventoId) {

    try {
        const res = await fetch(`http://localhost:3000/inscripciones/evento/${eventoId}`);
        const inscritos = await res.json();

        const contenedor = document.getElementById("lista-eventos");
        if (!contenedor) {
            console.warn("contenedor aún no existe");
            return;
        }

        if (inscritos.length === 0) {
            contenedor.innerHTML = `
                <button class="btn btn-secondary mb-3" id="btnVolver">
                    ← Volver
                </button>

                <p>No hay inscritos</p>
            `;
            return;
        }

        contenedor.innerHTML = `
            <button class="btn btn-secondary mb-3" id="btnVolver">
                ← Volver
            </button>

            <h5>Personas inscritas:</h5>
        `;

        inscritos.forEach(i => {
            contenedor.innerHTML += `
                <div class="border rounded p-3 mb-2">
                    <strong>${i.nombre}</strong><br>
                    <small>Cédula: ${i.identificacion}</small><br>
                    <small>Correo: ${i.correo}</small><br>
                    <small>Teléfono: ${i.telefono}</small>
                    <p class="mt-2">${i.descripcion}</p>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}