import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import PaginationComponent from "../Pagination/Pagination";
import "./SearchResultList.css";

export default function SearchResultList(props) {
    const q = props.q;
    const category = props.category
    const mediaType = props.mediaType;
    const searchFunction = props.searchFunction;

    const [searchResult, setSearchResult] = useState(props.results);
    const updateSearchResult = async (pageIndex, pageSize) => {
        setSearchResult(await searchFunction(q, pageIndex));
    }

    console.log(props.results);

    const pageSize = 20;
    const count = searchResult.total_results;

    const navigate = useNavigate();
    const redirectTo = (movie, mediaType) => {
        navigate(`/${mediaType}/${movie.id}`)
    }

    return (
        <>
            <div className="search-results">
                <h4 className="search-category">{category}</h4>

                {searchResult.results.length > 0 ? (
                    <>
                        <div className="search-result-list">
                            <ul>
                                {searchResult.results.map((result) => (
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
                            </ul>
                        </div>
                        <div>
                            <PaginationComponent count={count} pageSize={pageSize} onPageChange={updateSearchResult} />
                        </div>
                    </>
                ) : (
                    <div className="no-results">
                        No results
                    </div>
                )}
            </div>
        </>
    )
}