//codigo js necesario para mostrar en el dahsboard del editor los inscritps por evento

window.cargarEventosInscripciones = async function () {
    try {
        const res = await fetch("http://localhost:3000/eventos?estado=aprobado");
        const eventos = await res.json();

        const contenedor = document.getElementById("lista-eventos");

        if (!contenedor) return;

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
};

//click en ver inscritos

document.addEventListener("click", async (e) => {
    const btnVerInscritos = e.target.closest(".ver-inscritos");
    if (btnVerInscritos) {
        const id = btnVerInscritos.dataset.id;
        cargarInscritos(id);
        return;
    }

    if (e.target.id === "btnVolver") {
        window.cargarEventosInscripciones?.();
    }
});

//mostrar inscritos

async function cargarInscritos(eventoId) {

    try {

        const res = await fetch(`http://localhost:3000/inscripciones/evento/${eventoId}`);
        const inscritos = await res.json();

        const contenedor = document.querySelector("#lista-eventos");

        if (!contenedor) {
            console.warn("contenedor aún no existe");
            return;
        }

        if (inscritos.length === 0) {
            contenedor.innerHTML = `
              <button class="btn btn-secondary mb-3" id="btnVolver">
                ← Volver
              </button>

              <p>No hay inscritos</p>
            `;
            return;
        }

        contenedor.innerHTML = `
          <button class="btn btn-secondary mb-3" id="btnVolver">
            ← Volver
          </button>

          <h5>Personas inscritas:</h5>
         `;

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



