//Cargar componentes header
fetch("components/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });


// navbar
fetch("components/navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  });


// Dark mode
document.addEventListener("click", (e) => {
  if (e.target.id === "toggleDark") {
    document.body.classList.toggle("dark-mode");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest("#toggleDark")) {
    document.body.classList.toggle("dark-mode");

    const icon = document.querySelector("#toggleDark i");
    if (icon) {
      icon.classList.toggle("bi-moon");
      icon.classList.toggle("bi-sun");
    }
  }
});


//footer

fetch("components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });

 
  //sweetalert 
  document.addEventListener("submit", (e) => {
  if (e.target.id === "formInscripcion") {
    e.preventDefault();

    const inputs = e.target.querySelectorAll("input, textarea");
    let valid = true;

    inputs.forEach(input => {
      if (input.hasAttribute("required") && !input.value.trim()) {
        valid = false;
      }
    });

    if (!valid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor complete todos los campos obligatorios"
      });
      return;
    }

    // ÉXITO (simulado)
    Swal.fire({
      icon: "success",
      title: "Inscripción enviada",
      text: "Su solicitud fue enviada correctamente"
    });

    e.target.reset();
  }
});