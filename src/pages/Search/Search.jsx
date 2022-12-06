import { useLoaderData } from "react-router-dom";
import SearchResultList from "../../components/SearchResultList/SearchResultList";
import { searchMovies } from "../../helpers/movies";
import { searchPeople } from "../../helpers/people";
import { searchShows } from "../../helpers/shows";

import "./Search.css";

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    const movieResult = await searchMovies(q);
    const showResult = await searchShows(q);
    const personResult = await searchPeople(q);

    return { q, movieResult, showResult, personResult };
}

export default function Search() {
    const { q, movieResult, showResult, personResult } = useLoaderData();

    return (
        <>
            <div className="search-wrapper">
                <h3>Search '{q}'</h3>
                <SearchResultList
                    q={q}
                    modelType="movie"
                    category="Movies"
                    results={movieResult}
                    searchFunction={searchMovies}
                />
                <SearchResultList
                    q={q}
                    modelType="tv"
                    category="Shows"
                    results={showResult}
                    searchFunction={searchShows}
                />
                <SearchResultList
                    q={q}
                    modelType="person"
                    category="People"
                    results={personResult}
                    searchFunction={searchPeople}
                />
            </div>
        </>
    );
}