import config from "../config";

export async function SearchMedia(q) {
    const url = `${config.api.baseUrl}/search/multi?${config.api.apiKey}&language=en-US&query=${q}&page=1&include_adult=false`;
    return fetch(url, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(response => response.results.filter(result => result.media_type).slice(0, 5));
}