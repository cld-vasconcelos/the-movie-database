import { apiGet } from "../service/api.js";

export async function getPopularShows(page = 1) {
    const route = "/tv/popular";
    const params = [{ key: "page", value: page }];
    return apiGet(route, params);
}

export async function searchShows(q, page = 1) {
    const route = "/search/tv";
    const params = [
        { 
            key: "query", 
            value: q 
        },
        { 
            key: "page", 
            value: page
        }
    ];
    return apiGet(route, params);
}

export async function getShow(showId) {
    const route = `/tv/${showId}`;
    const params = [];
    return apiGet(route, params);
}

export async function getShowCredits(showId) {
    const route = `/tv/${showId}/credits`;
    const params = [];
    return apiGet(route, params);
}