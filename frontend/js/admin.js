// =============================
// Eventos globales por click
// =============================
document.addEventListener("click", function (e) {

    const contenedor = document.getElementById("contenido-admin");

    // =============================
    // Navegacion de admin dashboard
    // =============================

    if (e.target.closest("#admin-aprobar")) {
        e.preventDefault();

        fetch("./components/admin-aprobar-eventos.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;

                setTimeout(() => {
                    cargarEventosAdmin();
                }, 100);
            });
    }

    if (e.target.closest("#admin-publicados")) {
        e.preventDefault();

        fetch("./components/admin-eventos-publicados.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;

                setTimeout(() => {
                    cargarEventosPublicadosAdmin();
                }, 100);
            });
    }

    // =============================
    // Acciones en los eventos
    // =============================

    const card = e.target.closest("[data-id]");
    if (!card) return;

    const eventoId = card.getAttribute("data-id");

    // Ver detalles
    if (e.target.closest(".btn-ver")) {

        const eventoId = e.target.closest("[data-id]").getAttribute("data-id");

        fetch("http://localhost:3000/eventos")
            .then(res => res.json())
            .then(eventos => {

                const evento = eventos.find(e => e._id === eventoId);

                if (!evento) return;

                fetch("./components/modal-detalle-evento.html")
                    .then(res => res.text())
                    .then(html => {

                        document.getElementById("contenido-detalle-evento").innerHTML = html;

                        // INYECTAR DATOS
                        document.getElementById("detalle-nombre").textContent = evento.nombre;
                        document.getElementById("detalle-fecha").textContent = evento.fecha;
                        document.getElementById("detalle-hora").textContent = `${evento.horaInicio} - ${evento.horaFin}`;
                        document.getElementById("detalle-descripcion").textContent = evento.descripcion;
                        document.getElementById("detalle-objetivos").textContent = evento.objetivos;
                        document.getElementById("detalle-agenda").textContent = evento.agenda;
                        document.getElementById("detalle-publico").textContent = evento.publico;
                        document.getElementById("detalle-info").textContent = evento.infoAdicional;

                        const modal = new bootstrap.Modal(
                            document.getElementById('modalDetalleEvento')
                        );

                        modal.show();

                    });

            })
            .catch(err => console.error(err));
    }


    // Aprobar
    if (e.target.closest(".btn-aprobar")) {

        Swal.fire({
            title: "¿Aprobar evento?",
            text: "El evento será publicado",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, aprobar",
            cancelButtonText: "Cancelar"
        }).then((result) => {

            if (result.isConfirmed) {

                fetch(`http://localhost:3000/eventos/aprobar/${eventoId}`, {
                    method: "PUT"
                })
                    .then(res => res.json())
                    .then(() => {

                        Swal.fire({
                            icon: "success",
                            title: "Evento Publicado",
                            text: "Se publicó con éxito el evento seleccionado.",
                            confirmButtonText: "Continuar"
                        });

                        setTimeout(() => {
                            cargarEventosAdmin();
                        }, 500);

                    })
                    .catch(err => console.error(err));
            }

        });
    }

    // Rechazar (modal se abre)
    if (e.target.closest(".btn-rechazar")) {

        window.eventoRechazoId = eventoId;

        const modal = new bootstrap.Modal(
            document.getElementById('modalRechazoEvento')
        );
        modal.show();
    }

});


// =============================
// Confirmar rechazo de evento
// =============================
document.addEventListener("click", function (e) {

    if (e.target.id === "btnConfirmarRechazo") {

        const motivo = document.getElementById("motivoRechazo").value;

        if (!motivo.trim()) {
            Swal.fire({
                icon: "error",
                title: "Campo requerido",
                text: "Debe ingresar el motivo del rechazo"
            });
            return;
        }

        //  LLAMADA AL BACKEND
        fetch(`http://localhost:3000/eventos/rechazar/${window.eventoRechazoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ motivo })
        })
            .then(res => res.json())
            .then(() => {

                Swal.fire({
                    icon: "success",
                    title: "Rechazado",
                    text: "El evento fue rechazado correctamente"
                });

                // limpiar campo
                document.getElementById("motivoRechazo").value = "";

                // cerrar modal
                const modal = bootstrap.Modal.getInstance(
                    document.getElementById('modalRechazoEvento')
                );
                modal.hide();

                setTimeout(() => {
                    cargarEventosAdmin();
                }, 500);

            })
            .catch(err => {
                console.error(err);

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo rechazar el evento"
                });
            });

    }

});


// =============================
// Cargar eventos en admin 
// =============================

async function cargarEventosAdmin() {

    try {
        const res = await fetch("http://localhost:3000/eventos");
        const eventos = await res.json();

        const contenedor = document.getElementById("lista-eventos-admin");
        if (!contenedor) return;

        const pendientes = eventos.filter(e => e.estado === "pendiente");

        if (pendientes.length === 0) {
            contenedor.innerHTML = `
                <div class="text-center py-5">
                    <h6>No hay eventos pendientes</h6>
                    <p class="text-muted">Aquí aparecerán los eventos enviados por los editores</p>
                </div>
            `;
            return;
        }

        contenedor.innerHTML = "";

        pendientes.forEach(evento => {

            contenedor.innerHTML += `
                <div class="border rounded p-3 mb-4" data-id="${evento._id}">

                    <div class="d-flex justify-content-between align-items-start">

                        <div>
                            <strong>${evento.nombre}</strong><br>
                            <small>Fecha del evento: ${evento.fecha}</small><br><br>

                            <small><strong>Autor:</strong> ---</small><br>
                            <small><strong>Fecha para publicación:</strong> ---</small>
                        </div>

                        <div class="d-flex flex-column align-items-end gap-2">

                            <div class="d-flex gap-2">

                                <button class="btn btn-outline-secondary btn-sm btn-ver">
                                    <i class="bi bi-eye"></i>
                                </button>

                            </div>

                            <div class="d-flex gap-2">

                                <button class="btn btn-outline-danger btn-sm btn-rechazar">
                                    <i class="bi bi-x-lg"></i>
                                </button>

                                <button class="btn btn-outline-success btn-sm btn-aprobar">
                                    <i class="bi bi-check-lg"></i>
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            `;
        });

    } catch (error) {
        console.error("Error cargando eventos admin:", error);
    }
}


// =============================
// Cargar eventos publicados
// =============================

async function cargarEventosPublicadosAdmin() {

    try {
        const res = await fetch("http://localhost:3000/eventos");
        const eventos = await res.json();

        const contenedor = document.getElementById("lista-eventos-publicados-admin");
        if (!contenedor) return;

        const publicados = eventos.filter(e => e.estado === "aprobado");

        if (publicados.length === 0) {
            contenedor.innerHTML = `
                <div class="text-center py-5">
                    <h6>No hay eventos publicados</h6>
                </div>
            `;
            return;
        }

        contenedor.innerHTML = "";

        publicados.forEach(evento => {

            contenedor.innerHTML += `
                <div class="border-bottom py-3 d-flex justify-content-between align-items-center">

                    <div>
                        <strong>${evento.nombre}</strong><br>
                        <small>Fecha: ${evento.fecha}</small>
                    </div>

                    <div class="d-flex gap-2">

                        <button class="btn btn-outline-secondary btn-sm">
                            <i class="bi bi-eye"></i>
                        </button>

                        <button class="btn btn-outline-primary btn-sm">
                            <i class="bi bi-pencil"></i>
                        </button>

                        <button class="btn btn-outline-danger btn-sm">
                            <i class="bi bi-trash"></i>
                        </button>

                    </div>

                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}