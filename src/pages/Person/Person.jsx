import { useLoaderData } from "react-router-dom";
import { GetPerson, GetPersonCredits } from "../../helpers/people";
import Moment from "moment";
import ModelOverview from "../../components/ModelOverview/ModelOverview";
import PersonCreditList from "../../components/PersonCreditList/PersonCreditsList";
import "./Person.css";

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

    const castCredits = credits.cast;
    const crewCredits = credits.crew;

    return (
        <>
            <ModelOverview model={person} details={details} />
            <div className="person-credits">
                {castCredits.length > 0 ? (
                    <div className="person-cast">
                        <PersonCreditList type="cast" credits={castCredits} />
                    </div>
                ) : ""}
                {crewCredits.length > 0 ? (
                    <div className="person-crew">
                        <PersonCreditList type="crew" credits={crewCredits} />
                    </div>
                ) : ""}
            </div>
        </>
    );
}