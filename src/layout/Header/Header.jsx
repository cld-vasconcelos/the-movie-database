import './Header.css';

export default function Header() {
    const logoUrl = "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";
    return (
        <>
            <div className="header-wrapper">
                <div className="header-logo">
                    <a href="/">
                        <img src={logoUrl} alt="tmdb" />
                    </a>
                </div>
                <div className="header-title">
                    The Movie Database
                </div>
            </div>
        </>
    );
}