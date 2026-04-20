document.addEventListener("click", (e) => {

  const steps = document.querySelectorAll(".step");

  // PASO 2
  if (e.target.id === "btnSiguiente") {
    document.getElementById("paso1")?.classList.add("d-none");
    document.getElementById("paso2")?.classList.remove("d-none");

    steps[0]?.classList.remove("active");
    steps[1]?.classList.add("active");
  }

  // VOLVER PASO 1
  if (e.target.id === "btnAnterior") {
    document.getElementById("paso2")?.classList.add("d-none");
    document.getElementById("paso1")?.classList.remove("d-none");

    steps[1]?.classList.remove("active");
    steps[0]?.classList.add("active");
  }

});

//logica para inscripcion de consultante a eventos

// =============================
// Enviar formulario inscrp
// =============================
document.getElementById("formInscripcionCompleto")
  .addEventListener("submit", async function (e) {

    e.preventDefault(); // evita recarga
    //CAMBIOS RECIENTES: se agregaron estas dos lineas de abajo
    const params = new URLSearchParams(window.location.search);
    const eventoId = params.get("id");

    const data = {
      nombre: document.getElementById("nombre").value,
      identificacion: document.getElementById("identificacion").value,
      provincia: document.getElementById("provincia").value,
      canton: document.getElementById("canton").value,
      distrito: document.getElementById("distrito").value,
      correo: document.getElementById("correo").value,
      telefono: document.getElementById("telefono").value,
      descripcion: document.getElementById("descripcion").value,
      eventoId //CAMBIOS RECIENTES: se agrego tambien esto
    };

    try {

      const res = await fetch("http://localhost:3000/inscripciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      Swal.fire({
        icon: "success",
        title: "Inscripción enviada",
        text: "Te has inscrito correctamente al evento"
      });

      // limpiar formulario
      document.getElementById("formInscripcionCompleto").reset();

      // volver al paso 1
      document.getElementById("paso2").classList.add("d-none");
      document.getElementById("paso1").classList.remove("d-none");

    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar la inscripción"
      });
    }

  });