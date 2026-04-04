//Cargar componentes
fetch("components/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });

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