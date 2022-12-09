import { useLoaderData } from "react-router-dom";
import { getMovie, getMovieCredits } from "../../helpers/movies";
import Moment from 'moment';
import './Movie.css';
import ModelOverview from "../../components/ModelOverview/ModelOverview";
import MediaCast from "../../components/MediaCast/MediaCast";
import MediaCrew from "../../components/MediaCrew/MediaCrew";

export async function loader({ params }) {
    const movie = await getMovie(params.movieId);

    if (movie.success === false) { //'movie' only has 'success' property when the request fails, since this condition
        throw new Response("", {
            status: 404,
            statusText: "Not Found"
        });
    }

    const credits = await getMovieCredits(params.movieId);

    return { movie, credits };
}

export default function Movie() {
    const { movie, credits } = useLoaderData();
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

    const model = {...movie, details: details };

    const crew = credits.crew.filter((crewMember) => crewMember.job === "Director");
    const cast = credits.cast;

    return (
        <>
            <ModelOverview model={model} />
            <MediaCrew crew={crew} />
            <MediaCast cast={cast} />
        </>
    );
}