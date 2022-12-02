import { useLoaderData, useNavigate } from "react-router-dom";
import { GetMovies } from "../../helpers/movies";

import "./Search.css";

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    const movies = await GetMovies(q);

    return { q, movies };
}

export default function Search() {
    const { q, movies } = useLoaderData();
    const navigate = useNavigate();

    const redirectTo = (movieId) => {
        navigate(`/movies/${movieId}`)
    }

    return (
        <>
            <div className="search-wrapper">
                <h3>Search '{q}'</h3>
                <div className="search-movie-list">
                    <ul>
                        {movies.map((movie) => (
                            <li onClick={() => { redirectTo(movie.id) }}>
                                <div className="search-movie-poster">
                                    <img
                                        src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                                        alt={movie.title}
                                    />
                                </div>
                                <div class="search-movie-info-wrapper">
                                    <div class="search-movie-info">
                                        <span className="search-movie-name">
                                            {movie.title}
                                        </span>
                                        <span className="search-movie-year">
                                            {movie.release_date.split("-")[0]}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}