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