//js dedicado especificamente para la logica necesaria para mostrar consultas en el dashboard del editor

function esperarElemento(id, callback) {
    const intervalo = setInterval(() => {
        const el = document.getElementById(id);
        if (el) {
            clearInterval(intervalo);
            callback(el);
        }
    }, 300);
}

esperarElemento("lista-consultas", cargarConsultas);

async function cargarConsultas() {

    try {
        const res = await fetch("http://localhost:3000/consultas");
        const consultas = await res.json();

        const contenedor = document.getElementById("lista-consultas");

        contenedor.innerHTML = "";

        if (consultas.length === 0) {
            contenedor.innerHTML = `
                <div class="text-center py-4">
                    <p>No hay consultas registradas</p>
                </div>
            `;
            return;
        }

        consultas.forEach(c => {
            contenedor.innerHTML += `
                <div class="border rounded mb-3 p-3">

                    <strong>Evento: ${c.evento?.nombre || "Sin nombre"}</strong><br>
                    <small>Fecha del Evento: ${c.evento?.fecha || "--"}</small>

                    <hr>

                    <small><strong>Fecha de la consulta:</strong> 
                        ${new Date(c.fecha).toLocaleString()}
                    </small><br>

                    <small><strong>Correo:</strong> ${c.correo}</small>

                    <p class="mt-2">
                        ${c.mensaje}
                    </p>

                    <div class="text-end">
                        <button 
                            class="btn btn-danger btn-sm btn-eliminar-consulta"
                            data-id="${c._id}">
                            Eliminar
                        </button>
                    </div>

                </div>
            `;
        });

    } catch (error) {
        console.error("Error cargando consultas:", error);
    }
}

//para poder elimianr una consulta despues de que fue respondida.
document.addEventListener("click", async (e) => {

    if (e.target.classList.contains("btn-eliminar-consulta")) {

        const id = e.target.dataset.id;

        const confirmacion = await Swal.fire({
            title: "¿Eliminar consulta?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (!confirmacion.isConfirmed) return;

        try {
            await fetch(`http://localhost:3000/consultas/${id}`, {
                method: "DELETE"
            });

            Swal.fire("Eliminado", "Consulta eliminada", "success");

            cargarConsultas(); //recarga la lista

        } catch (error) {
            console.error(error);

            Swal.fire("Error", "No se pudo eliminar", "error");
        }
    }

});