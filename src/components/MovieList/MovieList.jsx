import { useEffect, useState } from "react";

import './MovieList.css';
import ListGroup from 'react-bootstrap/ListGroup';

export default function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        function GetMovies() {
            return fetch("https://api.themoviedb.org/3/movie/popular?api_key=4ac15274164d3710a133b4a3023705c6&language=en-US&page=1", {
                method: "GET",
                header: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(response => setMovies(response.results.slice(0, 5)))
        }

        GetMovies();
    }, []);


    return (
        <h3>
            {movies.length ? (
                <ul className="movie-list">
                    {movies.map(movie => (
                        <li key={movie.id} className="movie">
                            <img
                                src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                                className="movie-poster"
                                alt={movie.title}
                            />
                        </li>
                    ))}
                </ul>
            ) : <p><i>No movies</i></p>}
        </h3>
    );
}