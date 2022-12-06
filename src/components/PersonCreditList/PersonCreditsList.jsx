import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import PaginationComponent from "../Pagination/Pagination";
import "./PersonCreditList.css";

export default function PersonCreditList(props) {
    const type = props.type;
    const credits = props.credits;

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
                                                alt={credit.media_type === "movie" ? credit.title : credit.name}
                                            />
                                        </div>
                                        <div className="person-credit-info">
                                            <div className="vertically-centered" style={{ width: "80%" }}>
                                                <span className="person-credit-name">
                                                    {credit.media_type === "movie" ? credit.title : credit.name}
                                                </span>
                                                <span className="person-credit-role">
                                                    {credit.character || credit.job}
                                                </span>
                                            </div>
                                            <div className="vertically-centered person-credit-year">
                                                <span>
                                                    {(
                                                        credit.media_type === "movie"
                                                            ? credit.release_date
                                                            : credit.first_air_date
                                                    ).split("-")[0]}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        <div className="person-credits-pagination">
                            <PaginationComponent count={credits.length} pageSize={creditsPageSize} onPageChange={onPersonCreditPageChange} />
                        </div>


                    </>
                ) : ""}
            </div>
        </>
    )
}