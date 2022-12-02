import config from "../config.js"

export async function GetTopShows() {
    const url = `${config.api.baseUrl}/tv/popular?${config.api.apiKey}&language=en-US&page=1`;
    return fetch(url, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(response => response.results.slice(0, 5))
}

export async function GetShow(showId) {
    return fetch(`${config.api.baseUrl}/tv/${showId}?${config.api.apiKey}`, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}

export async function GetShowCredits(movieId) {
    return fetch(`${config.api.baseUrl}/tv/${movieId}/credits?${config.api.apiKey}`, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}