const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "api_key=4ac15274164d3710a133b4a3023705c6";

export async function GetMovies(q) {
    const url = q
        ? `${baseUrl}/search/movie?${apiKey}&language=en-US&query=${q}&page=1&include_adult=false`
        : `${baseUrl}/movie/popular?${apiKey}&language=en-US&page=1`;
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
    return fetch(`${baseUrl}/movie/${movieId}?${apiKey}`, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}

export async function GetMovieCredits(movieId) {
    return fetch(`${baseUrl}/movie/${movieId}/credits?${apiKey}`, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}