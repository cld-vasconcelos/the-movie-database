import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

import './Root.css';

export default function Root() {
    return (
        <>
            <Header />
            <div className="root-wrapper">
                <Outlet />
            </div>
        </>
    );
}