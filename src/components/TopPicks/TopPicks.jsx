import { Link } from "react-router-dom";
import config from "../../config";
import "./TopPicks.css";

export default function TopPick(props) {
    const picks = props.picks;

    return (
        <div className="top-picks-wrapper">
            <h3> Top {props.mediaType ? `${props.mediaType === "tv" ? "TV" : "Movies"}` : "Picks"} </h3>
            <div className='top-picks'>
                {picks.length ? (
                    <ul>
                        {picks.map(pick => (
                            <li key={pick.id} className="top-pick">
                                <Link to={`${props.mediaType}/${pick.id}`}>
                                    <img
                                        src={`${config.imageBaseUrl}${pick.poster_path}`}
                                        alt={pick.title}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : <p><i>No results</i></p>}
            </div>
        </div>
    );
}