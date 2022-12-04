import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const logoUrl = "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const redirectToHome = () => {
        navigate("/")
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(query === "") {
            return;
        }
        
        navigate(`/search?q=${query}`);
        setQuery("");
    }

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    return (
        <>
            <div className="header-wrapper">
                <div className="header-title" onClick={() => { redirectToHome(); }}>
                    <div className="header-title-logo">
                        <img src={logoUrl} alt="tmdb" />
                    </div>
                    <div className="header-title-text">
                        <span className="vertically-centered">The Movie Database</span>
                    </div>
                </div>
                <div className="header-search">
                    <div className="vertically-centered header-search-input">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Search" value={query} onChange={handleChange} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}