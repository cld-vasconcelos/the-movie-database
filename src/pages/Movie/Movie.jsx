import { useLoaderData } from "react-router-dom";

async function GetMovie(movieId) {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=4ac15274164d3710a133b4a3023705c6`, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}

export async function loader({ params }) {
    const movie = await GetMovie(params.movieId);
    return movie;
}

export default function Movie() {
    const movie = useLoaderData();
    console.log(movie)
    return (
        <h3>{movie.title}</h3>
    );
}