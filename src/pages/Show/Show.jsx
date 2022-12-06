import { useLoaderData } from "react-router-dom";
import { GetShow, GetShowCredits } from "../../helpers/shows";
import Moment from 'moment';
import './Show.css';
import ModelOverview from "../../components/Model/ModelOverview/ModelOverview";
import MediaCast from "../../components/MediaCast/MediaCast";
import MediaCrew from "../../components/MediaCrew/MediaCrew";

export async function loader({ params }) {
    const show = await GetShow(params.showId);

    if (show.success === false) { //'show' only has 'success' property when the request fails, since this condition
        throw new Response("", {
            status: 404,
            statusText: "Not Found"
        });
    }

    const credits = await GetShowCredits(params.showId);

    return { show, credits };
}

export default function Show() {
    const { show, credits } = useLoaderData();
    const details = [
        {
            key: "synopsys",
            title: "Synopsys",
            content: show.overview
        },
        {
            key: "release_date",
            title: "Release Date",
            content: `${Moment(show.first_air_date, "YYYY-MM-DD").format("MMMM DD, YYYY")} - ${show.in_production ? "Present" : Moment(show.last_air_date, "YYYY-MM-DD").format("MMMM DD, YYYY")}`
        },
        {
            key: "seasons",
            title: "No. of seasons",
            content: `${show.number_of_seasons}`
        },
        {
            key: "episodes",
            title: "No. of episodes",
            content: `${show.number_of_episodes}`
        }
    ];

    const cast = credits.cast;
    const crew = show.created_by.map((createdBy) => ({
        ...createdBy,
        job: "Creator"
    }));

    return (
        <>
            <ModelOverview model={show} details={details} />
            <MediaCrew crew={crew} />
            <MediaCast cast={cast} />
        </>
    );
}