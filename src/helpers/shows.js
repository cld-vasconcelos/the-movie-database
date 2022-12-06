import { ApiGet } from "../service/api.js";

export async function GetTopShows() {
    const route = "/tv/popular";
    const params = [{ key: "page", value: "1" }];
    return ApiGet(route, params)
        .then(response => response.results.slice(0, 5));
}

export async function SearchShows(q) {
    const route = "/search/tv";
    const params = [
        { 
            key: "query", 
            value: q 
        },
        { 
            key: "page", 
            value: "1" 
        }
    ];
    return ApiGet(route, params);
}

export async function GetShow(showId) {
    const route = `/tv/${showId}`;
    const params = [];
    return ApiGet(route, params);
}

export async function GetShowCredits(showId) {
    const route = `/tv/${showId}/credits`;
    const params = [];
    return ApiGet(route, params);
}