document.addEventListener("DOMContentLoaded", () => {

    const saveButton = document.getElementById("saveButton");
    const backButton = document.getElementById("backToLoginButton");

    saveButton.addEventListener("click", () => {

        const name = document.getElementById("name").value.trim();
        const surname = document.getElementById("surname").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value;
        const postalCode = document.getElementById("postalCode").value.trim();
        let email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const password2 = document.getElementById("password2").value;

        if (!name || !surname || !address) {
            alert("Nom, cognoms i adreça són obligatoris");
            return;
        }

        if (!city) {
            alert("Has de seleccionar una població");
            return;
        }

        if (password !== password2) {
            alert("Les contrasenyes no coincideixen");
            return;
        }

        if (password.length < 8) {
            alert("La contrasenya ha de tenir mínim 8 caràcters");
            return;
        }

        email = email.replace("@", "@uoc.edu");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Email no vàlid");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.some(u => u.username === username);

        if (exists) {
            alert("Aquest usuari ja existeix");
            return;
        }

    const newUser = {
    name,
    surname,
    address,
    city,
    postalCode,
    email,
    username,
    password,
    watching: [],
    planToWatch: []
};

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Usuari creat correctament!");

        window.location.href = "index.html";
    });

    backButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });

});