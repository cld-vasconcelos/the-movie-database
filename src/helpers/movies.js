import api from "../service/api.js";

export async function getPopularMovies(page = 1) {
    const route = "movie/popular";
    const params = { page };
    return api.get(route, { params }).then((response) => response.data);
}

export async function searchMovies(q, page = 1) {
    const route = "/search/movie";
    const params = {
        query: q,
        page
    }
    return api.get(route, { params }).then((response) => response.data);
}

export async function getMovie(movieId) {
    const route = `/movie/${movieId}`;
    return api.get(route).then((response) => response.data);
}

export async function getMovieCredits(movieId) {
    const route = `/movie/${movieId}/credits`;
    return api.get(route).then((response) => response.data);
}