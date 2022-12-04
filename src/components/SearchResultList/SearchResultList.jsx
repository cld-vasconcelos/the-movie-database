import { useNavigate } from "react-router-dom";
import config from "../../config";

export default function SearchResultList(props) {
    const navigate = useNavigate();

    const category = props.category
    const results = props.results;
    const mediaType = props.mediaType;

    const redirectTo = (movie, mediaType) => {
        navigate(`/${mediaType}/${movie.id}`)
    }

    return (
        <>
            <h4 className="search-category">{category}</h4>
            <div className="search-results">
                {results.length > 0 ? (<ul>
                    {results.map((result) => (
                        <li key={result.id} onClick={() => { redirectTo(result, mediaType) }}>
                            <div className="search-result-poster">
                                <img
                                    src={`${config.imageBaseUrl}${result.poster_path}`}
                                    alt={mediaType === "movie" ? result.title : result.name}
                                />
                            </div>
                            <div className="search-result-info-wrapper">
                                <div className="search-result-info vertically-centered">
                                    <span className="search-result-name">
                                        {mediaType === "movie" ? result.title : result.name}
                                    </span>
                                    <span className="search-result-year">
                                        {(mediaType === "movie" ? result.release_date : result.first_air_date).split("-")[0]}
                                    </span>
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
        </>
    )
}