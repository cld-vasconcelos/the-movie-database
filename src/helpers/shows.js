const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "api_key=4ac15274164d3710a133b4a3023705c6";

export async function GetTopShows() {
    const url = `${baseUrl}/tv/popular?${apiKey}&language=en-US&page=1`;
    return fetch(url, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(response => response.results.slice(0, 5))
}