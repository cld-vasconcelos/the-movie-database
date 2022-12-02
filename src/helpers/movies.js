import config from "../config.js"

export async function GetTopMovies() {
    console.log();
    const url = `${config.api.baseUrl}/movie/popular?${config.api.apiKey}&language=en-US&page=1`;
    return fetch(url, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(response => response.results.slice(0, 5))
}

export async function GetMovies(q) {
    const url = `${config.api.baseUrl}/search/movie?${config.api.apiKey}&language=en-US&query=${q}&page=1&include_adult=false`;
    return fetch(url, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(response => response.results.slice(0, 5))
}

export async function GetMovie(movieId) {
    return fetch(`${config.api.baseUrl}/movie/${movieId}?${config.api.apiKey}`, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}

export async function GetMovieCredits(movieId) {
    return fetch(`${config.api.baseUrl}/movie/${movieId}/credits?${config.api.apiKey}`, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}