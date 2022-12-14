import { Link } from "react-router-dom";
import "./MediaCrew.css";

export default function MediaCrew(props) {
    const crew = props.crew;
    const crewJobs = Array.from(new Set(crew.map((crewMember) => crewMember.job)));
    return (
        <>
            {crew.length > 0 ? (
                <div className="media-crew">
                    <ul>
                        {crewJobs.map((crewJob) => (
                            <li key={crewJob}>
                                <h4>{crewJob}</h4>
                                {
                                    crew.filter((crewMember) => crewMember.job === crewJob).map((crewMember) => (
                                        <div key={crewMember.id}>
                                            <Link to={`/person/${crewMember.id}`}>{crewMember.name}</Link>
                                        </div>
                                    ))
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            ) : ("")}
        </>
    );
}