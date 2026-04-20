// esperar componente
esperarElemento("lista-inscritos", cargarEventos);

function esperarElemento(id, callback) {
    const intervalo = setInterval(() => {
        const el = document.getElementById(id);
        if (el) {
            clearInterval(intervalo);
            callback();
        }
    }, 300);
}

// ==========================
// CARGAR EVENTOS
// ==========================
async function cargarEventos() {

    try {
        const res = await fetch("http://localhost:3000/eventos");
        const eventos = await res.json();

        const contenedor = document.querySelector(".row.g-3");
        if (!contenedor) return;

        contenedor.innerHTML = "";

        const aprobados = eventos.filter(e => e.estado === "aprobado");

        aprobados.forEach(e => {

            contenedor.innerHTML += `
                <div class="col-md-6">
                    <div class="border rounded p-3 d-flex justify-content-between align-items-center">

                        <div>
                            <strong>${e.nombre}</strong><br>
                            <small>Fecha del Evento: ${e.fecha}</small>
                        </div>

                        <button 
                            class="btn btn-primary ver-inscritos"
                            data-id="${e._id}">
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
// CLICK VER INSCRITOS
// ==========================
document.addEventListener("click", async (e) => {

    const btn = e.target.closest(".ver-inscritos");
    if (!btn) return;

    const eventoId = btn.dataset.id;

    try {
        const res = await fetch(`http://localhost:3000/inscripciones/evento/${eventoId}`);
        const inscritos = await res.json();

        const contenedor = document.getElementById("lista-inscritos");

        contenedor.innerHTML = "<h5>Personas inscritas</h5>";

        if (inscritos.length === 0) {
            contenedor.innerHTML += "<p>No hay inscritos</p>";
            return;
        }

        inscritos.forEach(i => {

            contenedor.innerHTML += `
                <div class="border rounded p-3 mb-2">

                    <strong>${i.nombre}</strong><br>
                    <small>Cédula: ${i.identificacion}</small><br>
                    <small>Correo: ${i.correo}</small><br>
                    <small>Teléfono: ${i.telefono}</small>

                    <p class="mt-2">
                        ${i.descripcion}
                    </p>

                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
});