import mockPopularMovies from "../../__mocks__/popular-movies.json";
import mockSearchMoviesResults from "../../__mocks__/search-movies-results.json";
import mockMovie from "../../__mocks__/movie.json";
import mockMovieCredits from "../../__mocks__/movie-credits.json";

export async function getPopularMovies(page = 1) {
    return mockPopularMovies;
}

export async function searchMovies(q, page = 1) {
    return mockSearchMoviesResults;
}

export async function getMovie(movieId) {
    return mockMovie;
}

export async function getMovieCredits(movieId) {
    return mockMovieCredits;
}