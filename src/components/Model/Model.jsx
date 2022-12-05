import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import PersonCreditList from '../PersonCreditList/PersonCreditsList';
import './Model.css';
import { useState } from 'react';
import PaginationComponent from '../Pagination/Pagination.jsx';

export default function Model(props) {
    const model = props.model;
    const modelType = props.modelType;
    const details = props.details;

    const credits = props.credits;

    const mediaCastPageSize = 10;
    const [mediaCast, setMediaCast] = useState(credits.cast.slice(0, mediaCastPageSize));
    const onMediaCastPageChange = (pageIndex, pageSize) => {
        const start = (pageIndex - 1) * pageSize;
        const end = pageIndex * pageSize;
        setMediaCast(credits.cast.slice(start, end));
    };
    
    const mediaCrew = [];
    switch (modelType) {
        case "movie":
            mediaCrew.push({ job: "Director", elements: credits.crew.filter(crew => crew.job === "Director") });
            break;
        case "tv":
            mediaCrew.push({ job: "Creator", elements: model.created_by });
            break;
        default:
            break;
    }

    const personCast = modelType === "person"
        ? credits.cast.sort((a, b) => (a.release_date || a.last_air_date) < (b.release_date || b.last_air_date) ? 1 : -1)
        : [];

    const personCrew = modelType === "person"
        ? credits.crew.sort((a, b) => (a.release_date || a.last_air_date) < (b.release_date || b.last_air_date) ? 1 : -1)
        : [];

    const navigate = useNavigate();
    const redirectToPerson = (personId) => {
        navigate(`/person/${personId}`)
    }

    return (
        <>
            <div className="model-wrapper">
                <div className="model-basic">
                    <div className="model-poster">
                        <img
                            src={model.poster_path || model.profile_path ? `${config.imageBaseUrl}${model.poster_path || model.profile_path}` : require("../../assets/images/no-poster.jpeg")}
                            className="model-poster"
                            alt={model.title || model.name}
                        />
                    </div>
                    <div className="model-info">
                        <div className="model-name">
                            {model.title || model.name}
                        </div>
                        <div className="model-details">
                            <ul>
                                {details.map((detail) => (
                                    <li key={detail.key}>
                                        <div className="model-detail-title">
                                            {detail.title}
                                        </div>
                                        <div className="model-detail-content">
                                            {detail.content}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="model-credits">
                    <h4>Credits</h4>
                    {modelType === "person" ? (
                        <div className="person-credits">
                            {personCast.length > 0 ? (
                                <div className="person-cast">
                                    <PersonCreditList type="cast" credits={personCast} />
                                </div>
                            ) : ""}
                            {personCrew.length > 0 ? (
                                <div className="person-crew">
                                    <PersonCreditList type="crew" credits={personCrew} />
                                </div>
                            ) : ""}
                        </div>
                    ) : (
                        <div className="media-credits">
                            <div>
                                {mediaCrew.length > 0 ? (
                                    <div className="media-credits-crew">
                                        {mediaCrew.map((crew) => (
                                            <div key={crew.job} className="media-crew-element" >
                                                <div>
                                                    <b>{crew.job}{crew.elements.length > 1 ? "s" : ""}</b>
                                                </div>
                                                <div>
                                                    {crew.elements.map((element, index) => (
                                                        <div key={element.id}>
                                                            <Link to={`/person/${element.id}`}>{element.name}</Link>
                                                            {index < crew.elements.length - 1 ? " • " : ""}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>) : ""}
                            </div>
                            <div>
                                {mediaCast?.length > 0 ? (
                                    <>
                                        <div>
                                            <b>Cast</b>
                                        </div>
                                        <ul className="media-cast-list">
                                            {mediaCast.map((cast) => (
                                                <li key={cast.id} onClick={() => redirectToPerson(cast.id)}>
                                                    <div className="media-cast-profile">
                                                        <img
                                                            src={cast.profile_path ? `${config.imageBaseUrl}${cast.profile_path}` : require("../../assets/images/no-poster.jpeg")}
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
                                        <div className="media-cast-pagination">
                                            <PaginationComponent count={credits.cast.length} pageSize={mediaCastPageSize} onPageChange={onMediaCastPageChange} />
                                        </div>
                                    </>
                                ) : ""}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}