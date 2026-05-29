/**
 * anime.js — Página principal de índice de anime
 * Gestiona la carga desde la API/caché, filtros, paginación y listas.
 */

/* =====================================================
   Estado de la aplicación
===================================================== */
let allAnime      = [];   // Todos los anime cargados (objetos Anime)
let filteredAnime = [];   // Anime tras aplicar los filtros activos
let displayedCount = 0;   // Cuántos se muestran actualmente
let allGenres     = [];   // Lista completa de géneros [{id, name}]
let selectedGenres = new Set(); // IDs de géneros seleccionados
let currentUser;          // Objeto User del usuario logueado

/* Añadir las funciones que consideréis necesarias*/

/* =====================================================
   Inicialización
===================================================== */
document.addEventListener('DOMContentLoaded', async function () {

    // Verificar autenticación
    const loggedUser = localStorage.getItem("loggedUser");

if (!loggedUser) {
    window.location.href = "index.html";
}

    // Cargar usuario actual
    currentUser = new User();
currentUser.loadFromStorage(loggedUser);

    showLoader(true);

    try {
        // Cargar géneros y anime (desde caché o API)

allGenres = await loadGenres();
allAnime = await loadAnimeList();

    } catch (err) {
        console.error('Error al cargar datos:', err);
        document.getElementById('animeContainer').innerHTML =
            '<p class="no-results">Error al cargar los datos. Recarga la página.</p>';
    }

    showLoader(false);

    // Construir filtros de género
    buildGenreFilters();

    // Restaurar filtros si se viene del detalle
    restoreFilters();

    // Aplicar filtros y renderizar
    applyFiltersAndRender();

    // Eventos de los controles de filtro
document.getElementById("clearFiltersBtn")
    .addEventListener("click", () => {
        selectedGenres.clear();

        document.getElementById("typeFilter").value = "";
        document.getElementById("statusFilter").value = "";
        document.getElementById("minScoreFilter").value = "";

        applyFiltersAndRender();
        document.getElementById("typeFilter")
    .addEventListener("change", applyFiltersAndRender);

document.getElementById("statusFilter")
    .addEventListener("change", applyFiltersAndRender);

document.getElementById("minScoreFilter")
    .addEventListener("input", applyFiltersAndRender);
    });

    // Eventos de los botones de ordenamiento
document.querySelectorAll(".btn-sort")
    .forEach(button => {

        button.addEventListener("click", () => {

            document.querySelectorAll(".btn-sort")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            const sortType =
                button.dataset.sort;

            sortAnime(sortType);

            renderAnime();
        });

    });

    // Botón "Cargar más"
    document.getElementById("loadMoreBtn")
    .addEventListener("click", () => {
        displayedCount += ITEMS_PER_VIEW;
        renderAnime();
    });
});

/* =====================================================
   Carga de datos (API + caché localStorage)
===================================================== */

/**
 * Pausa la ejecución N milisegundos (para respetar rate limits).
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Petición a la API con manejo de error 429 (rate limit).
 * Reintenta automáticamente si recibe 429.
 */
async function fetchWithRateLimit(url, retries = 3) {
    for (let attempt = 0; attempt < retries; attempt++) {
        const response = await fetch(url);
        if (response.ok) return response.json();
        if (response.status === 429) {
            console.warn(`Rate limit (429). Esperando 2s... (intento ${attempt + 1}/${retries})`);
            await delay(2000);
        } else {
            throw new Error(`Error HTTP ${response.status} al consultar ${url}`);
        }
    }
    throw new Error('Se superó el número de reintentos por rate limit.');
}

/**
 * Carga géneros desde caché o API.
 * @returns {Array} Lista de géneros [{id, name}]
 */
async function loadGenres() {
    //...

    await delay(API_DELAY_MS);
    const data   = await fetchWithRateLimit(`${API_BASE}/genres/anime`);
    //...
}

/**
 * Carga la lista de anime desde caché o API (4 páginas × 25 = 100 anime).
 * @returns {Array<Anime>} Lista de objetos Anime
 */
async function loadAnimeList() {

    // Usar caché si es válida


    for (let page = 1; page <= PAGES_TO_FETCH; page++) {
        //...

        const url  = `${API_BASE}/anime?order_by=popularity&sort=asc&limit=${ANIME_PER_PAGE}&page=${page}`;
        //...
    }

    //...
    //...
    //...
}

/* =====================================================
   Funciones para contrl de la Caché (localStorage)
===================================================== */

//...
//...
/* Añadir las funciones que consideréis necesarias*/

/* =====================================================
   Filtros
===================================================== */

/* Añadir las funciones que consideréis necesarias*/
function sortAnime(sortType) {

    switch (sortType) {

        case "titleAsc":

            filteredAnime.sort((a, b) =>
                a.title.localeCompare(b.title)
            );

            break;

        case "titleDesc":

            filteredAnime.sort((a, b) =>
                b.title.localeCompare(a.title)
            );

            break;

        case "scoreDesc":

            filteredAnime.sort((a, b) =>
                (b.score || 0) - (a.score || 0)
            );

            break;

        case "scoreAsc":

            filteredAnime.sort((a, b) =>
                (a.score || 0) - (b.score || 0)
            );

            break;

        case "popularity":

            filteredAnime.sort((a, b) =>
                a.popularity - b.popularity
            );

            break;
    }
}
/* =====================================================
   Tarjetas de Anime
===================================================== */

/** Crea el elemento HTML de una tarjeta de anime */

//...
//...
//...
/* Añadir las funciones que consideréis necesarias*/

/* =====================================================
   Gestión de listas
===================================================== */

/* Añadir las funciones que consideréis necesarias*/

/* =====================================================
   Loader / spinner
===================================================== */

function showLoader(visible) {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = visible ? 'flex' : 'none';
}


/* Añadir las funciones que consideréis necesarias*/
async function loadGenres() {

    await delay(API_DELAY_MS);

    const data = await fetchWithRateLimit(
        `${API_BASE}/genres/anime`
    );

    return data.data;
}

async function loadAnimeList() {

    let animeList = [];

    for (let page = 1; page <= PAGES_TO_FETCH; page++) {

        await delay(API_DELAY_MS);

        const url =
            `${API_BASE}/anime?order_by=popularity&sort=asc&limit=${ANIME_PER_PAGE}&page=${page}`;

        const data = await fetchWithRateLimit(url);

        animeList = animeList.concat(data.data);
    }

    return animeList;
}

function buildGenreFilters() {

    const container =
        document.getElementById("genreFilters");

    container.innerHTML = "";

    allGenres.slice(0, 15).forEach(genre => {

        const btn = document.createElement("button");

        btn.textContent = genre.name;

        btn.classList.add("genre-tag");

        btn.addEventListener("click", () => {

            if (selectedGenres.has(genre.mal_id)) {
                selectedGenres.delete(genre.mal_id);
                btn.classList.remove("active");
            } else {
                selectedGenres.add(genre.mal_id);
                btn.classList.add("active");
            }

            applyFiltersAndRender();
        });

        container.appendChild(btn);
    });
}

function applyFiltersAndRender() {

    const type =
        document.getElementById("typeFilter").value;

    const status =
        document.getElementById("statusFilter").value;

    const minScore =
        parseFloat(
            document.getElementById("minScoreFilter").value
        ) || 0;

    filteredAnime = allAnime.filter(anime => {

        const matchesType =
            !type || anime.type === type;

        let matchesStatus = true;

if (status === "airing") {

    matchesStatus =
        anime.status === "Currently Airing";
}

else if (status === "complete") {

    matchesStatus =
        anime.status === "Finished Airing";
}

else if (status === "upcoming") {

    matchesStatus =
        anime.status === "Not yet aired";
}

        const matchesScore =
            (anime.score || 0) >= minScore;

        const matchesGenres =

            selectedGenres.size === 0 ||

            anime.genres.some(genre =>
                selectedGenres.has(genre.mal_id)
            );

        return (
            matchesType &&
            matchesStatus &&
            matchesScore &&
            matchesGenres
        );
    });

    displayedCount = ITEMS_PER_VIEW;

    renderAnime();
}

function renderAnime() {

    const container =
        document.getElementById("animeContainer");

    container.innerHTML = "";

    const visibleAnime =
        filteredAnime.slice(0, displayedCount);

    visibleAnime.forEach(anime => {

        const card = createAnimeCard(anime);

        container.appendChild(card);
    });

    const loadBtn =
        document.getElementById("loadMoreBtn");

    if (displayedCount < filteredAnime.length) {
        loadBtn.style.display = "inline-block";
    } else {
        loadBtn.style.display = "none";
    }

    document.getElementById("resultCount").textContent =
        `${filteredAnime.length} animes encontrados`;
}

function createAnimeCard(anime) {

    const card = document.createElement("div");

    card.classList.add("anime-card");

    card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>⭐ ${anime.score || "N/A"}</p>
    `;
    
card.innerHTML = `
    <img src="${anime.images.jpg.image_url}" alt="${anime.title}">

    <div class="anime-card-content">

        <h3>${anime.title}</h3>

        <p class="anime-score">
            ⭐ ${anime.score || "N/A"}
        </p>

        <p class="anime-status">
            ${anime.status}
        </p>

        <div class="anime-genres">
            ${anime.genres
                .slice(0, 3)
                .map(g => `<span>${g.name}</span>`)
                .join("")}
        </div>

    </div>
`;

card.addEventListener("click", () => {

    window.location.href =
        `detail.html?id=${anime.mal_id}`;
});

    return card;
}

function restoreFilters() {
}