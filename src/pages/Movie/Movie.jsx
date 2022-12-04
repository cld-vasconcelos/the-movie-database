import { useLoaderData } from "react-router-dom";
import { GetMovie, GetMovieCredits } from "../../helpers/movies";
import Moment from 'moment';

import './Movie.css';
import Media from "../../components/Media/Media";

export async function loader({ params }) {
    const movie = await GetMovie(params.movieId);

    if (movie.success === false) { //'movie' only has 'success' property when the request fails, since this condition
        throw new Response("", {
            status: 404,
            statusText: "Not Found"
        });
    }

    const credits = await GetMovieCredits(params.movieId);

    return { movie, credits };
}

export default function Movie() {
    const { movie, credits } = useLoaderData();
    const title = movie.title;
    const mediaType = "movie";
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
            <Media media={movie} title={title} mediaType={mediaType} details={details} credits={credits} />
        </>
    );
}