import { Link } from "react-router-dom";
import config from "../../config";
import "./TopMedia.css";

export default function TopMedia(props) {
    const media = props.media;

    return (
        <div className="top-media-wrapper">
            <h3> Top {props.mediaType ? `${props.mediaType === "tv" ? "TV" : "Movies"}` : "Media"} </h3>
            <div className='top-media-list'>
                {media.length ? (
                    <ul>
                        {media.map(media => (
                            <li key={media.id} className="top-media">
                                <Link to={`${props.mediaType}/${media.id}`}>
                                    <img
                                        src={`${config.imageBaseUrl}${media.poster_path}`}
                                        alt={media.title}
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