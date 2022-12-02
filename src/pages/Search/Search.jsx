import { useLoaderData, useNavigate } from "react-router-dom";
import config from "../../config";
import { SearchMedia } from "../../helpers/search";

import "./Search.css";

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    const results = await SearchMedia(q);

    return { q, results };
}

export default function Search() {
    const { q, results } = useLoaderData();
    const navigate = useNavigate();

    const redirectTo = (movie) => {
        navigate(`/${movie.media_type}/${movie.id}`)
    }

    return (
        <>
            <div className="search-wrapper">
                <h3>Search '{q}'</h3>
                <div className="search-results">
                    {results.length > 0 ? (<ul>
                        {results.map((movie) => (
                            <li key={movie.id} onClick={() => { redirectTo(movie) }}>
                                <div className="search-result-poster">
                                    <img
                                        src={`${config.imageBaseUrl}${movie.poster_path}`}
                                        alt={movie.media_type === "tv" ? movie.name : movie.title}
                                    />
                                </div>
                                <div className="search-result-info-wrapper">
                                    <div className="search-result-info vertically-centered">
                                        <span className="search-result-name">
                                            {movie.media_type === "tv" ? movie.name : movie.title}
                                        </span>
                                        <span className="search-result-year">
                                            {(movie.media_type === "tv" ? movie.first_air_date : movie.release_date).split("-")[0]}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>) : (
                        <p>
                            No results
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}