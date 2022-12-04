import { useLoaderData } from "react-router-dom";
import SearchResultList from "../../components/SearchResultList/SearchResultList";
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

    return (
        <>
            <div className="search-wrapper">
                <h3>Search '{q}'</h3>
                <SearchResultList mediaType="movie" category="Movies" results={movieResults} />
                <SearchResultList mediaType="tv" category="Shows" results={showResults} />
            </div>
        </>
    );
}