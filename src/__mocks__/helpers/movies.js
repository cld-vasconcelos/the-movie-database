import mockPopularMoviesResponse from "../data/popular-movies.json";
import mockMovieCreditsResponse from "../data/movie-credits.json";

export function mockMoviesHelper() {
    jest.mock("../../helpers/movies", () => ({
        getPopularMovies: () => {
            return mockPopularMoviesResponse;
        },
        getMovie: (movieId) => {
            return mockPopularMoviesResponse.results.find(movie => movie.id == movieId);
        },
        getMovieCredits: (_) => {
            return mockMovieCreditsResponse;
        }
    }));
}