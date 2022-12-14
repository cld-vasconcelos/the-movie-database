import { useState } from "react";
import { useNavigate } from "react-router-dom";

import config from "../../config";
import Paginator from "../Paginator/Paginator";

import "./PersonCreditList.css";

export default function PersonCreditList(props) {
    const type = props.type;
    const credits = props.credits.sort((a, b) =>
        (a.release_date || a.first_air_date) <= (b.release_date || b.first_air_date) ? 1 : -1
    );

    const creditsPageSize = 10;

    const [displayCredits, setDisplayCredits] = useState(credits.slice(0, creditsPageSize));

    const navigate = useNavigate();
    const redirectToMedia = (media) => {
        navigate(`/${media.media_type}/${media.id}`);
    };

    const onPersonCreditPageChange = (pageIndex, pageSize) => {
        const start = (pageIndex - 1) * pageSize;
        const end = pageIndex * pageSize;
        setDisplayCredits(credits.slice(start, end));
    };

    return (
        <>
            <div className="person-credit-list-wrapper">
                {credits?.length > 0 ? (
                    <>
                        <div className="person-credit-list-title">
                            {type}
                        </div>
                        <div>
                            <ul className="person-credit-list">
                                {displayCredits.map((credit) => (
                                    <li key={credit.credit_id} onClick={() => redirectToMedia(credit)}>
                                        <div className="person-credit-poster">
                                            <img
                                                src={credit.poster_path ? `${config.imageBaseUrl}${credit.poster_path}` : require("../../assets/images/no-poster.jpeg")}
                                                alt={credit.title || credit.name}
                                            />
                                        </div>
                                        <div className="person-credit-info">
                                            <div className="vertically-centered" style={{ width: "80%" }}>
                                                <span className="person-credit-name">
                                                    {credit.title || credit.name}
                                                </span>
                                                <span className="person-credit-role">
                                                    {credit.character || credit.job}
                                                </span>
                                            </div>
                                            <div className="vertically-centered person-credit-year">
                                                <span>
                                                    {(credit.release_date || credit.first_air_date)?.split("-")[0]}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="person-credits-paginator">
                            <Paginator count={credits.length} pageSize={creditsPageSize} onPageChange={onPersonCreditPageChange} />
                        </div>
                    </>
                ) : ""}
            </div>
        </>
    )
}