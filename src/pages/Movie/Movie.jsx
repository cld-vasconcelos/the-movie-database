import { useLoaderData } from "react-router-dom";
import { GetMovie, GetMovieCredits } from "../../helpers/movies";
import Moment from 'moment';

import './Movie.css';

export async function loader({ params }) {
    const movie = await GetMovie(params.movieId);

    if (movie.success === false) { //'movie' only has 'success' property when the request fails, since this condition
        throw new Response("", {
            status: 404,
            statusText: "Not Found"
        });
    }

    const movieCredits = await GetMovieCredits(params.movieId);

    movie.credits = movieCredits;

    return movie;
}

export default function Movie() {
    const movie = useLoaderData();

    const director = movie.credits.crew.find(crew => crew.job === "Director");
    const topCast = movie.credits.cast.slice(0, 5);

    const details = [
        {
            key: "synopsys",
            title: "Synopsys",
            content: movie.overview
        },
        {
            key: "release_date",
            title: "Release Date",
            content: Moment(movie.release_date, "YYYY-MM-DD").format("MMMM DD, YYYY")
        },
        {
            key: "runtime",
            title: "Runtime",
            content: `${movie.runtime} minutes`
        }
    ];
    return (
        <>
            <div className="movie-wrapper">
                <div className="movie-poster">
                    <img
                        src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                        className="movie-poster"
                        alt={movie.title}
                    />
                </div>
                <div className="movie-info">
                    <div className="movie-title">
                        {movie.title}
                    </div>
                    <div class="movie-overview">
                        <div className="movie-details">
                            <ul>
                                {details.map((detail) => (
                                    <li key={detail.key}>
                                        <div className="info-title">
                                            {detail.title}
                                        </div>
                                        <div className="info-content">
                                            {detail.content}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="movie-credits">
                            <div className="movie-credits-crew">
                                <div className="movie-director">
                                    <div>
                                        <b>Director</b>
                                    </div>
                                    <div>
                                        {director.name}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <b>Cast</b>
                            </div>
                            <ul>
                                {topCast.map((cast) => (
                                    <li>
                                        <div className="movie-cast-profile">
                                            <img
                                                src={"https://image.tmdb.org/t/p/original" + cast.profile_path}
                                                alt={cast.name}
                                            />
                                        </div>
                                        <div class="movie-cast-info">
                                            <span className="movie-cast-name">
                                                {cast.name}
                                            </span>
                                            <span className="movie-cast-role">
                                                {cast.character}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}