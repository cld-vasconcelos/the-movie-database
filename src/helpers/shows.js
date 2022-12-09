import api from "../service/api.js";

export async function getPopularShows(page = 1) {
    const route = "/tv/popular";
    const params = { page };
    return api.get(route, { params }).then((response) => response.data);
}

export async function searchShows(q, page = 1) {
    const route = "/search/tv";
    const params = {
        query: q,
        page
    }
    return api.get(route, { params }).then((response) => response.data);
}

export async function getShow(showId) {
    const route = `/tv/${showId}`;
    return api.get(route).then((response) => response.data);
}

export async function getShowCredits(showId) {
    const route = `/tv/${showId}/credits`;
    return api.get(route).then((response) => response.data);
}