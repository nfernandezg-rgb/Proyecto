//codigo js necesario para mostrar en el dahsboard del editor los inscritps por evento

document.addEventListener("DOMContentLoaded", cargarEventos);

async function cargarEventos() {
    try {
        const res = await fetch("http://localhost:3000/eventos");
        const eventos = await res.json();

        const contenedor = document.getElementById("lista-eventos");

        contenedor.innerHTML = "";

        eventos.forEach(evento => {

            contenedor.innerHTML += `
        <div class="col-md-6">
          <div class="border rounded p-3 d-flex justify-content-between align-items-center">

            <div>
              <strong>${evento.nombre}</strong><br>
              <small>Fecha: ${evento.fecha}</small>
            </div>

            <button 
              class="btn btn-primary ver-inscritos" 
              data-id="${evento._id}">
              <i class="bi bi-arrow-right"></i>
            </button>

          </div>
        </div>
      `;
        });

    } catch (error) {
        console.error(error);
    }
}

//click en ver inscritos

document.addEventListener("click", async (e) => {

    if (e.target.closest(".ver-inscritos")) {

        const id = e.target.closest(".ver-inscritos").dataset.id;

        cargarInscritos(id);
    }

});

//mostrar inscritos

async function cargarInscritos(eventoId) {

    try {

        const res = await fetch(`http://localhost:3000/inscripciones/evento/${eventoId}`);
        const inscritos = await res.json();

        const contenedor = document.getElementById("lista-eventos");

        if (inscritos.length === 0) {
            contenedor.innerHTML = "<p>No hay inscritos</p>";
            return;
        }

        contenedor.innerHTML = "<h5>Personas inscritas:</h5>";

        inscritos.forEach(i => {

            contenedor.innerHTML += `
        <div class="border rounded p-3 mb-2">
          <strong>${i.nombre}</strong><br>
          ${i.correo}<br>
          ${i.telefono}<br>
          ${i.provincia}, ${i.canton}, ${i.distrito}<br>
          <small>${i.descripcion}</small>
        </div>
      `;
        });

    } catch (error) {
        console.error(error);
    }
}