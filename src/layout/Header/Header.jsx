import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
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
                <h1 className="header-title" onClick={() => { redirectToHome(); }}>
                    <div className="header-title-logo">
                        <img src={require("../../assets/images/logo.svg").default} alt="tmdb" />
                    </div>
                    <div className="header-title-text">
                        <span className="vertically-centered">The Movie Database</span>
                    </div>
                </h1>
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