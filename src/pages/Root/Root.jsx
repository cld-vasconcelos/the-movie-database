import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <h2>TMDB</h2>
            <Outlet />
        </>
    );
}