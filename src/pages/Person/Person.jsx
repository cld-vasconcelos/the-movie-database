import { useLoaderData } from "react-router-dom";
import Media from "../../components/Media/Media";
import { GetPerson } from "../../helpers/people";
import Moment from "moment";

export async function loader({ params }) {
    const person = await GetPerson(params.personId);

    console.log(params.personId);
    if (person.success === false) { //'person' only has 'success' property when the request fails, since this condition
        throw new Response("", {
            status: 404,
            statusText: "Not Found"
        });
    }

    return person;
}

export default function Person() {
    const person = useLoaderData();
    const title = person.name;
    const mediaType = "person";
    const details = [
        {
            key: "biography",
            title: "Biography",
            content: person.biography
        },
        {
            key: "birthday",
            title: "Born",
            content: Moment(person.birthday, "YYYY-MM-DD").format("MMMM DD, YYYY")
        }
    ];

    if (person.deathday) {
        details.push({
            key: "deathday",
            title: "Died",
            content: Moment(person.deathday, "YYYY-MM-DD").format("MMMM DD, YYYY")
        });
    }

    return (
        <>
            <Media media={person} title={title} mediaType={mediaType} details={details} credits={[]} />
        </>
    );

}