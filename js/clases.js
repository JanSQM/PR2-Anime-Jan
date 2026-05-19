/**
 * clases.js — Clases principales de la aplicación
 * Incluye: Anime, AnimeList, User
 */

/* ===========================
   CLASE ANIME
   Representa un anime individual con toda su información.
   =========================== */
class Anime {
    #malId;
    #title;
    #titleJapanese;
    #synopsis;
    #imageUrl;
    #type;
    #episodes;
    #status;
    #score;
    #genres;
    #studios;
    #aired;
    #popularity;
    #rank;

    /* Constructor de la clase Anime */
    constructor(
    malId,
    title,
    titleJapanese,
    synopsis,
    imageUrl,
    type,
    episodes,
    status,
    score,
    genres,
    studios,
    aired,
    popularity,
    rank
) {
    this.#malId = malId;
    this.#title = title;
    this.#titleJapanese = titleJapanese;
    this.#synopsis = synopsis;
    this.#imageUrl = imageUrl;
    this.#type = type;
    this.#episodes = episodes;
    this.#status = status;
    this.#score = score;
    this.#genres = genres;
    this.#studios = studios;
    this.#aired = aired;
    this.#popularity = popularity;
    this.#rank = rank;
}

    /* --- Getters --- */
    get malId() {
    return this.#malId;
}

get title() {
    return this.#title;
}

get titleJapanese() {
    return this.#titleJapanese;
}

get synopsis() {
    return this.#synopsis;
}

get imageUrl() {
    return this.#imageUrl;
}

get type() {
    return this.#type;
}

get episodes() {
    return this.#episodes;
}

get status() {
    return this.#status;
}

get score() {
    return this.#score;
}

get genres() {
    return this.#genres;
}

get studios() {
    return this.#studios;
}

get aired() {
    return this.#aired;
}

get popularity() {
    return this.#popularity;
}

get rank() {
    return this.#rank;
}


    /* --- Setters --- */
    set malId(value) {
    this.#malId = value;
}

set title(value) {
    this.#title = value;
}

set titleJapanese(value) {
    this.#titleJapanese = value;
}

set synopsis(value) {
    this.#synopsis = value;
}

set imageUrl(value) {
    this.#imageUrl = value;
}

set type(value) {
    this.#type = value;
}

set episodes(value) {
    this.#episodes = value;
}

set status(value) {
    this.#status = value;
}

set score(value) {
    this.#score = value;
}

set genres(value) {
    this.#genres = value;
}

set studios(value) {
    this.#studios = value;
}

set aired(value) {
    this.#aired = value;
}

set popularity(value) {
    this.#popularity = value;
}

set rank(value) {
    this.#rank = value;
}


    /** Serializa el anime a un objeto plano para localStorage */
    toJSON() {
        return {
    malId: this.#malId,
    title: this.#title,
    titleJapanese: this.#titleJapanese,
    synopsis: this.#synopsis,
    imageUrl: this.#imageUrl,
    type: this.#type,
    episodes: this.#episodes,
    status: this.#status,
    score: this.#score,
    genres: this.#genres,
    studios: this.#studios,
    aired: this.#aired,
    popularity: this.#popularity,
    rank: this.#rank
};
    }

    /** Crea un Anime desde datos guardados en localStorage */
    fromJSON(data) {
        return new Anime(
    data.malId,
    data.title,
    data.titleJapanese,
    data.synopsis,
    data.imageUrl,
    data.type,
    data.episodes,
    data.status,
    data.score,
    data.genres,
    data.studios,
    data.aired,
    data.popularity,
    data.rank
);
    }

    /* Añadir las funciones que consideréis necesarias*/
}


/* ===========================
   CLASE ANIMELIST
   Gestiona una lista de animes (con límite opcional).
   =========================== */
class AnimeList {
    #items;
    #name;
    #maxItems;

    /* Constructor de la clase AnimeList */

    constructor(name, maxItems = null) {
    this.#name = name;
    this.#maxItems = maxItems;
    this.#items = [];
}

    /* --- Getters --- */

    get items() {
    return this.#items;
}

get name() {
    return this.#name;
}

get maxItems() {
    return this.#maxItems;
}

    /* --- Métodos de gestión --- */

    /** Añade un anime a la lista */
    addAnime(anime) {

    if (this.#maxItems && this.#items.length >= this.#maxItems) {
        alert("Has arribat al límit de la llista.");
        return false;
    }

    const exists = this.#items.some(
        item => item.malId === anime.malId
    );

    if (!exists) {
        this.#items.push(anime);
        return true;
    }

    return false;
}

    /** Elimina un anime por su ID */
    removeAnime(malId) {
        this.#items = this.#items.filter(
    anime => anime.malId !== malId
);
    }

    //...

    /** Serializa la lista para localStorage */
    toJSON() {
        //...
    }

    fromJSON(data) {
        //...
    }

    /* Añadir las funciones que consideréis necesarias*/
}


/* ===========================
   CLASE USER
   Gestiona un usuario con sus listas y datos personales.
   =========================== */
class User {
    #name;
    #surname;
    #address;
    #city;
    #postalCode;
    #email;
    #username;
    #password;
    #watching;     // AnimeList — máx. 10
    #planToWatch;  // AnimeList — sin límite

    /*Constructor de la clase User */

    constructor(name, surname, address, city, postalCode, email, username, password) {
    this.#name = name;
    this.#surname = surname;
    this.#address = address;
    this.#city = city;
    this.#postalCode = postalCode;
    this.#email = email;
    this.#username = username;
    this.#password = password;

    this.#watching = new AnimeList("Watching", 10);
    this.#planToWatch = new AnimeList("Plan To Watch");
}

    /* --- Getters --- */
    get name() {
    return this.#name;
}

get surname() {
    return this.#surname;
}

get address() {
    return this.#address;
}

get city() {
    return this.#city;
}

get postalCode() {
    return this.#postalCode;
}

get email() {
    return this.#email;
}

get username() {
    return this.#username;
}

get password() {
    return this.#password;
}

get watching() {
    return this.#watching;
}

get planToWatch() {
    return this.#planToWatch;
}
    
    /* --- Setters --- */
    set name(value) {
    this.#name = value;
}

set surname(value) {
    this.#surname = value;
}

set address(value) {
    this.#address = value;
}

set city(value) {
    this.#city = value;
}

set postalCode(value) {
    this.#postalCode = value;
}

set email(value) {
    this.#email = value;
}

set username(value) {
    this.#username = value;
}

set password(value) {
    this.#password = value;
}


    //...

    /** Guarda el usuario en localStorage (nuevo usuario) */
    save() {
        //...
    }

    /** Actualiza los datos del usuario en localStorage */
    update() {
        //...
    }

    /** Objeto plano serializable para localStorage */
    #toStorageObject() {
        //...
    }

    /** Carga un usuario desde localStorage dado su nombre de usuario */
    loadFromStorage(username) {
        //...
    }

    /* Añadir las funciones que consideréis necesarias*/
}
