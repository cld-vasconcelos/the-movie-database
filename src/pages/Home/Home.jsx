
import { useEffect } from 'react';
import { Form, Link, useLoaderData } from 'react-router-dom';
import { GetMovies } from '../helpers/movies';
import './Home.css';

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
        <div>
            <div className='movie-search'>
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
            </div>
            <div>
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
            </div>
        </div>
    );
}