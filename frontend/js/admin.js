document.addEventListener("click", function (e) {

    const contenedor = document.getElementById("contenido-admin");

    // =============================
    // NAVEGACIÓN ADMIN
    // =============================

    if (e.target.closest("#admin-aprobar")) {
        e.preventDefault();

        fetch("./components/admin-aprobar-eventos.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;
            });
    }

    if (e.target.closest("#admin-publicados")) {
        e.preventDefault();

        fetch("./components/admin-eventos-publicados.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;
            });
    }

    // =============================
    // ACCIONES SOBRE EVENTOS
    // =============================

    const card = e.target.closest("[data-id]");
    if (!card) return;

    const eventoId = card.getAttribute("data-id");

    //  VER DETALLE (MODAL)
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

    // EDITAR
    if (e.target.closest(".btn-editar")) {
        console.log("Editar evento:", eventoId);
    }

    // ELIMINAR
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

    //  APROBAR
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

                console.log("Aprobar evento:", eventoId);

                // SEGUNDO MODAL (el de tu mockup)
                Swal.fire({
                    icon: "success",
                    title: "Evento Publicado",
                    text: "Se publicó con éxito el evento seleccionado. Para modificar o eliminar este evento puede realizarlo en la sección del menú principal en Eventos Publicados.",
                    confirmButtonText: "Continuar"
                });

                // FUTURO BACKEND:
                /*
                fetch(`/api/eventos/${eventoId}/aprobar`, {
                    method: "POST"
                })
                */
            }

        });

    }

    // RECHAZAR

    if (e.target.closest(".btn-rechazar")) {

        const card = e.target.closest("[data-id]");
        const eventoId = card.getAttribute("data-id");

        // guardar temporalmente el ID
        window.eventoRechazoId = eventoId;

        const modal = new bootstrap.Modal(
            document.getElementById('modalRechazoEvento')
        );
        modal.show();
    }

    // CONFIRMAR RECHAZO
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

            console.log("Evento rechazado:", window.eventoRechazoId);
            console.log("Motivo:", motivo);

            // FUTURO BACKEND
            /*
            fetch(`/api/eventos/${window.eventoRechazoId}/rechazar`, {
                method: "POST",
                body: JSON.stringify({ motivo }),
                headers: { "Content-Type": "application/json" }
            })
            */

            Swal.fire("Rechazado", "El evento fue rechazado correctamente", "success");

            // limpiar
            document.getElementById("motivoRechazo").value = "";

            // cerrar modal
            const modal = bootstrap.Modal.getInstance(
                document.getElementById('modalRechazoEvento')
            );
            modal.hide();
        }

    });

});