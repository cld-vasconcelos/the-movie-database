import { useLoaderData } from "react-router-dom";
import SearchResultList from "../../components/SearchResultList/SearchResultList";
import { SearchMovies } from "../../helpers/movies";
import { SearchPeople } from "../../helpers/people";
import { SearchShows } from "../../helpers/shows";

import "./Search.css";

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    const movieResult = await SearchMovies(q);
    const showResult = await SearchShows(q);
    const personResult = await SearchPeople(q);

    return { q, movieResult, showResult, personResult };
}

export default function Search() {
    const { q, movieResult, showResult, personResult } = useLoaderData();

    return (
        <>
            <div className="search-wrapper">
                <h3>Search '{q}'</h3>
                <SearchResultList q={q} mediaType="movie" category="Movies" results={movieResult} searchFunction={SearchMovies} />
                <SearchResultList q={q} mediaType="tv" category="Shows" results={showResult} searchFunction={SearchShows} />
                <SearchResultList q={q} mediaType="person" category="People" results={personResult} searchFunction={SearchPeople} />
            </div>
        </>
    );
}