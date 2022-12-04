import config from "../../config";
import "./PersonCreditList.css";

export default function PersonCreditList(props) {
    const type = props.type;
    const credits = props.credits;
    return (
        <>
            <div className="person-credit-list">
                {credits?.length > 0 ? (
                    <>
                        <div className="person-credit-list-title">
                            {type}
                        </div>
                        <ul>
                            {credits.map((credit) => (
                                <li key={credit.credit_id}>
                                    <div className="person-credit-poster">
                                        <img
                                            src={`${config.imageBaseUrl}${credit.poster_path}`}
                                            alt={credit.media_type === "movie" ? credit.title : credit.name}
                                        />
                                    </div>
                                    <div className="person-credit-info">
                                        <div className="vertically-centered">
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
                    </>
                ) : ""}
            </div>
        </>
    )
}