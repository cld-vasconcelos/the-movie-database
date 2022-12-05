import { useLoaderData } from "react-router-dom";
import { GetMovie, GetMovieCredits } from "../../helpers/movies";
import Moment from 'moment';

import './Movie.css';
import Model from "../../components/Model/Model";

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
    const modelType = "movie";
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
            <Model model={movie} modelType={modelType} details={details} credits={credits} />
        </>
    );
}