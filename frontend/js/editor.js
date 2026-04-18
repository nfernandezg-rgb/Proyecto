// =============================
// EVENTOS GLOBALES (CLICK)
// =============================
document.addEventListener("click", async function (e) {

    const contenedor = document.getElementById("contenido-dinamico");

    // =============================
    // NAVEGACIÓN
    // =============================

    if (e.target.closest("#menu-crear")) {
        e.preventDefault();
        cargarVista("./components/form-crear-evento.html");
    }

    if (e.target.closest("#menu-publicados")) {
        e.preventDefault();
        cargarVista("./components/eventos-publicados.html", cargarEventosPublicadosEditor);
    }

    if (e.target.closest("#menu-borrador")) {
        e.preventDefault();
        cargarVista("./components/eventos-borrador.html", () => cargarEventos("pendiente"));
    }

    if (e.target.closest("#menu-consultas")) {
        e.preventDefault();
        cargarVista("./components/consultas-editor.html");
    }

    if (e.target.closest("#menu-inscripciones")) {
        e.preventDefault();
        cargarVista("./components/inscripciones-evento.html");
    }

    // =============================
    // TABS (pendientes / rechazados)
    // =============================

    if (e.target.closest("#tab-pendientes")) {
        toggleTabs("pendiente");
    }

    if (e.target.closest("#tab-rechazados")) {
        toggleTabs("rechazado");
    }

    // =============================
    // ACCIONES EN EVENTOS
    // =============================

    const card = e.target.closest("[data-id]");
    if (!card) return;

    const eventoId = card.getAttribute("data-id");

    // VER ANOTACIONES
    if (e.target.closest(".btn-anotaciones")) {
        mostrarAnotaciones(eventoId);
    }

    // ELIMINAR
    if (e.target.closest(".btn-eliminar-evento")) {
        eliminarEvento(eventoId);
    }

});


// =============================
// FUNCIONES AUXILIARES
// =============================

function cargarVista(ruta, callback = null) {
    fetch(ruta)
        .then(res => res.text())
        .then(html => {
            document.getElementById("contenido-dinamico").innerHTML = html;

            if (callback) {
                setTimeout(callback, 100);
            }
        });
}

function toggleTabs(tipo) {
    const pendientesBtn = document.getElementById("tab-pendientes");
    const rechazadosBtn = document.getElementById("tab-rechazados");

    if (tipo === "pendiente") {
        pendientesBtn?.classList.add("active");
        rechazadosBtn?.classList.remove("active");
    } else {
        rechazadosBtn?.classList.add("active");
        pendientesBtn?.classList.remove("active");
    }

    cargarEventos(tipo);
}


// =============================
// ANOTACIONES
// =============================
async function mostrarAnotaciones(eventoId) {

    try {
        const res = await fetch("http://localhost:3000/eventos");
        const eventos = await res.json();

        const evento = eventos.find(e => e._id === eventoId);
        const motivo = evento?.motivoRechazo || "No hay anotaciones";

        document.getElementById("texto-anotacion").textContent = motivo;

        new bootstrap.Modal(
            document.getElementById("modalAnotaciones")
        ).show();

    } catch (error) {
        console.error(error);
    }
}


// =============================
// ELIMINAR EVENTO
// =============================
function eliminarEvento(eventoId) {

    Swal.fire({
        title: "¿Eliminar evento?",
        text: "Se eliminará permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar"
    }).then(async (result) => {

        if (result.isConfirmed) {

            try {
                await fetch(`http://localhost:3000/eventos/${eventoId}`, {
                    method: "DELETE"
                });

                Swal.fire("Eliminado", "Evento eliminado correctamente", "success");

                setTimeout(() => cargarEventos("rechazado"), 500);

            } catch (error) {
                console.error(error);
            }
        }
    });
}


// =============================
// FORMULARIO EVENTO
// =============================
document.addEventListener("submit", async function (e) {

    if (e.target.id !== "form-evento") return;

    e.preventDefault();

    const evento = {
        nombre: nombre.value,
        fecha: fecha.value,
        horaInicio: horaInicio.value,
        horaFin: horaFin.value,
        descripcion: descripcion.value,
        objetivos: objetivos.value,
        agenda: agenda.value,
        agendaFacil: agendaFacil.value,
        publico: publico.value,
        infoAdicional: infoAdicional.value,
        estado: "pendiente"
    };

    if (Object.values(evento).some(v => !v)) {
        Swal.fire("Error", "Faltan campos obligatorios", "error");
        return;
    }

    try {
        await fetch("http://localhost:3000/eventos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(evento)
        });

        Swal.fire("Éxito", "Evento enviado a aprobación", "success");

        e.target.reset();

    } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo guardar", "error");
    }
});

// =============================
// FORMULARIO MULTIPASO
// =============================

window.nextStep = function () {
    document.getElementById("step-1").style.display = "none";
    document.getElementById("step-2").style.display = "block";

    document.getElementById("step1-indicator")?.classList.replace("bg-primary", "bg-secondary");
    document.getElementById("step2-indicator")?.classList.replace("bg-secondary", "bg-primary");
};

window.prevStep = function () {
    document.getElementById("step-1").style.display = "block";
    document.getElementById("step-2").style.display = "none";

    document.getElementById("step1-indicator")?.classList.replace("bg-secondary", "bg-primary");
    document.getElementById("step2-indicator")?.classList.replace("bg-primary", "bg-secondary");
};


// =============================
// CARGAR EVENTOS (pendiente/rechazado)
// =============================
async function cargarEventos(filtroEstado = null) {

    try {
        const res = await fetch("http://localhost:3000/eventos");
        const eventos = await res.json();

        const contenedor = document.getElementById("lista-eventos-editor");
        if (!contenedor) return;

        const filtrados = filtroEstado
            ? eventos.filter(e => e.estado === filtroEstado)
            : eventos;

        if (filtrados.length === 0) {
            contenedor.innerHTML = `<div class="text-center py-5"><h6>No hay eventos</h6></div>`;
            return;
        }

        contenedor.innerHTML = "";

        filtrados.forEach(evento => {

            const botones = evento.estado === "rechazado"
                ? `
                    <button class="btn btn-outline-secondary btn-sm px-2 py-1 btn-anotaciones">
                    Ver anotaciones
                    </button>
                    <button class="btn btn-outline-danger btn-sm px-2 py-1 btn-eliminar-evento">
                        <i class="bi bi-trash"></i>
                    </button>
                  `: `
                  `;

            contenedor.innerHTML += `
                <div class="border-bottom py-3 d-flex justify-content-between" data-id="${evento._id}">
                    <div>
                        <strong>${evento.nombre}</strong><br>
                        <small>Fecha: ${evento.fecha}</small><br>
                        <small>Estado: ${evento.estado}</small>
                    </div>
                    <div class="d-flex gap-2 align-items-center">
                    ${botones}
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}


// =============================
// EVENTOS PUBLICADOS
// =============================
async function cargarEventosPublicadosEditor() {

    try {
        const res = await fetch("http://localhost:3000/eventos");
        const eventos = await res.json();

        const contenedor = document.getElementById("lista-eventos-publicados-editor");
        if (!contenedor) return;

        const publicados = eventos.filter(e => e.estado === "aprobado");

        if (publicados.length === 0) {
            contenedor.innerHTML = `<div class="text-center py-5"><h6>No hay eventos publicados</h6></div>`;
            return;
        }

        contenedor.innerHTML = "";

        publicados.forEach(evento => {
            contenedor.innerHTML += `
                <div class="border-bottom py-3 d-flex justify-content-between">
                    <div>
                        <strong>${evento.nombre}</strong><br>
                        <small>Fecha: ${evento.fecha}</small>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}
