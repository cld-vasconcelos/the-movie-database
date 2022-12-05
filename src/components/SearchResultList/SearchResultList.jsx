import { useNavigate } from "react-router-dom";
import config from "../../config";
import "./SearchResultList.css";

export default function SearchResultList(props) {
    const category = props.category
    const results = props.results;
    const mediaType = props.mediaType;

    const navigate = useNavigate();
    const redirectTo = (movie, mediaType) => {
        navigate(`/${mediaType}/${movie.id}`)
    }

    return (
        <>
            <div class="search-result-list">
                <h4 className="search-category">{category}</h4>
                <div className="search-results">
                    {results.length > 0 ? (<ul>
                        {results.map((result) => (
                            <li key={result.id} onClick={() => { redirectTo(result, mediaType) }}>
                                <div className="search-result-poster">
                                    <img
                                        src={result.poster_path || result.profile_path ? `${config.imageBaseUrl}${result.poster_path || result.profile_path}` : require("../../assets/images/no-poster.jpeg")}
                                        alt={mediaType === "movie" ? result.title : result.name}
                                    />
                                </div>
                                <div className="search-result-info-wrapper">
                                    <div className="search-result-info vertically-centered">
                                        <span className="search-result-name">
                                            {mediaType === "movie" ? result.title : result.name}
                                        </span>
                                        <div className="search-result-year">
                                            {mediaType === "person" ? (
                                                result.known_for.slice(0, 2).map((media) => media.title || media.name).join(", ")
                                            ) : (
                                                <span>
                                                    {(mediaType === "movie" ? result.release_date : result.first_air_date).split("-")[0]}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>) : (
                        <div className="no-results">
                            No results
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}