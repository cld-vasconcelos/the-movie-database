
import { useLoaderData } from 'react-router-dom';
import TopPick from '../../components/TopPicks/TopPicks.jsx';
import { GetTopMovies } from '../../helpers/movies.js';
import { GetTopShows } from '../../helpers/shows.js';
import './Home.css';

export async function loader() {
    const movies = await GetTopMovies();
    const shows = await GetTopShows();
    return { movies, shows };
}

export default function Home() {
    const { movies, shows } = useLoaderData();

    return (
        <>
            <TopPick mediaType="movie" picks={movies} />
            <TopPick mediaType="tv" picks={shows} />
        </>
    );
}