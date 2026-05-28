/**
 * listas.js — Gestión de listas
 */

document.addEventListener("DOMContentLoaded", () => {

    const params =
        new URLSearchParams(window.location.search);

    const lista =
        params.get("lista") || "watching";

    let animeList =
        JSON.parse(localStorage.getItem(lista))
        || [];

    const container =
        document.getElementById("listContainer");

    const title =
        document.getElementById("listTitle");

    if (lista === "watching") {
        title.textContent = "Viendo actualmente";
    } else {
        title.textContent = "Plan To Watch";
    }

    if (animeList.length === 0) {

        container.innerHTML =
            `
<div class="empty-state">
    <i class="fa-solid fa-film"></i>
    <p>No hay anime en esta lista.</p>
</div>
`;

        return;
    }

    animeList.forEach(anime => {

        const card =
            createAnimeCard(anime, animeList, lista);

        container.appendChild(card);
    });

});

function createAnimeCard(anime, animeList, lista) {

    const card = document.createElement("div");

    card.classList.add("anime-card");

    card.innerHTML = `
        <img src="${anime.images?.jpg?.image_url || anime.imageUrl}">
        <h3>${anime.title || anime.titleEnglish}</h3>
        <p>⭐ ${anime.score || "N/A"}</p>

        <button class="removeBtn">
            Eliminar
        </button>
    `;

    card.addEventListener("click", (e) => {

        if (e.target.classList.contains("removeBtn"))
            return;

        window.location.href =
            `detail.html?id=${anime.mal_id}`;
    });

    const removeBtn =
        card.querySelector(".removeBtn");

    removeBtn.addEventListener("click", () => {

        animeList =
            animeList.filter(
                item => item.mal_id !== anime.mal_id
            );

        localStorage.setItem(
            lista,
            JSON.stringify(animeList)
        );

        location.reload();
    });

    return card;
}