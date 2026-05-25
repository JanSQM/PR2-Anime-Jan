document.addEventListener("DOMContentLoaded", () => {

    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("newUserButton");

    // =========================
    // LOGIN
    // =========================

    loginButton.addEventListener("click", () => {

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userFound = users.find(
            user =>
                user.username === username &&
                user.password === password
        );

        if (userFound) {

            // guardar sessió
            localStorage.setItem(
                "currentUser",
                JSON.stringify(userFound)
            );

            alert("Login correcte!");

            localStorage.setItem("loggedUser", username);

window.location.href = "anime.html";

        } else {
            alert("Usuari o contrasenya incorrectes");
        }

    });

    // =========================
    // ANAR A REGISTRE
    // =========================

    registerButton.addEventListener("click", () => {
        window.location.href = "registro.html";
    });

});