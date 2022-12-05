import { useLoaderData } from "react-router-dom";
import Model from "../../components/Model/Model";
import { GetPerson, GetPersonCredits } from "../../helpers/people";
import Moment from "moment";

export async function loader({ params }) {
    const person = await GetPerson(params.personId);

    if (person.success === false) { //'person' only has 'success' property when the request fails, since this condition
        throw new Response("", {
            status: 404,
            statusText: "Not Found"
        });
    }

    const credits = await GetPersonCredits(params.personId);

    return { person, credits };
}

export default function Person() {
    const { person, credits } = useLoaderData();
    const modelType = "person";
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
            <Model model={person} modelType={modelType} details={details} credits={credits} />
        </>
    );
}