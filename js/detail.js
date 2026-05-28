document.addEventListener("DOMContentLoaded", async () => {

    const params =
        new URLSearchParams(window.location.search);

    const animeId = params.get("id");

    if (!animeId) {
        window.location.href = "anime.html";
        return;
    }

    const loader =
        document.getElementById("loader");

    const container =
        document.getElementById("detailContainer");

    try {

        const response = await fetch(
            `${API_BASE}/anime/${animeId}`
        );

        const data = await response.json();

        const anime = data.data;

        container.innerHTML = `
            <div class="detail-card">

                <img 
                    class="detail-image"
                    src="${anime.images.jpg.image_url}"
                    alt="${anime.title}"
                >

                <div class="detail-info">

                    <h1>${anime.title}</h1>

                    <p>
                        <strong>Título japonés:</strong>
                        ${anime.title_japanese || "N/A"}
                    </p>

                    <p>
                        <strong>Score:</strong>
                        ${anime.score || "N/A"}
                    </p>

                    <p>
                        <strong>Episodios:</strong>
                        ${anime.episodes || "N/A"}
                    </p>

                    <p>
                        <strong>Estado:</strong>
                        ${anime.status}
                    </p>

                    <p>
                        <strong>Tipo:</strong>
                        ${anime.type}
                    </p>

                    <p>
                        <strong>Popularidad:</strong>
                        #${anime.popularity}
                    </p>

                    <p>
                        <strong>Sinopsis:</strong><br>
                        ${anime.synopsis || "Sin sinopsis"}
                    </p>

                <div class="detail-buttons">

    <button id="addWatchingBtn">
        Añadir a Watching
    </button>

    <button id="addPlanBtn">
        Añadir a Plan To Watch
    </button>

</div>
                </div>

            </div>
        `;

        const addWatchingBtn =
    document.getElementById("addWatchingBtn");

const addPlanBtn =
    document.getElementById("addPlanBtn");

addWatchingBtn.addEventListener("click", () => {

    let watching =
        JSON.parse(localStorage.getItem("watching"))
        || [];

    const exists = watching.some(
        item => item.mal_id === anime.mal_id
    );

    if (!exists) {

       watching.push({
    mal_id: anime.mal_id,
    title: anime.title,
    score: anime.score,
    imageUrl: anime.images.jpg.image_url
});

        localStorage.setItem(
            "watching",
            JSON.stringify(watching)
        );

        alert("Añadido a Watching");
    } else {
        alert("Ya está en Watching");
    }

});

addPlanBtn.addEventListener("click", () => {

    let plan =
        JSON.parse(localStorage.getItem("planToWatch"))
        || [];

    const exists = plan.some(
        item => item.mal_id === anime.mal_id
    );

    if (!exists) {

        plan.push({
    mal_id: anime.mal_id,
    title: anime.title,
    score: anime.score,
    imageUrl: anime.images.jpg.image_url
});

        localStorage.setItem(
            "planToWatch",
            JSON.stringify(plan)
        );

        alert("Añadido a Plan To Watch");
    } else {
        alert("Ya está en Plan To Watch");
    }

});

    } catch (error) {

        console.error(error);

        container.innerHTML =
            `<p>Error cargando detalle.</p>`;
    }

    loader.style.display = "none";

    const backButton =
        document.getElementById("backButton");

    backButton.addEventListener("click", () => {
        window.location.href = "anime.html";
    });

});