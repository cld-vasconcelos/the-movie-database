
import { Link, useLoaderData } from 'react-router-dom';
import { GetTopMovies } from '../../helpers/movies.js';
import './Home.css';

export async function loader({ request }) {
    const movies = await GetTopMovies();

    return movies;
}

export default function Home() {
    const movies = useLoaderData();

    return (
        <div>
            
            <div className="top-movies">
                <h3 style={{ textAlign: "left" }}>
                    Top movies
                </h3>
                <div className='top-movies-list'>
                    {movies.length ? (
                        <ul>
                            {movies.map(movie => (
                                <li key={movie.id} className="top-movie">
                                    <Link to={`movies/${movie.id}`}>
                                        <img
                                            src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                                            alt={movie.title}
                                        />
                                    </Link>

                                </li>
                            ))}
                        </ul>
                    ) : <p><i>No results</i></p>}
                </div>
            </div>
        </div>
    );
}