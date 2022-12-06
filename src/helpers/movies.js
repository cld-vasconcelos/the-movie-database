import { ApiGet } from "../service/api.js";

export async function GetTopMovies() {
    const route = "/movie/popular";
    const params = [{ key: "page", value: "1" }];
    return ApiGet(route, params)
        .then(response => response.results.slice(0, 5));
}

export async function SearchMovies(q, page = 1) {
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
    return ApiGet(route, params);
}

export async function GetMovie(movieId) {
    const route = `/movie/${movieId}`;
    const params = [];
    return ApiGet(route, params);
}

export async function GetMovieCredits(movieId) {
    const route = `/movie/${movieId}/credits`;
    const params = [];
    return ApiGet(route, params);
}