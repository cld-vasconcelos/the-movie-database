
import { useLoaderData } from 'react-router-dom';
import TopMedia from '../../components/TopMedia/TopMedia.jsx';
import { getPopularMovies } from '../../helpers/movies.js';
import { getPopularShows } from '../../helpers/shows.js';
import './Home.css';

export async function loader() {
    const popularMovies = await getPopularMovies(1);
    const popularShows = await getPopularShows(1);

    debugger
    const topMovies = popularMovies.results.slice(0, 5);
    const topShows = popularShows.results.slice(0, 5);

    return { topMovies, topShows };
}

export default function Home() {
    const { topMovies, topShows } = useLoaderData();

    return (
        <>
            <TopMedia mediaType="movie" media={topMovies} />
            <TopMedia mediaType="tv" media={topShows} />
        </>
    );
}