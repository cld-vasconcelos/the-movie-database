import { Outlet } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

export default function Home() {
    return (
        <>
            <MovieList />
        </>
    )
}