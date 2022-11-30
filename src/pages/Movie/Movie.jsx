import { useLoaderData } from "react-router-dom";

import './Movie.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        <>
            <div className="movie-detail">
                <div className="movie-detail-poster">
                    <img
                        src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                        className="movie-poster"
                        alt={movie.title}
                    />
                </div>
                <div class="movie-detail-info">
                    <div className="movie-detail-title">
                        {movie.title}
                    </div>
                </div>
            </div>
            {/* <div className="movie-detail">
                <div className="movie-detail-poster">
                    <img
                        src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                        className="movie-poster"
                        alt={movie.title}
                    />
                </div>
                <div class="movie-detail-info">
                <div className="movie-detail-title">
                        {movie.title}
                    </div>
                    <div className="movie-detail-title">
                        {movie.release_date.split("-")[0]} • {movie.runtime}m
                    </div>
                </div>
            </div> */}
        </>
    );
}