import { useState } from "react";
import { useNavigate } from "react-router-dom";

import config from "../../config";
import Paginator from "../Paginator/Paginator";

import "./MediaCast.css";

export default function MediaCast(props) {
    const cast = props.cast;

    const castPageSize = 10;
    const [castToDisplay, setCastToDisplay] = useState(cast.slice(0, castPageSize));
    const onCastPageChange = (pageIndex, pageSize) => {
        const start = (pageIndex - 1) * pageSize;
        const end = pageIndex * pageSize;
        setCastToDisplay(cast.slice(start, end));
    };

    const navigate = useNavigate();
    const redirectToPerson = (personId) => {
        navigate(`/person/${personId}`)
    }

    return (
        <>
            {castToDisplay?.length > 0 ? (
                <>
                    <h4>Cast</h4>
                    <ul className="media-cast-list">
                        {castToDisplay.map((castMember) => (
                            <li key={castMember.id} onClick={() => redirectToPerson(castMember.id)}>
                                <div className="media-cast-profile">
                                    <img
                                        src={castMember.profile_path ? `${config.imageBaseUrl}${castMember.profile_path}` : require("../../assets/images/no-poster.jpeg")}
                                        alt={castMember.name}
                                    />
                                </div>
                                <div className="media-cast-info">
                                    <span className="media-cast-name">
                                        {castMember.name}
                                    </span>
                                    <span className="media-cast-role">
                                        {castMember.character}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="media-cast-paginator">
                        <Paginator
                            count={cast.length}
                            pageSize={castPageSize}
                            onPageChange={onCastPageChange}
                        />
                    </div>
                </>
            ) : ""}
        </>
    );
}