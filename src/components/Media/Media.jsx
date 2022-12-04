import { useNavigate } from 'react-router-dom';
import config from '../../config';
import './Media.css';

export default function Media(props) {
    const media = props.media;
    const title = props.title;
    const mediaType = props.mediaType;
    const details = props.details;

    const credits = props.credits;
    const topCast = credits.cast?.slice(0, 5);
    const topCrew = [];
    switch (mediaType) {
        case "movie":
            topCrew.push({ job: "Director", elements: credits.crew.filter(crew => crew.job === "Director") });
            break;
        case "tv":
            topCrew.push({ job: "Creator", elements: media.created_by });
            break;
        default:
            break;
    }

    const navigate = useNavigate();
    const redirectToPerson = (personId) => {
        navigate(`/person/${personId}`)
    }

    return (
        <>
            <div className="media-wrapper">

                <div class="aaa">
                    <div className="media-poster">
                        <img
                            src={`${config.imageBaseUrl}${media.poster_path || media.profile_path}`}
                            className="media-poster"
                            alt={title}
                        />
                    </div>
                    <div className="media-info">
                        <div className="media-title">
                            {title}
                        </div>
                        <div className="media-overview">
                            <div className="media-details">
                                <ul>
                                    {details.map((detail) => (
                                        <li key={detail.key}>
                                            <div className="info-title">
                                                {detail.title}
                                            </div>
                                            <div className="info-content">
                                                {detail.content}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>




                    </div>


                </div>

                <div className="media-credits">
                    {topCrew.length > 0 ? (
                        <div className="media-credits-crew">
                            {topCrew.map((crew) => (
                                <>
                                    <div className="media-crew-element">
                                        <div>
                                            <b>{crew.job}{crew.elements.length > 1 ? "s" : ""}</b>
                                        </div>
                                        <div>
                                            {crew.elements.map((element, index) => (
                                                <>
                                                    <span>{element.name}</span>
                                                    {index < crew.elements.length - 1 ? " • " : ""}
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>) : ""}
                    <div>
                        {credits.cast?.length > 0 ? (
                            <>
                                <div>
                                    <b>Cast</b>
                                </div>
                                <ul>
                                    {topCast.map((cast) => (
                                        <li key={cast.id} onClick={() => redirectToPerson(cast.id)}>
                                            <div className="media-cast-profile">
                                                <img
                                                    src={`${config.imageBaseUrl}${cast.profile_path}`}
                                                    alt={cast.name}
                                                />
                                            </div>
                                            <div className="media-cast-info">
                                                <span className="media-cast-name">
                                                    {cast.name}
                                                </span>
                                                <span className="media-cast-role">
                                                    {cast.character}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : ""}
                    </div>
                </div>



            </div>
        </>
    );
}