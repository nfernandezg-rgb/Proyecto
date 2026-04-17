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
            });
        return;
    }

    if (e.target.closest("#admin-publicados")) {
        e.preventDefault();

        fetch("./components/admin-eventos-publicados.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;
            });
        return;
    }

    // =============================
    // Acciones en los eventos
    // =============================

    const card = e.target.closest("[data-id]");
    if (!card) return;

    const eventoId = card.getAttribute("data-id");

    // Ver detalles
    if (e.target.closest(".btn-ver")) {

        console.log("Ver detalle evento:", eventoId);

        fetch("./components/detalle-evento.html")
            .then(res => res.text())
            .then(html => {

                document.getElementById("contenido-detalle-evento").innerHTML = html;

                const modal = new bootstrap.Modal(
                    document.getElementById('modalDetalleEvento')
                );

                modal.show();

            })
            .catch(err => console.error("Error cargando detalle:", err));
    }

    // Editar
    if (e.target.closest(".btn-editar")) {
        console.log("Editar evento:", eventoId);
    }

    // Eliminar
    if (e.target.closest(".btn-eliminar")) {

        Swal.fire({
            title: "¿Eliminar evento?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {

            if (result.isConfirmed) {
                console.log("Eliminar evento:", eventoId);
            }

        });
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