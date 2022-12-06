import { useLoaderData } from "react-router-dom";
import { GetMovie, GetMovieCredits } from "../../helpers/movies";
import Moment from 'moment';
import './Movie.css';
import ModelOverview from "../../components/Model/ModelOverview/ModelOverview";
import MediaCast from "../../components/MediaCast/MediaCast";
import MediaCrew from "../../components/MediaCrew/MediaCrew";

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

    const crew = credits.crew.filter((crewMember) => crewMember.job === "Director");
    const cast = credits.cast;

    return (
        <>
            <ModelOverview model={movie} details={details} />
            <MediaCrew crew={crew} />
            <MediaCast cast={cast} />
        </>
    );
}