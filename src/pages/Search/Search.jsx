import { useLoaderData, useNavigate } from "react-router-dom";
import config from "../../config";
import { SearchMovies } from "../../helpers/movies";
import { SearchShows } from "../../helpers/shows";

import "./Search.css";

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    const movieResults = await SearchMovies(q);
    const showResults = await SearchShows(q);

    return { q, movieResults, showResults };
}

export default function Search() {
    const { q, movieResults, showResults } = useLoaderData();
    const navigate = useNavigate();

    const redirectTo = (movie, mediaType) => {
        navigate(`/${mediaType}/${movie.id}`)
    }

    return (
        <>
            <div className="search-wrapper">
                <h3>Search '{q}'</h3>
                <h4 className="search-category">Movies</h4>
                <div className="search-results">
                    {movieResults.length > 0 ? (<ul>
                        {movieResults.map((result) => (
                            <li key={result.id} onClick={() => { redirectTo(result, "movie") }}>
                                <div className="search-result-poster">
                                    <img
                                        src={`${config.imageBaseUrl}${result.poster_path}`}
                                        alt={result.title}
                                    />
                                </div>
                                <div className="search-result-info-wrapper">
                                    <div className="search-result-info vertically-centered">
                                        <span className="search-result-name">
                                            {result.title}
                                        </span>
                                        <span className="search-result-year">
                                            {result.release_date.split("-")[0]}
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
                <h4 className="search-category">Shows</h4>
                <div className="search-results">
                    {showResults.length > 0 ? (<ul>
                        {showResults.map((result) => (
                            <li key={result.id} onClick={() => { redirectTo(result, "tv") }}>
                                <div className="search-result-poster">
                                    <img
                                        src={`${config.imageBaseUrl}${result.poster_path}`}
                                        alt={result.name}
                                    />
                                </div>
                                <div className="search-result-info-wrapper">
                                    <div className="search-result-info vertically-centered">
                                        <span className="search-result-name">
                                            {result.name}
                                        </span>
                                        <span className="search-result-year">
                                            {result.first_air_date.split("-")[0]}
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

            </div>
        </>
    );
}