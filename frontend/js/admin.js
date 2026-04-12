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
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, aprobar"
        }).then((result) => {

            if (result.isConfirmed) {
                console.log("Aprobar evento:", eventoId);

                Swal.fire("Aprobado", "El evento fue publicado", "success");
            }

        });
    }

    // RECHAZAR
    if (e.target.closest(".btn-rechazar")) {

        Swal.fire({
            title: "¿Rechazar evento?",
            text: "El evento no será publicado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, rechazar"
        }).then((result) => {

            if (result.isConfirmed) {
                console.log("Rechazado:", eventoId);

                Swal.fire("Rechazado", "El evento fue rechazado", "success");
            }

        });
    }

});