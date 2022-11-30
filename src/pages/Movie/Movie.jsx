import { useLoaderData } from "react-router-dom";
import { GetMovie } from "../helpers/movies";

import './Movie.css';

export async function loader({ params }) {
    const movie = await GetMovie(params.movieId);
    return movie;
}

export default function Movie() {
    const movie = useLoaderData();
    console.log(movie)
    return (
        <>
            <div className="movie-detail">
                <div className="movie-detail-poster">
                    <img
                        src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                        className="movie-poster"
                        alt={movie.title}
                    />
                </div>
                <div class="movie-detail-info">
                    <div className="movie-detail-title">
                        {movie.title}
                    </div>
                </div>
            </div>
        </>
    );
}