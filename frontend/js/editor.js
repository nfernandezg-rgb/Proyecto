// =============================
// Eventos globales por click
// =============================
document.addEventListener("click", function (e) {

    const contenedor = document.getElementById("contenido-dinamico");

    // =============================
    // Navegacion en sidebar
    // =============================

    if (e.target.closest("#menu-crear")) {
        e.preventDefault();

        fetch("./components/form-crear-evento.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;
            });
    }

    if (e.target.closest("#menu-publicados")) {
        e.preventDefault();

        fetch("./components/eventos-publicados.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;
            });
    }

    if (e.target.closest("#menu-borrador")) {
        e.preventDefault();

        fetch("./components/eventos-borrador.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;

                // IMPORTANTE
                setTimeout(() => {
                    cargarEventos();
                }, 100);
            });
    }

    if (e.target.closest("#menu-consultas")) {
        e.preventDefault();

        fetch("./components/consultas-editor.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;
            });
    }

    if (e.target.closest("#menu-inscripciones")) {
        e.preventDefault();

        fetch("./components/inscripciones-evento.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;
            });
    }

    // =============================
    // eventos en borrador
    // =============================

    const pendientesBtn = document.getElementById("tab-pendientes");
    const rechazadosBtn = document.getElementById("tab-rechazados");

    if (e.target.closest("#tab-pendientes")) {

        pendientesBtn?.classList.add("active");
        rechazadosBtn?.classList.remove("active");

        document.getElementById("lista-eventos-editor").innerHTML = `
            <div class="text-center py-5">
                <h6>No hay eventos pendientes</h6>
                <p class="text-muted">Pendientes de aprobación del administrador</p>
            </div>
        `;
    }

    if (e.target.closest("#tab-rechazados")) {

        rechazadosBtn?.classList.add("active");
        pendientesBtn?.classList.remove("active");

        document.getElementById("lista-eventos-editor").innerHTML = `
            <div class="border-bottom py-3 d-flex justify-content-between align-items-center" data-id="1">

                <div>
                    <strong>Título del evento</strong><br>
                    <small>Fecha de creación: 22/08/2020</small><br>
                    <small>Estado: Rechazado</small>
                </div>

                <div class="d-flex gap-2">

                    <button class="btn btn-outline-secondary btn-sm btn-anotaciones">
                        Ver anotaciones
                    </button>

                    <button class="btn btn-outline-danger btn-sm btn-eliminar-evento">
                        <i class="bi bi-trash"></i>
                    </button>

                </div>

            </div>
        `;
    }

    // =============================
    // Eventos rechazados
    // =============================

    const card = e.target.closest("[data-id]");
    if (card) {

        const eventoId = card.getAttribute("data-id");

        if (e.target.closest(".btn-anotaciones")) {

            const motivo = "Este evento fue rechazado porque la información estaba incompleta.";

            document.getElementById("texto-anotacion").textContent = motivo;

            const modal = new bootstrap.Modal(
                document.getElementById("modalAnotaciones")
            );
            modal.show();
        }

        if (e.target.closest(".btn-eliminar-evento")) {

            Swal.fire({
                title: "¿Eliminar evento?",
                text: "Se eliminará de la lista de rechazados",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar"
            }).then((result) => {

                if (result.isConfirmed) {
                    card.remove();
                }

            });
        }

    }

});


// ========================================
// Formulario multi paso para crear evento
// =======================================
function nextStep() {
    document.getElementById("step-1").style.display = "none";
    document.getElementById("step-2").style.display = "block";

    document.getElementById("step1-indicator").classList.replace("bg-primary", "bg-secondary");
    document.getElementById("step2-indicator").classList.replace("bg-secondary", "bg-primary");
}

function prevStep() {
    document.getElementById("step-1").style.display = "block";
    document.getElementById("step-2").style.display = "none";

    document.getElementById("step1-indicator").classList.replace("bg-secondary", "bg-primary");
    document.getElementById("step2-indicator").classList.replace("bg-primary", "bg-secondary");
}


// ==================================
// Envio del formulario crear evento
// =================================
document.addEventListener("submit", function (e) {

    if (e.target.id === "form-evento") {

        e.preventDefault();

        const evento = {
            nombre: document.getElementById("nombre").value,
            fecha: document.getElementById("fecha").value,
            horaInicio: document.getElementById("horaInicio").value,
            horaFin: document.getElementById("horaFin").value,
            descripcion: document.getElementById("descripcion").value,
            objetivos: document.getElementById("objetivos").value,
            agenda: document.getElementById("agenda").value,
            agendaFacil: document.getElementById("agendaFacil").value,
            publico: document.getElementById("publico").value,
            infoAdicional: document.getElementById("infoAdicional").value,
            estado: "pendiente"
        };

        if (
            !evento.nombre ||
            !evento.fecha ||
            !evento.horaInicio ||
            !evento.horaFin ||
            !evento.descripcion ||
            !evento.objetivos ||
            !evento.agenda ||
            !evento.agendaFacil ||
            !evento.publico ||
            !evento.infoAdicional
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Evento Incompleto',
                text: 'Hay campos obligatorios que no han sido completados.',
                confirmButtonText: 'Continuar'
            });
            return;
        }

        fetch("http://localhost:3000/eventos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(evento)
        })
            .then(res => res.json())
            .then(data => {

                console.log("Evento guardado:", data);

                Swal.fire({
                    icon: 'success',
                    title: 'Evento Enviado',
                    text: 'El evento fue enviado al administrador para aprobación.',
                    confirmButtonText: 'Continuar'
                }).then(() => {
                    document.getElementById("form-evento").reset();
                });

            })
            .catch(error => {
                console.error("Error:", error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar el evento'
                });
            });

        Swal.fire({
            icon: 'success',
            title: 'Evento Enviado',
            text: 'El evento fue enviado al administrador para aprobación.',
            confirmButtonText: 'Continuar'
        }).then(() => {
            document.getElementById("form-evento").reset();
        });

    }

});


async function cargarEventos() {

    try {
        const res = await fetch("http://localhost:3000/eventos");
        const eventos = await res.json();

        const contenedor = document.getElementById("lista-eventos-editor");

        if (!contenedor) return;

        if (eventos.length === 0) {
            contenedor.innerHTML = `
                <div class="text-center py-5">
                    <h6>No hay eventos</h6>
                </div>
            `;
            return;
        }

        contenedor.innerHTML = "";

        eventos.forEach(evento => {

            contenedor.innerHTML += `
                <div class="border-bottom py-3 d-flex justify-content-between align-items-center">

                    <div>
                        <strong>${evento.nombre}</strong><br>
                        <small>Fecha: ${evento.fecha}</small><br>
                        <small>Estado: ${evento.estado}</small>
                    </div>

                    <div class="d-flex gap-2">

                        <button class="btn btn-outline-secondary btn-sm ver-evento">
                            <i class="bi bi-eye"></i>
                        </button>

                    </div>

                </div>
            `;
        });

    } catch (error) {
        console.error("Error cargando eventos:", error);
    }
}