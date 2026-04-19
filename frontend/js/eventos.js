//documento para logica necesaria para cargar eventos aprobados en la vista del consultor

document.addEventListener("DOMContentLoaded", cargarEventosPublicos);

async function cargarEventosPublicos() {

    try {
        const res = await fetch("http://localhost:3000/eventos");
        const eventos = await res.json();

        const contenedor = document.getElementById("contenedor-eventos");
        if (!contenedor) return;

        const publicados = eventos.filter(e => e.estado === "aprobado");

        if (publicados.length === 0) {
            contenedor.innerHTML = `
                <div class="text-center py-5">
                    <h6>No hay eventos disponibles</h6>
                </div>
            `;
            return;
        }

        contenedor.innerHTML = "";

        publicados.forEach(evento => {

            contenedor.innerHTML += `
            <div class="col-md-6">

                <div class="card evento-card h-100" data-id="${evento._id}">

                    <img src="https://picsum.photos/600/300" class="card-img-top">

                    <div class="card-body d-flex gap-3">

                        <div class="fecha-box text-center">
                            <h3>${evento.fecha.split("-")[2]}</h3>
                            <span>${evento.fecha.split("-")[1]}</span>
                        </div>

                        <div>
                            <h5>${evento.nombre}</h5>

                            <p class="bi bi-calendar3"> ${evento.fecha}</p>
                            <p class="bi bi-stopwatch"> ${evento.horaInicio} - ${evento.horaFin}</p>
                            <p class="bi bi-geo-alt"> Plataforma Zoom</p>

                            <button class="btn btn-primary btn-sm mt-2 btn-ver-detalle">
                                Ver detalle
                            </button>
                        </div>

                    </div>

                </div>

            </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}


// CLICK → DETALLE
document.addEventListener("click", function (e) {

    if (e.target.closest(".btn-ver-detalle")) {

        const card = e.target.closest("[data-id]");
        const id = card.getAttribute("data-id");

        window.location.href = `detalle-evento.html?id=${id}`;
    }

});


//realizar consulta
document.addEventListener("submit", async (e) => {

    if (e.target.id === "formInscripcion") {

        e.preventDefault();

        const datos = {
            nombre: e.target[0].value,
            correo: e.target[1].value,
            profesion: e.target[2].value,
            entidad: e.target[3].value,
            motivo: e.target[4].value
        };

        await fetch("http://localhost:3000/inscripciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        Swal.fire("Éxito", "Inscripción realizada", "success");

        e.target.reset();
    }
});

