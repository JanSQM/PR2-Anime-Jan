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
    });

    // Eventos de los botones de ordenamiento


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

        btn.classList.add("genre-btn");

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

    filteredAnime = [...allAnime];

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

    return card;
}

function restoreFilters() {
}