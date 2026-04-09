document.addEventListener("click", (e) => {

    const contenedor = document.getElementById("contenido-dinamico");

    // CREAR EVENTO
    if (e.target.id === "menu-crear") {
        contenedor.innerHTML = `
      <h4>Crear Evento</h4>

      <form>
        <div class="mb-3">
          <label>Nombre del evento</label>
          <input type="text" class="form-control">
        </div>

        <div class="mb-3">
          <label>Fecha</label>
          <input type="date" class="form-control">
        </div>

        <div class="mb-3">
          <label>Descripción</label>
          <textarea class="form-control"></textarea>
        </div>

        <button class="btn btn-primary">Guardar</button>
      </form>
    `;
    }

    // EVENTOS PUBLICADOS
    if (e.target.id === "menu-publicados") {
        contenedor.innerHTML = `
      <h4>Eventos Publicados</h4>
      <p>Aquí se mostrarán los eventos desde el backend</p>
    `;
    }

});


//formulario crear evento

function nextStep() {
    document.getElementById("step-1").style.display = "none";
    document.getElementById("step-2").style.display = "block";

    document.getElementById("step1-indicator").classList.remove("bg-primary");
    document.getElementById("step1-indicator").classList.add("bg-secondary");

    document.getElementById("step2-indicator").classList.remove("bg-secondary");
    document.getElementById("step2-indicator").classList.add("bg-primary");
}

function prevStep() {
    document.getElementById("step-1").style.display = "block";
    document.getElementById("step-2").style.display = "none";

    document.getElementById("step1-indicator").classList.add("bg-primary");
    document.getElementById("step1-indicator").classList.remove("bg-secondary");

    document.getElementById("step2-indicator").classList.add("bg-secondary");
    document.getElementById("step2-indicator").classList.remove("bg-primary");
}


//captura de datos

document.getElementById("form-evento").addEventListener("submit", function (e) {
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

    console.log("Evento listo para backend:", evento);

    alert("Evento enviado para aprobación :white_check_mark:");
});