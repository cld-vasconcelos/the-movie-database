
import { useLoaderData } from 'react-router-dom';
import TopPick from '../../components/TopPicks/TopPicks.jsx';
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
        <>
            <TopPick type="Movie" picks={movies} />
            <TopPick type="TV Show" picks={shows} />
        </>
    );
}