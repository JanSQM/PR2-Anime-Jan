/**
 * menu.js — Gestión del menú de navegación
 */

/**
 * Actualiza el menú con los datos del usuario actual
 */
function updateMenu() {

    const watching =
        JSON.parse(localStorage.getItem("watching"))
        || [];

    const plan =
        JSON.parse(localStorage.getItem("planToWatch"))
        || [];

    document.querySelectorAll(".watching-count")
        .forEach(el => {
            el.textContent = watching.length;
        });

    document.querySelectorAll(".plan-count")
        .forEach(el => {
            el.textContent = plan.length;
        });

}

/**
 * Cierra sesión
 */
function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "index.html";
}

/* ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    updateMenu();

    const logoutButton =
        document.getElementById("logoutButton");

    if (logoutButton) {

        logoutButton.addEventListener("click", (e) => {

            e.preventDefault();

            logout();
        });
    }

});

const menuButton =
    document.getElementById("menuButton");

if (menuButton) {

    menuButton.addEventListener("click", (e) => {

        e.preventDefault();

        const dropdown =
            menuButton.nextElementSibling;

        dropdown.classList.toggle("open");
    });
}