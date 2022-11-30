import { Outlet } from "react-router-dom";
import Header from "../../layout/Header/Header";

import './Root.css';

export default function Root() {
    return (
        <>
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </>
    );
}