// =============================
// NAVEGACIÓN DINÁMICA (SIDEBAR)
// =============================
document.addEventListener("click", function (e) {

    const contenedor = document.getElementById("contenido-dinamico");

    // CREAR EVENTO
    if (e.target.closest("#menu-crear")) {
        e.preventDefault();

        fetch("./components/form-crear-evento.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;
            });
    }

    // EVENTOS PUBLICADOS
    if (e.target.closest("#menu-publicados")) {
        e.preventDefault();

        fetch("./components/eventos-publicados.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;
            });
    }

    // EVENTOS BORRADOR (FIX)
    if (e.target.closest("#menu-borrador")) {
        e.preventDefault();

        fetch("./components/eventos-borrador.html")
            .then(res => res.text())
            .then(html => {
                contenedor.innerHTML = html;
            });
    }

});


// =============================
// FORMULARIO MULTISTEP
// =============================
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


// =============================
// ENVÍO DE FORMULARIO
// =============================
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

        // VALIDACIÓN
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

        // DEBUG (para backend luego)
        console.log("Evento listo para backend:", evento);

        // ÉXITO
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


// =============================
// CAMBIO DE TABS (pendientes / rechazados)
// =============================
document.addEventListener("click", function (e) {

    const pendientesBtn = document.getElementById("tab-pendientes");
    const rechazadosBtn = document.getElementById("tab-rechazados");

    if (e.target.id === "tab-pendientes") {

        pendientesBtn?.classList.add("active");
        rechazadosBtn?.classList.remove("active");

        document.getElementById("lista-eventos-editor").innerHTML = `
            <div class="text-center py-5">
                <h6>No hay eventos pendientes</h6>
                <p class="text-muted">Pendientes de aprobación del administrador</p>
            </div>
        `;
    }

    if (e.target.id === "tab-rechazados") {

        rechazadosBtn?.classList.add("active");
        pendientesBtn?.classList.remove("active");

        document.getElementById("lista-eventos-editor").innerHTML = `
            <div class="text-center py-5">
                <h6>No hay eventos rechazados</h6>
                <p class="text-muted">Eventos rechazados por el administrador</p>
            </div>
        `;
    }

});