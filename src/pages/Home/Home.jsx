
import { useLoaderData } from 'react-router-dom';
import TopPick from '../../components/TopPicks/TopPicks.jsx';
import { getPopularMovies } from '../../helpers/movies.js';
import { getPopularShows } from '../../helpers/shows.js';
import './Home.css';

export async function loader() {
    const popularMovies = await getPopularMovies(1);
    const popularShows = await getPopularShows(1);

    const topMovies = popularMovies.results.slice(0, 5);
    const topShows = popularShows.results.slice(0, 5);

    return { topMovies, topShows };
}

export default function Home() {
    const { topMovies, topShows } = useLoaderData();

    return (
        <>
            <TopPick mediaType="movie" picks={topMovies} />
            <TopPick mediaType="tv" picks={topShows} />
        </>
    );
}