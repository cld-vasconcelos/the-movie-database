
import { Link, useLoaderData } from 'react-router-dom';
import { GetTopMovies } from '../../helpers/movies.js';
import { GetTopShows } from '../../helpers/shows.js';
import './Home.css';

export async function loader({ request }) {
    const movies = await GetTopMovies();
    const shows = await GetTopShows();
    return { movies, shows };
}

export default function Home() {
    const { movies, shows } = useLoaderData();

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


            <div className="top-movies">
                <h3 style={{ textAlign: "left" }}>
                    Top TV Shows
                </h3>
                <div className='top-movies-list'>
                    {shows.length ? (
                        <ul>
                            {shows.map(show => (
                                <li key={show.id} className="top-movie">
                                    <Link to={`tv/${show.id}`}>
                                        <img
                                            src={"https://image.tmdb.org/t/p/original" + show.poster_path}
                                            alt={show.title}
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