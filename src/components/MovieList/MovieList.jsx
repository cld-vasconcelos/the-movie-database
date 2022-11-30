import { useEffect, useState } from "react";

async function GetMovies() {
    return fetch("https://api.themoviedb.org/3/movie/popular?api_key=4ac15274164d3710a133b4a3023705c6&language=en-US&page=1", {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(r => r.json())
        .then(response => response)
}

export default function MovieList() {
    const [movies, setMovies] = useState([]);

    GetMovies().then(movieData => {
        setMovies(movieData.results.slice(0, 5));
    })

    return (
        <h3>
            {movies.length}
        </h3>
    );
}