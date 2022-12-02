import { useState } from 'react';
import './Header.css';
import { useNavigate } from "react-router-dom"

export default function Header() {
    const logoUrl = "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";
    const [query, setQuery] = useState("");

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?q=${query}`);
    }

    return (
        <>
            <div className="header-wrapper">
                <div className='header-title'>
                    <div className="header-title-logo">
                        <a href="/">
                            <img src={logoUrl} alt="tmdb" />
                        </a>
                    </div>
                    <div className="header-title-text">
                        <span className="header-element-center">The Movie Database</span>
                    </div>
                </div>
                <div className="header-search">
                    <div className="header-element-center header-search-input">
                        <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Search" value={query} onChange={handleChange} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}