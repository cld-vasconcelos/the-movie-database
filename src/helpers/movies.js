import { apiGet } from "../service/api.js";

export async function getPopularMovies(page = 1) {
    const route = "/movie/popular";
    const params = [{ key: "page", value: page }];
    return apiGet(route, params);
}

export async function searchMovies(q, page = 1) {
    const route = "/search/movie";
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

export async function getMovie(movieId) {
    const route = `/movie/${movieId}`;
    const params = [];
    return apiGet(route, params);
}

export async function getMovieCredits(movieId) {
    const route = `/movie/${movieId}/credits`;
    const params = [];
    return apiGet(route, params);
}