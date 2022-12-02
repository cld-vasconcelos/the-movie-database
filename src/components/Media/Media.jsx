import './Media.css';

export default function Media(props) {
    const media = props.media;
    const title = props.title;
    const details = props.details;

    const credits = props.credits;
    const director = credits.crew.find(crew => crew.job === "Director");
    const topCast = credits.cast.slice(0, 5);

    return (
        <>
            <div className="media-wrapper">
                <div className="media-poster">
                    <img
                        src={"https://image.tmdb.org/t/p/original" + media.poster_path}
                        className="media-poster"
                        alt={title}
                    />
                </div>
                <div className="media-info">
                    <div className="media-title">
                        {title}
                    </div>
                    <div class="media-overview">
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
                        <div className="media-credits">
                            {director ? (<div className="media-credits-crew">
                                <div className="media-director">
                                    <div>
                                        <b>Director</b>
                                    </div>
                                    <div>
                                        {director.name}
                                    </div>
                                </div>
                            </div>) : ""}
                            <div>
                                <b>Cast</b>
                            </div>
                            <ul>
                                {topCast.map((cast) => (
                                    <li>
                                        <div className="media-cast-profile">
                                            <img
                                                src={"https://image.tmdb.org/t/p/original" + cast.profile_path}
                                                alt={cast.name}
                                            />
                                        </div>
                                        <div class="media-cast-info">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}