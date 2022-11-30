
import { useEffect } from 'react';
import { Form, Link, useLoaderData } from 'react-router-dom';
import './Home.css';

async function GetMovies(q) {
    const url = q
        ? `https://api.themoviedb.org/3/search/movie?api_key=4ac15274164d3710a133b4a3023705c6&language=en-US&query=${q}&page=1&include_adult=false`
        : "https://api.themoviedb.org/3/movie/popular?api_key=4ac15274164d3710a133b4a3023705c6&language=en-US&page=1";
    return fetch(url, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(response => response.results.slice(0, 5))
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    const movies = await GetMovies(q);

    return { movies, q };
}

export default function Home() {
    const { movies, q } = useLoaderData();

    useEffect(() => {
        document.getElementById("q").value = q;
    });

    return (
        <h3>
            <Form id="search-form" role="search">
                <input
                    id="q"
                    aria-label="Search movies"
                    placeholder="Search"
                    type="search"
                    name="q"
                    defaultValue={q}
                />
            </Form>
            {movies.length ? (
                <ul className="movie-list">
                    {movies.map(movie => (
                        <li key={movie.id} className="movie">
                            <Link to={`movies/${movie.id}`}>
                                <img
                                    src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                                    className="movie-poster"
                                    alt={movie.title}
                                />
                            </Link>

                        </li>
                    ))}
                </ul>
            ) : <p><i>No movies</i></p>}
        </h3>
    );
}