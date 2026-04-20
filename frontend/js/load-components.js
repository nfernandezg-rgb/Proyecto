// =============================
// CARGA DE COMPONENTES
// =============================

// HEADER
fetch("components/header.html")
  .then(res => res.text())
  .then(data => {
    const el = document.getElementById("header");
    if (el) el.innerHTML = data;
  });

// NAVBAR
fetch("components/navbar.html")
  .then(res => res.text())
  .then(data => {
    const el = document.getElementById("navbar");
    if (el) el.innerHTML = data;
  });

// FOOTER
fetch("components/footer.html")
  .then(res => res.text())
  .then(data => {
    const el = document.getElementById("footer");
    if (el) el.innerHTML = data;
  });

// TOPBAR EDITOR
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


// =============================
// EVENTOS GLOBALES (UI)
// =============================
document.addEventListener("click", (e) => {

  // DARK MODE
  if (e.target.closest("#toggleDark")) {
    document.body.classList.toggle("dark-mode");

    const icon = document.querySelector("#toggleDark i");
    if (icon) {
      icon.classList.toggle("bi-moon");
      icon.classList.toggle("bi-sun");
    }
  }

  // LECTURA FÁCIL
  if (e.target.id === "btnLectura") {
    const box = document.getElementById("lecturaFacil");
    if (box) box.classList.toggle("d-none");
  }

});


// =============================
// ADMIN-COMPONENT
// =============================

// SIDEBAR ADMIN
fetch("components/admin-sidebar.html")
  .then(res => res.text())
  .then(data => {
    const el = document.getElementById("admin-sidebar");
    if (el) el.innerHTML = data;
  });