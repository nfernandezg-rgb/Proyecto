document.addEventListener("click", function (e) {

    const contenedor = document.getElementById("contenido-admin");

    // APROBACIÓN DE EVENTOS
    if (e.target.closest("#admin-aprobar")) {
        e.preventDefault();

        fetch("./components/admin-aprobar-eventos.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;
            });
    }

    // EVENTOS PUBLICADOS
    if (e.target.closest("#admin-publicados")) {
        e.preventDefault();

        fetch("./components/admin-eventos-publicados.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;
            });
    }

});


// =============================
// ACCIONES ADMIN (BOTONES)
// =============================
document.addEventListener("click", function (e) {

    const card = e.target.closest("[data-id]");
    if (!card) return;

    const eventoId = card.getAttribute("data-id");

    // VER
    if (e.target.closest(".btn-ver")) {
        console.log("Ver evento:", eventoId);

        // FUTURO
        // fetch(`/api/eventos/${eventoId}`)
    }

    // EDITAR
    if (e.target.closest(".btn-editar")) {
        console.log("Editar evento:", eventoId);

        // FUTURO
        // window.location.href = `/editar-evento/${eventoId}`
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

                // FUTURO BACKEND
                /*
                fetch(`/api/eventos/${eventoId}`, {
                    method: "DELETE"
                })
                */
            }

        });

    }

    // APROBAR
    if (e.target.closest(".btn-aprobar")) {

        Swal.fire({
            title: "¿Aprobar evento?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, aprobar"
        }).then((result) => {

            if (result.isConfirmed) {
                console.log("Aprobar evento:", eventoId);
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