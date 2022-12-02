import { useLoaderData } from "react-router-dom";
import { GetShow, GetShowCredits } from "../../helpers/shows";
import Moment from 'moment';

import './Show.css';

export async function loader({ params }) {
    const movie = await GetShow(params.showId);

    if (movie.success === false) { //'movie' only has 'success' property when the request fails, since this condition
        throw new Response("", {
            status: 404,
            statusText: "Not Found"
        });
    }

    const movieCredits = await GetShowCredits(params.showId);

    movie.credits = movieCredits;

    return movie;
}

export default function Show() {
    const movie = useLoaderData();

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
            content: `${Moment(movie.first_air_date, "YYYY-MM-DD").format("MMMM DD, YYYY")} - ${movie.in_production ? "Present" : Moment(movie.last_air_date, "YYYY-MM-DD").format("MMMM DD, YYYY")}`
        },
        {
            key: "seasons",
            title: "No. of seasons",
            content: `${movie.number_of_seasons}`
        },
        {
            key: "seasons",
            title: "No. of episodes",
            content: `${movie.number_of_episodes}`
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