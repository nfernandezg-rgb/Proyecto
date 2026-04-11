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