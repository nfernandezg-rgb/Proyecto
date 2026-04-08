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


//cargar lectura rapida desplegar al dar click en el boton

document.addEventListener("click", (e) => {
  if (e.target.id === "btnLectura") {
    const box = document.getElementById("lecturaFacil");
    box.classList.toggle("d-none");
  }
});


// modal de realizar consulta

document.addEventListener("click", (e) => {

  if (e.target.id === "btnEnviarConsulta") {

    const correo = document.getElementById("correoConsulta").value;
    const consulta = document.getElementById("textoConsulta").value;

    if (!correo || !consulta) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor complete todos los campos"
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Consulta enviada",
      text: "Su consulta ha sido enviada correctamente"
    });

    // limpiar
    document.getElementById("formConsulta").reset();

    // cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalConsulta'));
    modal.hide();
  }

});


//formulario

document.addEventListener("click", (e) => {

  const steps = document.querySelectorAll(".step");

  // IR A PASO 2
  if (e.target.id === "btnSiguiente") {
    document.getElementById("paso1").classList.add("d-none");
    document.getElementById("paso2").classList.remove("d-none");

    steps[0].classList.remove("active");
    steps[1].classList.add("active");
  }

  // VOLVER A PASO 1
  if (e.target.id === "btnAnterior") {
    document.getElementById("paso2").classList.add("d-none");
    document.getElementById("paso1").classList.remove("d-none");

    steps[1].classList.remove("active");
    steps[0].classList.add("active");
  }

});


//login 

document.addEventListener("click", (e) => {

  if (e.target.id === "btnLogin") {

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    if (!usuario || !password) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Ingrese usuario y contraseña"
      });
      return;
    }

    // SIMULACIÓN
    if (usuario === "admin" && password === "123") {
      Swal.fire({
        icon: "success",
        title: "Bienvenido Admin"
      }).then(() => {
        window.location.href = "admin-dashboard.html";
      });
    } else if (usuario === "editor" && password === "123") {
      Swal.fire({
        icon: "success",
        title: "Bienvenido Editor"
      }).then(() => {
        window.location.href = "editor-dashboard.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Credenciales incorrectas"
      });
    }

  }

});

//editor-dashboard-componentes

//TOPBAR EDITOR
fetch("components/editor-topbar.html")
  .then(res => res.text())
  .then(data => {
    const el = document.getElementById("editor-topbar");
    if (el) el.innerHTML = data;
  });

// SIDEBAR EDITOR
fetch("components/editor-sidebar.html")
  .then(res => res.text())
  .then(data => {
    const el = document.getElementById("editor-sidebar");
    if (el) el.innerHTML = data;
  });